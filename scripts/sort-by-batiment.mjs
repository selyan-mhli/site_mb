import fs from 'node:fs/promises'
import path from 'node:path'
import { execFile } from 'node:child_process'
import { promisify } from 'node:util'

const execFileAsync = promisify(execFile)

const sourceJpgDir = path.resolve('public/images/converted/jpg')
const sourceWebpDir = path.resolve('public/images/converted/webp')
const targetBaseDir = path.resolve('public/images/converted/by-batiment')
const maxDistanceKm = 20

const batiments = [
  { slug: 'entrepot-logistique-orange', lat: 44.138, lon: 4.807 },
  { slug: 'complexe-industriel-carpentras', lat: 44.055, lon: 5.048 },
  { slug: 'local-commercial-avignon', lat: 43.949, lon: 4.806 },
  { slug: 'hangar-stockage-cavaillon', lat: 43.836, lon: 5.037 },
]

function toRadians(value) {
  return (value * Math.PI) / 180
}

function haversineKm(lat1, lon1, lat2, lon2) {
  const R = 6371
  const dLat = toRadians(lat2 - lat1)
  const dLon = toRadians(lon2 - lon1)
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLon / 2) ** 2
  return 2 * R * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
}

async function getGpsFromFile(filePath) {
  const { stdout } = await execFileAsync('mdls', [
    '-name',
    'kMDItemLatitude',
    '-name',
    'kMDItemLongitude',
    filePath,
  ])

  const latMatch = stdout.match(/kMDItemLatitude\s*=\s*([-\d.]+)/)
  const lonMatch = stdout.match(/kMDItemLongitude\s*=\s*([-\d.]+)/)
  const lat = latMatch ? Number(latMatch[1]) : NaN
  const lon = lonMatch ? Number(lonMatch[1]) : NaN

  if (!Number.isFinite(lat) || !Number.isFinite(lon)) {
    return null
  }

  return { lat, lon }
}

function resolveBatiment(lat, lon) {
  let best = null

  for (const batiment of batiments) {
    const distanceKm = haversineKm(lat, lon, batiment.lat, batiment.lon)
    if (!best || distanceKm < best.distanceKm) {
      best = { slug: batiment.slug, distanceKm }
    }
  }

  if (!best || best.distanceKm > maxDistanceKm) {
    return 'non-classe'
  }

  return best.slug
}

async function ensureTargetTree() {
  const slugs = ['non-classe', ...batiments.map((b) => b.slug)]
  for (const slug of slugs) {
    await fs.mkdir(path.join(targetBaseDir, slug, 'jpg'), { recursive: true })
    await fs.mkdir(path.join(targetBaseDir, slug, 'webp'), { recursive: true })
  }
}

async function main() {
  await ensureTargetTree()

  const files = (await fs.readdir(sourceJpgDir))
    .filter((name) => name.toLowerCase().endsWith('.jpg'))
    .sort((a, b) => a.localeCompare(b))

  const counters = Object.fromEntries(
    ['non-classe', ...batiments.map((b) => b.slug)].map((slug) => [slug, 0]),
  )

  for (const jpgName of files) {
    const base = path.parse(jpgName).name
    const webpName = `${base}.webp`
    const jpgPath = path.join(sourceJpgDir, jpgName)
    const webpPath = path.join(sourceWebpDir, webpName)

    let slug = 'non-classe'

    try {
      const gps = await getGpsFromFile(jpgPath)
      if (gps) {
        slug = resolveBatiment(gps.lat, gps.lon)
      }
    } catch {
      slug = 'non-classe'
    }

    const targetJpg = path.join(targetBaseDir, slug, 'jpg', jpgName)
    const targetWebp = path.join(targetBaseDir, slug, 'webp', webpName)

    await fs.copyFile(jpgPath, targetJpg)
    try {
      await fs.copyFile(webpPath, targetWebp)
    } catch {
      // Keep jpg even if webp is missing.
    }

    counters[slug] += 1
  }

  console.log('Tri par batiment termine.')
  for (const [slug, count] of Object.entries(counters)) {
    console.log(`${slug}: ${count}`)
  }
  console.log(`Dossier cible: ${targetBaseDir}`)
}

await main()

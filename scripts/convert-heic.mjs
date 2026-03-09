import fs from 'node:fs/promises'
import path from 'node:path'
import { promisify } from 'node:util'
import { execFile } from 'node:child_process'
import sharp from 'sharp'

const inputDir = path.resolve('photos_mbamenageurs.HEIC')
const outputBaseDir = path.resolve('public/images/converted')
const outputJpgDir = path.join(outputBaseDir, 'jpg')
const outputWebpDir = path.join(outputBaseDir, 'webp')
const supportedInputExts = new Set(['.heic', '.heif'])
const concurrency = 4
const execFileAsync = promisify(execFile)

async function ensureDirs() {
  await fs.mkdir(outputJpgDir, { recursive: true })
  await fs.mkdir(outputWebpDir, { recursive: true })
}

async function clearOutputDirs() {
  const targets = [outputJpgDir, outputWebpDir]
  for (const dir of targets) {
    const entries = await fs.readdir(dir, { withFileTypes: true })
    await Promise.all(
      entries
        .filter((entry) => entry.isFile())
        .map((entry) => fs.unlink(path.join(dir, entry.name))),
    )
  }
}

function chunk(array, size) {
  const chunks = []
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size))
  }
  return chunks
}

async function convertOne(filename) {
  const inputPath = path.join(inputDir, filename)
  const baseName = path.parse(filename).name
  const jpgPath = path.join(outputJpgDir, `${baseName}.jpg`)
  const webpPath = path.join(outputWebpDir, `${baseName}.webp`)

  // macOS sips decodes Apple HEIC reliably.
  await execFileAsync('sips', ['-s', 'format', 'jpeg', inputPath, '--out', jpgPath])
  await sharp(jpgPath, { limitInputPixels: false })
    .rotate()
    .webp({ quality: 82 })
    .toFile(webpPath)
}

async function main() {
  await ensureDirs()
  await clearOutputDirs()

  const entries = await fs.readdir(inputDir, { withFileTypes: true })
  const files = entries
    .filter((entry) => entry.isFile())
    .map((entry) => entry.name)
    .filter((name) => supportedInputExts.has(path.extname(name).toLowerCase()))
    .sort((a, b) => a.localeCompare(b))

  if (files.length === 0) {
    console.log('Aucun fichier HEIC/HEIF trouve dans le dossier source.')
    return
  }

  const errors = []
  let converted = 0

  for (const group of chunk(files, concurrency)) {
    await Promise.all(
      group.map(async (file) => {
        try {
          await convertOne(file)
          converted += 1
          console.log(`OK ${file}`)
        } catch (error) {
          const message = error instanceof Error ? error.message : String(error)
          errors.push({ file, message })
          console.error(`ERREUR ${file}: ${message}`)
        }
      }),
    )
  }

  console.log(`\nConversion terminee: ${converted}/${files.length} fichiers.`)
  console.log(`Dossier JPG: ${outputJpgDir}`)
  console.log(`Dossier WebP: ${outputWebpDir}`)

  if (errors.length > 0) {
    console.log(`\nEchecs: ${errors.length}`)
    for (const err of errors) {
      console.log(`- ${err.file}: ${err.message}`)
    }
    process.exitCode = 1
  }
}

await main()

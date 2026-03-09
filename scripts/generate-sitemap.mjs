// scripts/generate-sitemap.mjs
// Génère public/sitemap.xml avec toutes les URLs du site (statiques + slugs de projet)
// Exécuter avec : node scripts/generate-sitemap.mjs

import { writeFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..')

const BASE_URL = 'https://mb-amenageurs.fr'
const TODAY = new Date().toISOString().split('T')[0]

// Import dynamique du fichier de projets (CommonJS-friendly via JSON)
const { projects } = await import('../src/data/projects.ts').catch(async () => {
    // Fallback : lire les slugs depuis le fichier TypeScript par regex
    const { readFileSync } = await import('fs')
    const src = readFileSync(resolve(ROOT, 'src/data/projects.ts'), 'utf-8')
    const slugs = [...src.matchAll(/slug:\s*'([^']+)'/g)].map(m => m[1])
    return { projects: slugs.map(slug => ({ slug })) }
})

const staticPages = [
    { loc: '/', changefreq: 'monthly', priority: '1.0' },
    { loc: '/realisations', changefreq: 'weekly', priority: '0.9' },
    { loc: '/contact', changefreq: 'monthly', priority: '0.9' },
    { loc: '/faq', changefreq: 'monthly', priority: '0.6' },
    { loc: '/mentions-legales', changefreq: 'yearly', priority: '0.3' },
    { loc: '/politique-confidentialite', changefreq: 'yearly', priority: '0.3' },
]

const projectPages = (Array.isArray(projects) ? projects : []).map(p => ({
    loc: `/realisations/${p.slug}`,
    changefreq: 'monthly',
    priority: '0.7',
}))

const allPages = [...staticPages, ...projectPages]

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages.map(p => `  <url>
    <loc>${BASE_URL}${p.loc}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`).join('\n')}
</urlset>
`

const dest = resolve(ROOT, 'public/sitemap.xml')
writeFileSync(dest, xml, 'utf-8')
console.log(`✅ Sitemap généré : ${dest} (${allPages.length} URLs)`)
allPages.forEach(p => console.log(`   ${BASE_URL}${p.loc}`))

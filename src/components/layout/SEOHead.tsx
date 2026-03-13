import { Helmet } from 'react-helmet-async'
import { useLocation } from 'react-router-dom'

const BASE_URL = 'https://mb-amenageurs.fr'
const SITE_NAME = 'MB Aménageurs'
const DEFAULT_DESCRIPTION = 'MB Aménageurs rachète vos hangars, bâtiments industriels et locaux commerciaux en région PACA. Réponse garantie sous 48h.'
const DEFAULT_OG_IMAGE = `${BASE_URL}/og-default.jpg`

interface BreadcrumbItem {
    name: string
    url: string
}

interface SEOHeadProps {
    title?: string
    description?: string
    canonical?: string
    noindex?: boolean
    ogImage?: string
    breadcrumbs?: BreadcrumbItem[]
}

export default function SEOHead({ title, description, canonical, noindex, ogImage, breadcrumbs }: SEOHeadProps) {
    const { pathname } = useLocation()
    const fullTitle = title
        ? `${title} | ${SITE_NAME}`
        : `${SITE_NAME} — Rachat de hangars et bâtiments industriels en PACA`
    const desc = description || DEFAULT_DESCRIPTION
    const canonicalUrl = canonical ?? `${BASE_URL}${pathname}`
    const image = ogImage ?? DEFAULT_OG_IMAGE

    return (
        <Helmet>
            <title>{fullTitle}</title>
            <meta name="description" content={desc} />
            <link rel="canonical" href={canonicalUrl} />
            {noindex && <meta name="robots" content="noindex, nofollow" />}

            {/* Open Graph */}
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={desc} />
            <meta property="og:type" content="website" />
            <meta property="og:url" content={canonicalUrl} />
            <meta property="og:site_name" content={SITE_NAME} />
            <meta property="og:image" content={image} />
            <meta property="og:locale" content="fr_FR" />

            {/* Twitter Card */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={desc} />
            <meta name="twitter:image" content={image} />

            {/* Schema.org LocalBusiness */}
            <script type="application/ld+json">{JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'LocalBusiness',
                name: SITE_NAME,
                description: DEFAULT_DESCRIPTION,
                url: BASE_URL,
                telephone: '+33648069789',
                email: 'contact@mb-amenageurs.fr',
                image: DEFAULT_OG_IMAGE,
                priceRange: '€€',
                address: {
                    '@type': 'PostalAddress',
                    streetAddress: '541 Av. Frederic Mistral',
                    addressLocality: 'Carpentras',
                    postalCode: '84200',
                    addressCountry: 'FR',
                },
                geo: {
                    '@type': 'GeoCoordinates',
                    latitude: 44.0554,
                    longitude: 5.0527,
                },
                areaServed: [
                    'Vaucluse', 'Bouches-du-Rhône', 'Gard',
                    'Drôme', 'Var', 'Ardèche', 'Alpes-de-Haute-Provence',
                ],
                openingHoursSpecification: {
                    '@type': 'OpeningHoursSpecification',
                    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
                    opens: '09:00',
                    closes: '18:00',
                },
                sameAs: [
                    'https://www.google.com/maps/search/MB+Aménageurs+Carpentras',
                ],
            })}</script>

            {/* BreadcrumbList Schema */}
            {breadcrumbs && breadcrumbs.length > 0 && (
                <script type="application/ld+json">{JSON.stringify({
                    '@context': 'https://schema.org',
                    '@type': 'BreadcrumbList',
                    itemListElement: breadcrumbs.map((item, i) => ({
                        '@type': 'ListItem',
                        position: i + 1,
                        name: item.name,
                        item: item.url,
                    })),
                })}</script>
            )}
        </Helmet>
    )
}

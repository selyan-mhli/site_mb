export interface Project {
    id: string
    slug: string
    title: string
    type: 'hangar' | 'batiment-industriel' | 'local-commercial'
    typeLabel: string
    location: string
    department: string
    surface: string
    year: number
    description: string
    shortDescription: string
    cover: string
    gallery: string[]
    specs: { label: string; value: string }[]
}

export const projects: Project[] = [
    {
        id: '1',
        slug: 'entrepot-logistique-orange',
        title: 'Entrepôt Logistique Orange',
        type: 'hangar',
        typeLabel: 'Hangar',
        location: 'Orange',
        department: '84',
        surface: '2 500 m²',
        year: 2024,
        description: "Acquisition d'un vaste entrepôt logistique situé dans la zone industrielle d'Orange. Ce bâtiment de 2 500 m² avec une hauteur sous plafond de 8 mètres offre un espace idéal pour le stockage et la distribution. Équipé de 6 quais de chargement et d'un système sprinkler, il bénéficie d'un accès direct pour les poids lourds.",
        shortDescription: "Acquisition d'un entrepôt logistique de 2 500 m²",
        cover: '/images/projects/entrepot-orange/cover.jpg',
        gallery: [
            '/images/projects/entrepot-orange/vue-exterieure-1.jpg',
            '/images/projects/entrepot-orange/vue-exterieure-2.jpg',
            '/images/projects/entrepot-orange/vue-interieure-1.jpg',
            '/images/projects/entrepot-orange/vue-interieure-2.jpg',
            '/images/projects/entrepot-orange/vue-laterale.jpg',
        ],
        specs: [
            { label: 'Type', value: 'Hangar' },
            { label: 'Localisation', value: 'Orange (84)' },
            { label: 'Surface totale', value: '2 500 m²' },
            { label: 'Hauteur sous plafond', value: '8 mètres' },
            { label: 'Quais de chargement', value: '6 quais' },
            { label: 'Sécurité', value: 'Sprinkler' },
            { label: 'Accès poids lourds', value: 'Direct' },
        ],
    },
    {
        id: '2',
        slug: 'complexe-industriel-carpentras',
        title: 'Complexe Industriel Carpentras',
        type: 'batiment-industriel',
        typeLabel: 'Bâtiment industriel',
        location: 'Carpentras',
        department: '84',
        surface: '4 200 m²',
        year: 2024,
        description: "Rachat d'un complexe industriel à Carpentras comprenant plusieurs bâtiments de production et bureaux attenants. Ce site de 4 200 m² est situé dans un secteur stratégique avec un accès routier facilité.",
        shortDescription: "Rachat d'un complexe de production de 4 200 m²",
        cover: '/images/projects/entrepot-orange/vue-exterieure-2.jpg',
        gallery: [
            '/images/projects/entrepot-orange/vue-exterieure-2.jpg',
            '/images/projects/entrepot-orange/vue-arriere.jpg',
            '/images/projects/entrepot-orange/vue-detail.jpg',
        ],
        specs: [
            { label: 'Type', value: 'Bâtiment industriel' },
            { label: 'Localisation', value: 'Carpentras (84)' },
            { label: 'Surface totale', value: '4 200 m²' },
            { label: 'Terrain', value: '6 500 m²' },
            { label: 'Bureaux', value: '350 m²' },
            { label: 'Année construction', value: '1998' },
        ],
    },
    {
        id: '3',
        slug: 'local-commercial-avignon',
        title: 'Local Commercial Avignon',
        type: 'local-commercial',
        typeLabel: 'Local commercial',
        location: 'Avignon',
        department: '84',
        surface: '350 m²',
        year: 2023,
        description: "Acquisition d'un local commercial en périphérie d'Avignon. Cet espace de 350 m² avec vitrine et parking privatif est idéalement situé sur un axe passant.",
        shortDescription: "Acquisition d'un local commercial de 350 m²",
        cover: '/images/projects/entrepot-orange/vue-interieure-1.jpg',
        gallery: [
            '/images/projects/entrepot-orange/vue-interieure-1.jpg',
            '/images/projects/entrepot-orange/vue-interieure-2.jpg',
        ],
        specs: [
            { label: 'Type', value: 'Local commercial' },
            { label: 'Localisation', value: 'Avignon (84)' },
            { label: 'Surface', value: '350 m²' },
            { label: 'Vitrine', value: '12 ml' },
            { label: 'Parking', value: '15 places' },
        ],
    },
    {
        id: '4',
        slug: 'hangar-stockage-cavaillon',
        title: 'Hangar de Stockage Cavaillon',
        type: 'hangar',
        typeLabel: 'Hangar',
        location: 'Cavaillon',
        department: '84',
        surface: '1 800 m²',
        year: 2023,
        description: "Rachat d'un hangar de stockage à Cavaillon dans un secteur agricole et logistique. Structure métallique en bon état avec large porte d'accès.",
        shortDescription: "Rachat d'un hangar de stockage de 1 800 m²",
        cover: '/images/projects/entrepot-orange/vue-arriere.jpg',
        gallery: [
            '/images/projects/entrepot-orange/vue-arriere.jpg',
            '/images/projects/entrepot-orange/vue-laterale.jpg',
        ],
        specs: [
            { label: 'Type', value: 'Hangar' },
            { label: 'Localisation', value: 'Cavaillon (84)' },
            { label: 'Surface', value: '1 800 m²' },
            { label: 'Hauteur', value: '6 mètres' },
        ],
    },
]

export const projectFilters = [
    { value: 'tous', label: 'Tous les projets' },
    { value: 'hangar', label: 'Hangars' },
    { value: 'batiment-industriel', label: 'Bâtiments industriels' },
    { value: 'local-commercial', label: 'Locaux commerciaux' },
]

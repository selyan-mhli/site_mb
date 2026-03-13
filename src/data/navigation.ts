export const navigation = [
    { to: '/', label: 'Accueil' },
    { to: '/realisations', label: 'Réalisations' },
    { to: '/blog', label: 'Blog' },
    { to: '/contact', label: 'Contact' },
]

export const companyInfo = {
    name: 'MB Aménageurs',
    phone: '06 48 06 97 89',
    phoneHref: 'tel:+33648069789',
    email: 'contact@mb-amenageurs.fr',
    emailHref: 'mailto:contact@mb-amenageurs.fr',
    address: '541 Av. Frederic Mistral, 84200 Carpentras',
    addressHref: 'https://www.google.com/maps?q=541+Av.+Frederic+Mistral+84200+Carpentras',
    zone: [
        'Vaucluse (84)',
        'Bouches-du-Rhône (13)',
        'Gard (30)',
        'Drôme (26)',
        'Ardèche (07)',
        'Alpes-de-Haute-Provence (04)',
        'Var (83)',
    ],
}

export const stats = [
    { value: 50, suffix: '+', label: 'Biens rachetés' },
    { value: 48, suffix: 'h', label: 'Délai de réponse' },
    { value: 100, suffix: '%', label: 'Demandes traitées' },
    { value: 7, suffix: '', label: 'Départements couverts' },
]

export const advantages = [
    {
        icon: 'clock',
        title: 'Réponse sous 48h',
        description: 'Chaque demande reçoit une réponse ferme en moins de 48 heures.',
    },
    {
        icon: 'map',
        title: 'Expertise PACA',
        description: 'Connaissance approfondie du marché immobilier professionnel local.',
    },
    {
        icon: 'shield',
        title: 'Transaction sécurisée',
        description: 'Processus encadré par des professionnels du droit immobilier.',
    },
    {
        icon: 'star',
        title: 'Évaluation gratuite',
        description: 'Estimation offerte et sans engagement de votre bien.',
    },
    {
        icon: 'users',
        title: 'Accompagnement dédié',
        description: 'Un interlocuteur unique du premier contact à la signature.',
    },
    {
        icon: 'trending',
        title: 'Réseau qualifié',
        description: "Un réseau d'acheteurs et de partenaires professionnels.",
    },
]

export const faqData = [
    {
        question: 'Quels types de biens rachetez-vous ?',
        answer: 'Nous rachetons des hangars industriels, bâtiments industriels, locaux commerciaux, entrepôts et ateliers dans le Vaucluse et les départements limitrophes de la région PACA.',
    },
    {
        question: 'Quelle est votre zone d\'intervention ?',
        answer: 'Nous intervenons principalement dans le Vaucluse (84), les Bouches-du-Rhône (13), le Gard (30), la Drôme (26), l\'Ardèche (07), les Alpes-de-Haute-Provence (04) et le Var (83).',
    },
    {
        question: 'Combien de temps prend le processus d\'acquisition ?',
        answer: 'Nous garantissons une première réponse sous 48h. Le processus complet, de la première visite à la signature, prend généralement entre 4 et 12 semaines selon la complexité du dossier.',
    },
    {
        question: 'L\'estimation est-elle gratuite ?',
        answer: 'Oui, l\'évaluation de votre bien est entièrement gratuite et sans engagement. Contactez-nous pour planifier une visite.',
    },
    {
        question: 'Quels documents dois-je fournir ?',
        answer: 'Pour une première évaluation, nous avons besoin de photos du bien, de sa surface approximative et de sa localisation. Les documents cadastraux et diagnostics seront demandés dans un second temps.',
    },
]

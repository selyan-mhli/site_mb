export interface Testimonial {
    id: string
    name: string
    role: string
    location: string
    text: string
    rating: number
    propertyType: string
    date: string
}

export const testimonials: Testimonial[] = [
    {
        id: '1',
        name: 'Jean-Pierre M.',
        role: 'Chef d\'entreprise',
        location: 'Orange (84)',
        text: 'MB Aménageurs a racheté notre entrepôt logistique en moins de 6 semaines. Le processus a été fluide, transparent et le prix proposé correspondait à nos attentes. Je recommande vivement.',
        rating: 5,
        propertyType: 'Entrepôt logistique',
        date: '2024-11',
    },
    {
        id: '2',
        name: 'Marie-Claire D.',
        role: 'Retraitée',
        location: 'Carpentras (84)',
        text: 'Après le décès de mon mari, je ne savais pas comment gérer notre bâtiment industriel. MB Aménageurs m\'a accompagnée avec professionnalisme et humanité. Réponse en 24h et vente conclue en 2 mois.',
        rating: 5,
        propertyType: 'Bâtiment industriel',
        date: '2024-09',
    },
    {
        id: '3',
        name: 'Laurent B.',
        role: 'Gérant de société',
        location: 'Avignon (84)',
        text: 'Nous avons vendu notre local commercial pour nous agrandir ailleurs. L\'estimation était juste, les délais respectés, et l\'équipe très réactive. Un seul interlocuteur du début à la fin.',
        rating: 5,
        propertyType: 'Local commercial',
        date: '2024-07',
    },
    {
        id: '4',
        name: 'Stéphane R.',
        role: 'Agriculteur',
        location: 'Cavaillon (84)',
        text: 'Je cherchais à vendre un hangar de stockage inutilisé depuis des années. MB Aménageurs a fait une offre rapide et correcte. La transaction s\'est faite simplement, sans mauvaises surprises.',
        rating: 4,
        propertyType: 'Hangar de stockage',
        date: '2024-05',
    },
    {
        id: '5',
        name: 'Isabelle et François T.',
        role: 'Propriétaires',
        location: 'Apt (84)',
        text: 'Excellente expérience avec MB Aménageurs pour la vente de notre atelier. L\'équipe est sérieuse, le suivi impeccable et le notaire a confirmé que tout était en ordre. Merci !',
        rating: 5,
        propertyType: 'Atelier',
        date: '2024-03',
    },
    {
        id: '6',
        name: 'Philippe G.',
        role: 'Directeur logistique',
        location: 'Nîmes (30)',
        text: 'Nous avions besoin de vendre rapidement un site industriel dans le Gard. MB Aménageurs a été la seule entreprise à nous répondre en moins de 48h avec une offre concrète. Promesse tenue.',
        rating: 5,
        propertyType: 'Site industriel',
        date: '2023-12',
    },
]

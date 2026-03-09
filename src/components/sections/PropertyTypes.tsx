import styles from './PropertyTypes.module.css'

const types = [
    {
        icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 21h18" /><path d="M5 21V7l8-4v18" /><path d="M19 21V11l-6-4" /></svg>,
        title: 'Hangars Industriels',
        desc: "Espaces de stockage et production de grande envergure, structures métalliques et entrepôts.",
        image: '/images/projects/entrepot-orange/vue-exterieure-1.jpg',
    },
    {
        icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect width="16" height="20" x="4" y="2" rx="2" /><path d="M9 22v-4h6v4" /><path d="M8 6h.01M16 6h.01M12 6h.01M12 10h.01M12 14h.01M16 10h.01M16 14h.01M8 10h.01M8 14h.01" /></svg>,
        title: 'Bâtiments Industriels',
        desc: "Complexes industriels, sites de production, ateliers et locaux d'activité.",
        image: '/images/projects/entrepot-orange/vue-laterale.jpg',
    },
    {
        icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z" /><path d="M6 12h4h4" /><path d="M6 20h4h4" /></svg>,
        title: 'Locaux Commerciaux',
        desc: "Espaces commerciaux et de vente, vitrines et surfaces de retail.",
        image: '/images/projects/entrepot-orange/vue-interieure-1.jpg',
    },
]

export default function PropertyTypes() {
    return (
        <section className={`section ${styles.section}`}>
            <div className="container">
                <div className={styles.header}>
                    <h2>Types de biens recherchés</h2>
                    <p>Nous nous spécialisons dans l'acquisition de biens immobiliers professionnels.</p>
                </div>

                <div className={styles.grid}>
                    {types.map((type, i) => (
                        <div
                            key={i}
                            className={styles.card}
                        >
                            <div className={styles.imageWrap}>
                                <img src={type.image} alt={type.title} width={600} height={400} loading="lazy" decoding="async" />
                                <div className={styles.imageOverlay} />
                            </div>
                            <div className={styles.cardContent}>
                                <div className={styles.icon}>{type.icon}</div>
                                <h3>{type.title}</h3>
                                <p>{type.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

import { Link } from 'react-router-dom'
import styles from './CTABanner.module.css'

export default function CTABanner() {
    return (
        <section className={styles.cta}>
            <div className={styles.bg}>
                <img
                    src="/images/projects/entrepot-orange/vue-exterieure-2.jpg"
                    alt=""
                    width={1920}
                    height={600}
                    loading="lazy"
                    decoding="async"
                />
                <div className={styles.overlay} />
            </div>

            <div className="container">
                <div className={styles.content}>
                    <h2>Prêt à vendre votre bien ?</h2>
                    <p>
                        Contactez-nous dès aujourd'hui et recevez une réponse ferme sous 48h.
                        C'est notre engagement.
                    </p>
                    <Link to="/contact" className="btn btn-primary btn-lg">
                        Demander une estimation gratuite
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </Link>
                </div>
            </div>
        </section>
    )
}

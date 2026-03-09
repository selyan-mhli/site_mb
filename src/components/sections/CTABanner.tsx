import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
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
                />
                <div className={styles.overlay} />
            </div>

            <div className="container">
                <motion.div
                    className={styles.content}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
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
                </motion.div>
            </div>
        </section>
    )
}

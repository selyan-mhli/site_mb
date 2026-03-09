import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import SEOHead from '@/components/layout/SEOHead'
import styles from './ThankYou.module.css'

export default function ThankYou() {
    return (
        <>
            <SEOHead title="Merci" noindex />

            <section className={styles.page}>
                <div className="container">
                    <motion.div
                        className={styles.card}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className={styles.icon}>
                            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                                <polyline points="22 4 12 14.01 9 11.01" />
                            </svg>
                        </div>
                        <h1>Merci pour votre demande !</h1>
                        <p>
                            Nous avons bien reçu votre message et vous recontacterons
                            dans un délai de <strong>48 heures</strong>.
                        </p>
                        <div className={styles.actions}>
                            <Link to="/" className="btn btn-primary">
                                Retour à l'accueil
                            </Link>
                            <Link to="/realisations" className="btn btn-outline">
                                Voir nos réalisations
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>
        </>
    )
}

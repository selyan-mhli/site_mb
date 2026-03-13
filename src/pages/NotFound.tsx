import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import SEOHead from '@/components/layout/SEOHead'
import styles from './NotFound.module.css'

export default function NotFound() {
    return (
        <>
            <SEOHead
                title="Page introuvable"
                description="La page que vous cherchez n'existe pas ou a été déplacée. Retournez à l'accueil de MB Aménageurs."
                noindex={true}
            />
            <section className={styles.page}>
                <div className="container">
                    <motion.div
                        className={styles.content}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <p className={styles.code}>404</p>
                        <h1 className={styles.title}>Page introuvable</h1>
                        <p className={styles.desc}>
                            La page que vous cherchez n'existe pas ou a été déplacée.
                        </p>
                        <div className={styles.actions}>
                            <Link to="/" className="btn btn-primary btn-lg">
                                Retour à l'accueil
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M5 12h14M12 5l7 7-7 7" />
                                </svg>
                            </Link>
                            <Link to="/contact" className="btn btn-outline btn-lg">
                                Nous contacter
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>
        </>
    )
}

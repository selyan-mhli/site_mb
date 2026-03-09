import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import styles from './Hero.module.css'

const container = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
}

const item = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

export default function Hero() {
    return (
        <section className={styles.hero}>
            <div className={styles.bg}>
                <img
                    src="/images/projects/entrepot-orange/cover.jpg"
                    alt="Hangar industriel racheté par MB Aménageurs"
                    width={1920}
                    height={800}
                    loading="eager"
                    fetchPriority="high"
                />
                <div className={styles.overlay} />
            </div>

            <div className="container">
                <motion.div
                    className={styles.content}
                    variants={container}
                    initial="hidden"
                    animate="visible"
                >
                    <motion.div variants={item} className="badge badge-white">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <circle cx="12" cy="12" r="10" /><polyline points="12,6 12,12 16,14" />
                        </svg>
                        Réponse garantie sous 48h
                    </motion.div>

                    <motion.h1 variants={item} className={styles.title}>
                        Vendez votre bien<br />
                        <span className={styles.accent}>industriel rapidement</span>
                    </motion.h1>

                    <motion.p variants={item} className={styles.desc}>
                        MB Aménageurs rachète vos hangars, bâtiments industriels et locaux
                        commerciaux dans le Vaucluse et les départements limitrophes.
                    </motion.p>

                    <motion.div variants={item} className={styles.actions}>
                        <Link to="/contact" className="btn btn-primary btn-lg">
                            Demander une estimation
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                        </Link>
                        <Link to="/realisations" className="btn btn-secondary btn-lg">
                            Nos réalisations
                        </Link>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    )
}

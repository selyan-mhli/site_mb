import { useState } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import SEOHead from '@/components/layout/SEOHead'
import { projects } from '@/data/projects'
import styles from './ProjectDetail.module.css'

export default function ProjectDetail() {
    const { slug } = useParams()
    const project = projects.find(p => p.slug === slug)
    const [activeImage, setActiveImage] = useState(0)
    const [lightboxOpen, setLightboxOpen] = useState(false)

    if (!project) return <Navigate to="/realisations" replace />

    return (
        <>
            <SEOHead
                title={project.title}
                description={`${project.description.slice(0, 155)}...`}
            />

            <section className={styles.hero}>
                <div className="container">
                    <Link to="/realisations" className={styles.back}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
                        Retour aux réalisations
                    </Link>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        {project.title}
                    </motion.h1>

                    <div className={styles.heroMeta}>
                        <span className="badge badge-accent">{project.typeLabel}</span>
                        <span>{project.location} ({project.department})</span>
                        <span>{project.surface}</span>
                    </div>
                </div>
            </section>

            <section className={`section ${styles.detail}`}>
                <div className="container">
                    <div className={styles.layout}>
                        {/* Gallery */}
                        <motion.div
                            className={styles.gallery}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.15 }}
                        >
                            <div className={styles.mainImage} onClick={() => setLightboxOpen(true)}>
                                <img
                                    src={project.gallery[activeImage]}
                                    alt={`${project.title} — vue ${activeImage + 1}`}
                                    width={1200}
                                    height={800}
                                    decoding="async"
                                />
                                <div className={styles.zoomHint}>
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" /><path d="M11 8v6M8 11h6" /></svg>
                                </div>
                            </div>

                            <div className={styles.thumbs}>
                                {project.gallery.map((img, i) => (
                                    <button
                                        key={i}
                                        className={`${styles.thumb} ${i === activeImage ? styles.thumbActive : ''}`}
                                        onClick={() => setActiveImage(i)}
                                        aria-label={`Vue ${i + 1}`}
                                    >
                                        <img src={img} alt="" width={120} height={80} loading="lazy" decoding="async" />
                                    </button>
                                ))}
                            </div>
                        </motion.div>

                        {/* Sidebar */}
                        <motion.div
                            className={styles.sidebar}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.25 }}
                        >
                            <div className={styles.specsCard}>
                                <h3>Caractéristiques</h3>
                                <dl className={styles.specsList}>
                                    {project.specs.map((spec, i) => (
                                        <div key={i} className={styles.specItem}>
                                            <dt>{spec.label}</dt>
                                            <dd>{spec.value}</dd>
                                        </div>
                                    ))}
                                </dl>
                            </div>

                            <div className={styles.ctaCard}>
                                <h3>Vous avez un bien similaire ?</h3>
                                <p>Contactez-nous pour une estimation gratuite et sans engagement.</p>
                                <Link to="/contact" className="btn btn-primary btn-full">
                                    Demander une estimation
                                </Link>
                            </div>
                        </motion.div>
                    </div>

                    {/* Description */}
                    <motion.div
                        className={styles.description}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                    >
                        <h2>Description du projet</h2>
                        <p>{project.description}</p>
                    </motion.div>
                </div>
            </section>

            {/* Lightbox */}
            <AnimatePresence>
                {lightboxOpen && (
                    <motion.div
                        className={styles.lightbox}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setLightboxOpen(false)}
                    >
                        <motion.img
                            src={project.gallery[activeImage]}
                            alt={project.title}
                            initial={{ scale: 0.9 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.9 }}
                            transition={{ duration: 0.3 }}
                            onClick={e => e.stopPropagation()}
                        />
                        <button
                            className={styles.lightboxClose}
                            onClick={() => setLightboxOpen(false)}
                            aria-label="Fermer"
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12" /></svg>
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}

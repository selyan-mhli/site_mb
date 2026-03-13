import { useState } from 'react'
import { motion } from 'framer-motion'
import SEOHead from '@/components/layout/SEOHead'
import ProjectCard from '@/components/projects/ProjectCard'
import { projects, projectFilters } from '@/data/projects'
import styles from './Projects.module.css'

export default function Projects() {
    const [filter, setFilter] = useState('tous')

    const filtered = filter === 'tous' ? projects : projects.filter(p => p.type === filter)

    return (
        <>
            <SEOHead
                title="Réalisations"
                description="Découvrez l'ensemble de nos acquisitions de hangars, bâtiments industriels et locaux commerciaux en région PACA."
                breadcrumbs={[
                    { name: 'Accueil', url: 'https://mb-amenageurs.fr/' },
                    { name: 'Réalisations', url: 'https://mb-amenageurs.fr/realisations' },
                ]}
            />

            <section className={styles.hero}>
                <div className="container">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        Nos réalisations
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        {projects.length} biens acquis en région PACA
                    </motion.p>
                </div>
            </section>

            <section className={`section ${styles.listing}`}>
                <div className="container">
                    <div className={styles.filters} role="group" aria-label="Filtrer les projets">
                        {projectFilters.map((f) => (
                            <button
                                key={f.value}
                                className={`${styles.filterBtn} ${filter === f.value ? styles.active : ''}`}
                                onClick={() => setFilter(f.value)}
                                aria-pressed={filter === f.value}
                            >
                                {f.label}
                            </button>
                        ))}
                    </div>

                    <div className={styles.grid}>
                        {filtered.map((project, i) => (
                            <motion.div
                                key={project.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: i * 0.08 }}
                                layout
                            >
                                <ProjectCard project={project} />
                            </motion.div>
                        ))}
                    </div>

                    {filtered.length === 0 && (
                        <div className={styles.empty}>
                            <p>Aucun projet trouvé pour ce filtre.</p>
                            <button onClick={() => setFilter('tous')} className="btn btn-outline">
                                Voir tous les projets
                            </button>
                        </div>
                    )}
                </div>
            </section>
        </>
    )
}

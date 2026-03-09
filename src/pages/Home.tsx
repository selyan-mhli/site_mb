import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import SEOHead from '@/components/layout/SEOHead'
import Hero from '@/components/sections/Hero'
import StatsBar from '@/components/sections/StatsBar'
import PropertyTypes from '@/components/sections/PropertyTypes'
import Advantages from '@/components/sections/Advantages'
import CTABanner from '@/components/sections/CTABanner'
import ProjectCard from '@/components/projects/ProjectCard'
import { projects } from '@/data/projects'
import styles from './Home.module.css'

export default function Home() {
    const featuredProjects = projects.slice(0, 3)

    return (
        <>
            <SEOHead />
            <Hero />
            <StatsBar />
            <PropertyTypes />

            {/* Featured projects */}
            <section className={`section ${styles.projectsSection}`}>
                <div className="container">
                    <motion.div
                        className={styles.sectionHeader}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2>Nos dernières réalisations</h2>
                        <p>Découvrez nos acquisitions récentes dans la région PACA.</p>
                    </motion.div>

                    <div className={styles.projectGrid}>
                        {featuredProjects.map((project, i) => (
                            <motion.div
                                key={project.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                            >
                                <ProjectCard project={project} />
                            </motion.div>
                        ))}
                    </div>

                    <motion.div
                        className={styles.viewAll}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                    >
                        <Link to="/realisations" className="btn btn-outline">
                            Voir toutes les réalisations
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                        </Link>
                    </motion.div>
                </div>
            </section>

            <Advantages />
            <CTABanner />
        </>
    )
}

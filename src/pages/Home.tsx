import { Link } from 'react-router-dom'
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
                    <div className={styles.sectionHeader}>
                        <h2>Nos dernières réalisations</h2>
                        <p>Découvrez nos acquisitions récentes dans la région PACA.</p>
                    </div>

                    <div className={styles.projectGrid}>
                        {featuredProjects.map((project) => (
                            <div key={project.id}>
                                <ProjectCard project={project} />
                            </div>
                        ))}
                    </div>

                    <div className={styles.viewAll}>
                        <Link to="/realisations" className="btn btn-outline">
                            Voir toutes les réalisations
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </section>

            <Advantages />
            <CTABanner />
        </>
    )
}

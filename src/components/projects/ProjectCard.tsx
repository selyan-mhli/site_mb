import { Link } from 'react-router-dom'
import type { Project } from '@/data/projects'
import styles from './ProjectCard.module.css'

interface Props {
    project: Project
}

export default function ProjectCard({ project }: Props) {
    return (
        <article className={styles.card}>
            <Link to={`/realisations/${project.slug}`} className={styles.link}>
                <div className={styles.imageWrap}>
                    <img
                        src={project.cover}
                        alt={`${project.title} — ${project.surface}`}
                        width={600}
                        height={400}
                        loading="lazy"
                    />
                    <span className={styles.typeBadge}>{project.typeLabel}</span>
                </div>

                <div className={styles.content}>
                    <h3 className={styles.title}>{project.title}</h3>
                    <p className={styles.desc}>{project.shortDescription}</p>

                    <div className={styles.meta}>
                        <span className={styles.metaItem}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
                            {project.location} ({project.department})
                        </span>
                        <span className={styles.metaItem}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 3 21 3 21 9" /><polyline points="9 21 3 21 3 15" /><line x1="21" y1="3" x2="14" y2="10" /><line x1="3" y1="21" x2="10" y2="14" /></svg>
                            {project.surface}
                        </span>
                    </div>

                    <span className={styles.viewLink}>
                        Voir le projet
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                    </span>
                </div>
            </Link>
        </article>
    )
}

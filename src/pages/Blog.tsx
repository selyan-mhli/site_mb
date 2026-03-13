import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import SEOHead from '@/components/layout/SEOHead'
import { blogPosts, blogCategories } from '@/data/blog'
import styles from './Blog.module.css'

export default function Blog() {
    const [filter, setFilter] = useState('tous')

    const filtered = filter === 'tous' ? blogPosts : blogPosts.filter(p => p.category === filter)

    return (
        <>
            <SEOHead
                title="Blog"
                description="Conseils, guides et expertise pour vendre votre hangar, bâtiment industriel ou local commercial en PACA."
                breadcrumbs={[
                    { name: 'Accueil', url: 'https://mb-amenageurs.fr/' },
                    { name: 'Blog', url: 'https://mb-amenageurs.fr/blog' },
                ]}
            />

            <section className={styles.hero}>
                <div className="container">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        Blog & Conseils
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        Guides pratiques pour vendre votre bien professionnel.
                    </motion.p>
                </div>
            </section>

            <section className={`section ${styles.listing}`}>
                <div className="container">
                    <div className={styles.filters} role="group" aria-label="Filtrer les articles">
                        {blogCategories.map((c) => (
                            <button
                                key={c.value}
                                className={`${styles.filterBtn} ${filter === c.value ? styles.active : ''}`}
                                onClick={() => setFilter(c.value)}
                                aria-pressed={filter === c.value}
                            >
                                {c.label}
                            </button>
                        ))}
                    </div>

                    <div className={styles.grid}>
                        {filtered.map((post, i) => (
                            <motion.article
                                key={post.id}
                                className={styles.card}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: i * 0.08 }}
                            >
                                <Link to={`/blog/${post.slug}`} className={styles.cardLink}>
                                    <div className={styles.cardImage}>
                                        <img src={post.cover} alt={post.title} width={600} height={400} loading="lazy" decoding="async" />
                                        <span className={styles.categoryBadge}>{post.category}</span>
                                    </div>
                                    <div className={styles.cardContent}>
                                        <div className={styles.meta}>
                                            <time dateTime={post.date}>
                                                {new Date(post.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                                            </time>
                                            <span>{post.readTime} min de lecture</span>
                                        </div>
                                        <h2>{post.title}</h2>
                                        <p>{post.excerpt}</p>
                                        <span className={styles.readMore}>
                                            Lire l'article
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                                        </span>
                                    </div>
                                </Link>
                            </motion.article>
                        ))}
                    </div>
                </div>
            </section>
        </>
    )
}

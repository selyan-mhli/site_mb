import { useParams, Link, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import SEOHead from '@/components/layout/SEOHead'
import { blogPosts } from '@/data/blog'
import styles from './BlogPost.module.css'

export default function BlogPost() {
    const { slug } = useParams()
    const post = blogPosts.find(p => p.slug === slug)

    if (!post) return <Navigate to="/blog" replace />

    const currentIndex = blogPosts.indexOf(post)
    const prevPost = currentIndex > 0 ? blogPosts[currentIndex - 1] : null
    const nextPost = currentIndex < blogPosts.length - 1 ? blogPosts[currentIndex + 1] : null

    const articleSchema = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: post.title,
        description: post.excerpt,
        image: `https://mb-amenageurs.fr${post.cover}`,
        datePublished: post.date,
        author: {
            '@type': 'Organization',
            name: 'MB Aménageurs',
        },
        publisher: {
            '@type': 'Organization',
            name: 'MB Aménageurs',
            logo: {
                '@type': 'ImageObject',
                url: 'https://mb-amenageurs.fr/logo.png',
            },
        },
    }

    // Simple markdown-like rendering: ## for h2, ### for h3, paragraphs
    const renderContent = (content: string) => {
        return content.split('\n\n').map((block, i) => {
            const trimmed = block.trim()
            if (!trimmed) return null
            if (trimmed.startsWith('### ')) return <h3 key={i}>{trimmed.slice(4)}</h3>
            if (trimmed.startsWith('## ')) return <h2 key={i}>{trimmed.slice(3)}</h2>
            if (trimmed.startsWith('- ')) {
                const items = trimmed.split('\n').filter(l => l.startsWith('- '))
                return (
                    <ul key={i}>
                        {items.map((item, j) => <li key={j}>{item.slice(2)}</li>)}
                    </ul>
                )
            }
            return <p key={i}>{trimmed}</p>
        })
    }

    return (
        <>
            <SEOHead
                title={post.title}
                description={post.excerpt}
                ogImage={`https://mb-amenageurs.fr${post.cover}`}
                breadcrumbs={[
                    { name: 'Accueil', url: 'https://mb-amenageurs.fr/' },
                    { name: 'Blog', url: 'https://mb-amenageurs.fr/blog' },
                    { name: post.title, url: `https://mb-amenageurs.fr/blog/${post.slug}` },
                ]}
            />
            <Helmet>
                <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
            </Helmet>

            <section className={styles.hero}>
                <div className="container">
                    <Link to="/blog" className={styles.back}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
                        Retour au blog
                    </Link>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className={styles.meta}>
                            <span className={styles.categoryBadge}>{post.category}</span>
                            <time dateTime={post.date}>
                                {new Date(post.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                            </time>
                            <span>{post.readTime} min de lecture</span>
                        </div>
                        <h1>{post.title}</h1>
                    </motion.div>
                </div>
            </section>

            <section className={`section ${styles.content}`}>
                <div className="container">
                    <motion.div
                        className={styles.coverWrap}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.15 }}
                    >
                        <img src={post.cover} alt={post.title} width={1200} height={600} decoding="async" />
                    </motion.div>

                    <motion.article
                        className={styles.article}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.25 }}
                    >
                        {renderContent(post.content)}

                        <div className={styles.cta}>
                            <h2>Vous avez un bien à vendre ?</h2>
                            <p>Contactez MB Aménageurs pour une estimation gratuite et sans engagement.</p>
                            <Link to="/contact" className="btn btn-primary btn-lg">
                                Demander une estimation
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                            </Link>
                        </div>
                    </motion.article>

                    {/* Navigation between posts */}
                    <div className={styles.postNav}>
                        {prevPost ? (
                            <Link to={`/blog/${prevPost.slug}`} className={styles.postNavLink}>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
                                <div>
                                    <span className={styles.postNavLabel}>Article précédent</span>
                                    <span className={styles.postNavTitle}>{prevPost.title}</span>
                                </div>
                            </Link>
                        ) : <div />}
                        {nextPost ? (
                            <Link to={`/blog/${nextPost.slug}`} className={`${styles.postNavLink} ${styles.postNavRight}`}>
                                <div>
                                    <span className={styles.postNavLabel}>Article suivant</span>
                                    <span className={styles.postNavTitle}>{nextPost.title}</span>
                                </div>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                            </Link>
                        ) : <div />}
                    </div>
                </div>
            </section>
        </>
    )
}

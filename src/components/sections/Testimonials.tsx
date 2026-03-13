import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { testimonials } from '@/data/testimonials'
import styles from './Testimonials.module.css'

function Stars({ count }: { count: number }) {
    return (
        <div className={styles.stars} aria-label={`${count} étoiles sur 5`}>
            {Array.from({ length: 5 }).map((_, i) => (
                <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill={i < count ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
                    <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
                </svg>
            ))}
        </div>
    )
}

export default function Testimonials() {
    const [active, setActive] = useState(0)
    const visible = testimonials.slice(0, 3)

    return (
        <section className={`section ${styles.section}`}>
            <div className="container">
                <div className={styles.header}>
                    <h2>Ce que disent nos clients</h2>
                    <p>Des propriétaires satisfaits partout en région PACA.</p>
                </div>

                {/* Desktop: grid */}
                <div className={styles.grid}>
                    {visible.map((t, i) => (
                        <motion.div
                            key={t.id}
                            className={styles.card}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: i * 0.1 }}
                        >
                            <Stars count={t.rating} />
                            <blockquote className={styles.quote}>
                                <p>"{t.text}"</p>
                            </blockquote>
                            <div className={styles.author}>
                                <div className={styles.avatar}>
                                    {t.name.split(' ').map(n => n[0]).join('')}
                                </div>
                                <div>
                                    <strong>{t.name}</strong>
                                    <span>{t.role} — {t.location}</span>
                                </div>
                            </div>
                            <div className={styles.propertyBadge}>{t.propertyType}</div>
                        </motion.div>
                    ))}
                </div>

                {/* Mobile: carousel */}
                <div className={styles.carousel}>
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={active}
                            className={styles.card}
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -30 }}
                            transition={{ duration: 0.3 }}
                        >
                            <Stars count={testimonials[active].rating} />
                            <blockquote className={styles.quote}>
                                <p>"{testimonials[active].text}"</p>
                            </blockquote>
                            <div className={styles.author}>
                                <div className={styles.avatar}>
                                    {testimonials[active].name.split(' ').map(n => n[0]).join('')}
                                </div>
                                <div>
                                    <strong>{testimonials[active].name}</strong>
                                    <span>{testimonials[active].role} — {testimonials[active].location}</span>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                    <div className={styles.dots}>
                        {testimonials.map((_, i) => (
                            <button
                                key={i}
                                className={`${styles.dot} ${i === active ? styles.dotActive : ''}`}
                                onClick={() => setActive(i)}
                                aria-label={`Témoignage ${i + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

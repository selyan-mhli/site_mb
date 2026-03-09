import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { stats } from '@/data/navigation'
import styles from './StatsBar.module.css'

function AnimatedNumber({ target, suffix }: { target: number; suffix: string }) {
    const [count, setCount] = useState(0)
    const ref = useRef<HTMLSpanElement>(null)
    const inView = useInView(ref, { once: true, margin: '-50px' })

    useEffect(() => {
        if (!inView) return
        let start = 0
        const duration = 2000
        const startTime = performance.now()

        function animate(now: number) {
            const elapsed = now - startTime
            const progress = Math.min(elapsed / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3) // easeOutCubic
            start = Math.round(eased * target)
            setCount(start)
            if (progress < 1) requestAnimationFrame(animate)
        }

        requestAnimationFrame(animate)
    }, [inView, target])

    return <span ref={ref}>{count}{suffix}</span>
}

export default function StatsBar() {
    return (
        <section className={styles.stats}>
            <div className="container">
                <div className={styles.grid}>
                    {stats.map((stat, i) => (
                        <motion.div
                            key={i}
                            className={styles.item}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                        >
                            <span className={styles.number}>
                                <AnimatedNumber target={stat.value} suffix={stat.suffix} />
                            </span>
                            <span className={styles.label}>{stat.label}</span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

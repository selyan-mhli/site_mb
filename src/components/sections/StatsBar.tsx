import { useRef, useEffect, useState } from 'react'
import { stats } from '@/data/navigation'
import styles from './StatsBar.module.css'

function useElementInView(ref: { current: Element | null }) {
    const [inView, setInView] = useState(false)

    useEffect(() => {
        const element = ref.current
        if (!element || inView) return

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setInView(true)
                    observer.disconnect()
                }
            },
            { rootMargin: '0px 0px -50px 0px' },
        )

        observer.observe(element)

        return () => observer.disconnect()
    }, [ref, inView])

    return inView
}

function AnimatedNumber({ target, suffix }: { target: number; suffix: string }) {
    const [count, setCount] = useState(0)
    const ref = useRef<HTMLSpanElement>(null)
    const inView = useElementInView(ref)

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
                        <div
                            key={i}
                            className={styles.item}
                        >
                            <span className={styles.number}>
                                <AnimatedNumber target={stat.value} suffix={stat.suffix} />
                            </span>
                            <span className={styles.label}>{stat.label}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

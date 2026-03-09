import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import SEOHead from '@/components/layout/SEOHead'
import { faqData } from '@/data/navigation'
import styles from './FAQ.module.css'

function FAQItem({ question, answer, isOpen, onToggle }: {
    question: string; answer: string; isOpen: boolean; onToggle: () => void
}) {
    return (
        <div className={`${styles.item} ${isOpen ? styles.open : ''}`}>
            <button className={styles.question} onClick={onToggle} aria-expanded={isOpen}>
                <span>{question}</span>
                <svg className={styles.chevron} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6" /></svg>
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className={styles.answer}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                    >
                        <p>{answer}</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(0)

    const faqSchema = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqData.map(item => ({
            '@type': 'Question',
            name: item.question,
            acceptedAnswer: { '@type': 'Answer', text: item.answer },
        })),
    }

    return (
        <>
            <SEOHead
                title="Foire aux questions"
                description="Trouvez les réponses à vos questions sur le rachat de hangars, bâtiments industriels et locaux commerciaux par MB Aménageurs."
            />
            <Helmet>
                <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
            </Helmet>

            <section className={styles.hero}>
                <div className="container">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >Foire aux questions</motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                    >Tout ce que vous devez savoir avant de nous contacter.</motion.p>
                </div>
            </section>

            <section className={`section ${styles.content}`}>
                <div className="container">
                    <div className={styles.faqList}>
                        {faqData.map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 15 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: i * 0.06 }}
                            >
                                <FAQItem
                                    question={item.question}
                                    answer={item.answer}
                                    isOpen={openIndex === i}
                                    onToggle={() => setOpenIndex(openIndex === i ? null : i)}
                                />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    )
}

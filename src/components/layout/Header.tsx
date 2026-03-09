import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { navigation, companyInfo } from '@/data/navigation'
import styles from './Header.module.css'

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)
    const location = useLocation()

    useEffect(() => {
        setMenuOpen(false)
    }, [location.pathname])

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20)
        window.addEventListener('scroll', onScroll, { passive: true })
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    useEffect(() => {
        document.body.style.overflow = menuOpen ? 'hidden' : ''
        return () => { document.body.style.overflow = '' }
    }, [menuOpen])

    return (
        <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
            <div className="container">
                <div className={styles.inner}>
                    <Link to="/" className={styles.logo}>
                        <img src="/logo.png" alt="" width={36} height={36} />
                        <span className={styles.logoText}>{companyInfo.name}</span>
                    </Link>

                    <nav className={styles.desktopNav} aria-label="Navigation principale">
                        {navigation.map((item) => (
                            <Link
                                key={item.to}
                                to={item.to}
                                className={`${styles.navLink} ${location.pathname === item.to ? styles.active : ''}`}
                            >
                                {item.label}
                            </Link>
                        ))}
                        <Link to="/contact" className="btn btn-primary">
                            Estimation gratuite
                        </Link>
                    </nav>

                    <button
                        className={`${styles.menuBtn} ${menuOpen ? styles.menuOpen : ''}`}
                        onClick={() => setMenuOpen(!menuOpen)}
                        aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
                        aria-expanded={menuOpen}
                    >
                        <span /><span /><span />
                    </button>
                </div>
            </div>

            <AnimatePresence>
                {menuOpen && (
                    <motion.nav
                        className={styles.mobileNav}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25 }}
                        aria-label="Navigation mobile"
                    >
                        <div className="container">
                            {navigation.map((item) => (
                                <Link
                                    key={item.to}
                                    to={item.to}
                                    className={`${styles.mobileLink} ${location.pathname === item.to ? styles.active : ''}`}
                                >
                                    {item.label}
                                </Link>
                            ))}
                            <Link to="/contact" className={`btn btn-primary btn-full ${styles.mobileCta}`}>
                                Estimation gratuite
                            </Link>
                        </div>
                    </motion.nav>
                )}
            </AnimatePresence>
        </header>
    )
}

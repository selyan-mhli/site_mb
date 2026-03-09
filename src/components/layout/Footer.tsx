import { Link } from 'react-router-dom'
import { companyInfo, navigation } from '@/data/navigation'
import styles from './Footer.module.css'

export default function Footer() {
    const year = new Date().getFullYear()

    return (
        <footer className={styles.footer}>
            <div className="container">
                <div className={styles.grid}>
                    {/* Company info */}
                    <div className={styles.company}>
                        <Link to="/" className={styles.logo}>
                            <img
                                src="/logo-blanc.webp"
                                alt=""
                                width={32}
                                height={32}
                                loading="lazy"
                            />
                            <span>{companyInfo.name}</span>
                        </Link>
                        <p className={styles.desc}>
                            Spécialisés dans l'acquisition de hangars, bâtiments industriels et locaux
                            commerciaux dans le Vaucluse et les départements limitrophes.
                        </p>
                    </div>

                    {/* Links */}
                    <div className={styles.section}>
                        <h4>Navigation</h4>
                        <ul>
                            {navigation.map((item) => (
                                <li key={item.to}><Link to={item.to}>{item.label}</Link></li>
                            ))}
                            <li><Link to="/faq">FAQ</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className={styles.section}>
                        <h4>Contact</h4>
                        <div className={styles.contactList}>
                            <a href={companyInfo.phoneHref} className={styles.contactItem}>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                                {companyInfo.phone}
                            </a>
                            <a href={companyInfo.emailHref} className={styles.contactItem}>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
                                {companyInfo.email}
                            </a>
                            <a href={companyInfo.addressHref} target="_blank" rel="noopener noreferrer" className={styles.contactItem}>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
                                {companyInfo.address}
                            </a>
                        </div>
                    </div>
                </div>

                <div className={styles.bottom}>
                    <p>&copy; {year} {companyInfo.name}. Tous droits réservés.</p>
                    <div className={styles.legal}>
                        <Link to="/mentions-legales">Mentions légales</Link>
                        <Link to="/politique-confidentialite">Politique de confidentialité</Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}

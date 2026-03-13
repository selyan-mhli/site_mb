import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion } from 'framer-motion'
import SEOHead from '@/components/layout/SEOHead'
import { companyInfo } from '@/data/navigation'
import styles from './Contact.module.css'

const schema = z.object({
    firstName: z.string().min(2, 'Le prénom doit contenir au moins 2 caractères'),
    lastName: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
    email: z.string().email('Adresse email invalide'),
    phone: z.string().regex(/^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.\-]*\d{2}){4}$/, 'Numéro de téléphone invalide'),
    propertyType: z.string().min(1, 'Veuillez sélectionner un type de bien'),
    location: z.string().min(1, 'Veuillez indiquer la localisation'),
    surface: z.string().optional(),
    message: z.string().optional(),
    rgpd: z.literal(true, { errorMap: () => ({ message: 'Vous devez accepter la politique de confidentialité' }) }),
})

type FormData = z.infer<typeof schema>

export default function Contact() {
    const [submitting, setSubmitting] = useState(false)
    const [submitError, setSubmitError] = useState('')
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(schema),
        defaultValues: {
            propertyType: searchParams.get('type') || '',
        },
    })

    const onSubmit = async (data: FormData) => {
        setSubmitting(true)
        setSubmitError('')

        try {
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    access_key: import.meta.env.VITE_WEB3FORMS_KEY,
                    subject: `Nouveau lead — ${data.propertyType} à ${data.location}${data.surface ? ` (${data.surface} m²)` : ''}`,
                    from_name: `${data.firstName} ${data.lastName}`,
                    ...data,
                }),
            })

            if (response.ok) {
                navigate('/merci')
            } else {
                setSubmitError('Une erreur est survenue. Veuillez réessayer.')
            }
        } catch {
            setSubmitError('Erreur de connexion. Vérifiez votre réseau.')
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <>
            <SEOHead
                title="Contact"
                description="Contactez MB Aménageurs pour vendre votre hangar, bâtiment industriel ou local commercial. Estimation gratuite, réponse sous 48h."
                breadcrumbs={[
                    { name: 'Accueil', url: 'https://mb-amenageurs.fr/' },
                    { name: 'Contact', url: 'https://mb-amenageurs.fr/contact' },
                ]}
            />

            <section className={styles.hero}>
                <div className="container">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        Contactez-nous
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        Estimation gratuite et sans engagement. Réponse garantie sous 48h.
                    </motion.p>
                </div>
            </section>

            <section className={`section ${styles.contact}`}>
                <div className="container">
                    <div className={styles.layout}>
                        {/* Form */}
                        <motion.div
                            className={styles.formCard}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.15 }}
                        >
                            <h2>Décrivez votre bien</h2>
                            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                                <input type="checkbox" className="sr-only" tabIndex={-1} autoComplete="off" {...register('rgpd' as any, { setValueAs: () => undefined })} style={{ display: 'none' }} name="botcheck" />

                                <div className={styles.row}>
                                    <div className="form-group">
                                        <label className="form-label" htmlFor="firstName">Prénom *</label>
                                        <input id="firstName" className="form-input" {...register('firstName')} placeholder="Votre prénom" aria-invalid={!!errors.firstName} aria-describedby={errors.firstName ? 'firstName-error' : undefined} />
                                        {errors.firstName && <span id="firstName-error" className="form-error" role="alert">{errors.firstName.message}</span>}
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label" htmlFor="lastName">Nom *</label>
                                        <input id="lastName" className="form-input" {...register('lastName')} placeholder="Votre nom" aria-invalid={!!errors.lastName} aria-describedby={errors.lastName ? 'lastName-error' : undefined} />
                                        {errors.lastName && <span id="lastName-error" className="form-error" role="alert">{errors.lastName.message}</span>}
                                    </div>
                                </div>

                                <div className={styles.row}>
                                    <div className="form-group">
                                        <label className="form-label" htmlFor="email">Email *</label>
                                        <input id="email" type="email" className="form-input" {...register('email')} placeholder="votre@email.fr" aria-invalid={!!errors.email} aria-describedby={errors.email ? 'email-error' : undefined} />
                                        {errors.email && <span id="email-error" className="form-error" role="alert">{errors.email.message}</span>}
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label" htmlFor="phone">Téléphone *</label>
                                        <input id="phone" type="tel" className="form-input" {...register('phone')} placeholder="06 12 34 56 78" aria-invalid={!!errors.phone} aria-describedby={errors.phone ? 'phone-error' : undefined} />
                                        {errors.phone && <span id="phone-error" className="form-error" role="alert">{errors.phone.message}</span>}
                                    </div>
                                </div>

                                <div className={styles.row}>
                                    <div className="form-group">
                                        <label className="form-label" htmlFor="propertyType">Type de bien *</label>
                                        <select id="propertyType" className="form-input" {...register('propertyType')} aria-invalid={!!errors.propertyType} aria-describedby={errors.propertyType ? 'propertyType-error' : undefined}>
                                            <option value="">Sélectionnez...</option>
                                            <option value="hangar">Hangar</option>
                                            <option value="batiment-industriel">Bâtiment industriel</option>
                                            <option value="local-commercial">Local commercial</option>
                                            <option value="entrepot">Entrepôt</option>
                                            <option value="atelier">Atelier</option>
                                            <option value="autre">Autre</option>
                                        </select>
                                        {errors.propertyType && <span id="propertyType-error" className="form-error" role="alert">{errors.propertyType.message}</span>}
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label" htmlFor="location">Localisation *</label>
                                        <input id="location" className="form-input" {...register('location')} placeholder="Ville ou département" aria-invalid={!!errors.location} aria-describedby={errors.location ? 'location-error' : undefined} />
                                        {errors.location && <span id="location-error" className="form-error" role="alert">{errors.location.message}</span>}
                                    </div>
                                </div>

                                <div className={styles.row}>
                                    <div className="form-group">
                                        <label className="form-label" htmlFor="surface">Surface approximative (m²)</label>
                                        <input id="surface" type="number" min="0" className="form-input" {...register('surface')} placeholder="Ex : 500" />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="form-label" htmlFor="message">Description du bien</label>
                                    <textarea id="message" className="form-input" rows={4} {...register('message')} placeholder="Surface, état, accès, particularités..." />
                                </div>

                                <div className={styles.rgpd}>
                                    <label className={styles.checkbox}>
                                        <input type="checkbox" {...register('rgpd')} />
                                        <span>J'accepte que mes données soient traitées par MB Aménageurs pour répondre à ma demande. <a href="/politique-confidentialite" target="_blank">En savoir plus</a></span>
                                    </label>
                                    {errors.rgpd && <span className="form-error">{errors.rgpd.message}</span>}
                                </div>

                                {submitError && (
                                    <div className={styles.errorBanner}>{submitError}</div>
                                )}

                                <button type="submit" className="btn btn-primary btn-lg btn-full" disabled={submitting}>
                                    {submitting ? (
                                        <>
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={styles.spinner}>
                                                <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                                            </svg>
                                            Envoi en cours...
                                        </>
                                    ) : (
                                        <>
                                            Envoyer ma demande
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M5 12h14M12 5l7 7-7 7" />
                                            </svg>
                                        </>
                                    )}
                                </button>
                            </form>
                        </motion.div>

                        {/* Sidebar */}
                        <motion.aside
                            className={styles.sidebar}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.25 }}
                        >
                            <div className={styles.sidebarCard}>
                                <div className={styles.badge48h}>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><polyline points="12,6 12,12 16,14" /></svg>
                                    <div>
                                        <strong>Réponse sous 48h</strong>
                                        <p>Chaque demande fait l'objet d'une étude personnalisée</p>
                                    </div>
                                </div>
                            </div>

                            <div className={styles.sidebarCard}>
                                <h3>Coordonnées</h3>
                                <div className={styles.contactList}>
                                    <a href={companyInfo.phoneHref}>
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                                        {companyInfo.phone}
                                    </a>
                                    <a href={companyInfo.emailHref}>
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
                                        {companyInfo.email}
                                    </a>
                                    <a href={companyInfo.addressHref} target="_blank" rel="noopener noreferrer">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
                                        {companyInfo.address}
                                    </a>
                                </div>
                            </div>

                            <div className={styles.sidebarCard}>
                                <h3>Zone d'intervention</h3>
                                <ul className={styles.zoneList}>
                                    {companyInfo.zone.map((z, i) => (
                                        <li key={i}>
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12" /></svg>
                                            {z}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </motion.aside>
                    </div>
                </div>
            </section>
        </>
    )
}

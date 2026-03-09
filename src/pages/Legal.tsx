import SEOHead from '@/components/layout/SEOHead'
import styles from './Legal.module.css'

export default function Legal() {
    return (
        <>
            <SEOHead title="Mentions légales" description="Mentions légales du site MB Aménageurs." />

            <section className={styles.hero}>
                <div className="container">
                    <h1>Mentions légales</h1>
                </div>
            </section>

            <section className={`section ${styles.content}`}>
                <div className="container">
                    <div className={styles.prose}>
                        <h2>Éditeur du site</h2>
                        <p>
                            <strong>MB Aménageurs</strong><br />
                            541 Av. Frederic Mistral<br />
                            84200 Carpentras, France<br />
                            Téléphone : 06 48 06 97 89<br />
                            Email : contact@mb-amenageurs.fr
                        </p>

                        <h2>Hébergement</h2>
                        <p>
                            Ce site est hébergé par Vercel Inc.<br />
                            340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis
                        </p>

                        <h2>Propriété intellectuelle</h2>
                        <p>
                            L'ensemble du contenu de ce site (textes, images, logos, icônes) est la propriété
                            exclusive de MB Aménageurs ou de ses partenaires et est protégé par les lois
                            relatives à la propriété intellectuelle.
                        </p>

                        <h2>Responsabilité</h2>
                        <p>
                            MB Aménageurs met tout en œuvre pour fournir des informations fiables et actualisées.
                            Toutefois, des erreurs ou omissions peuvent survenir. L'utilisateur est invité à
                            vérifier l'exactitude des informations et à signaler toute erreur.
                        </p>

                        <h2>Litiges</h2>
                        <p>
                            Les présentes conditions sont régies par le droit français. En cas de litige,
                            les tribunaux compétents seront ceux du ressort du siège social de MB Aménageurs.
                        </p>
                    </div>
                </div>
            </section>
        </>
    )
}

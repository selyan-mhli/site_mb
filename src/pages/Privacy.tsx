import SEOHead from '@/components/layout/SEOHead'
import styles from './Legal.module.css'

export default function Privacy() {
    return (
        <>
            <SEOHead title="Politique de confidentialité" description="Politique de confidentialité et protection des données personnelles de MB Aménageurs." />

            <section className={styles.hero}>
                <div className="container">
                    <h1>Politique de confidentialité</h1>
                </div>
            </section>

            <section className={`section ${styles.content}`}>
                <div className="container">
                    <div className={styles.prose}>
                        <h2>Collecte des données</h2>
                        <p>
                            Les données personnelles collectées via le formulaire de contact (nom, prénom,
                            email, téléphone, description du bien) sont exclusivement utilisées pour répondre
                            à votre demande et ne sont jamais transmises à des tiers.
                        </p>

                        <h2>Finalité du traitement</h2>
                        <p>
                            Vos données sont traitées dans le cadre de la prise de contact et l'évaluation
                            de votre bien immobilier. Le responsable du traitement est MB Aménageurs.
                        </p>

                        <h2>Durée de conservation</h2>
                        <p>
                            Vos données sont conservées pendant une durée maximale de 3 ans à compter
                            du dernier contact, conformément aux recommandations de la CNIL.
                        </p>

                        <h2>Vos droits</h2>
                        <p>
                            Conformément au RGPD, vous disposez d'un droit d'accès, de rectification,
                            de suppression et de portabilité de vos données. Pour exercer ces droits,
                            contactez-nous à : contact@mb-amenageurs.fr
                        </p>

                        <h2>Cookies</h2>
                        <p>
                            Ce site n'utilise aucun cookie de suivi ou publicitaire. Seuls des cookies
                            techniques strictement nécessaires au fonctionnement du site sont utilisés.
                        </p>
                    </div>
                </div>
            </section>
        </>
    )
}

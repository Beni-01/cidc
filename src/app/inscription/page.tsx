import PageHero from "@/features/shared/components/PageHero/PageHero";
import RegistrationForm from "@/features/inscription/sections/RegistrationForm/RegistrationForm";
import NewsletterBox from "@/features/shared/components/NewsletterBox/NewsletterBox";
import styles from "./page.module.scss";

export default function InscriptionPage() {
  return (
    <div className={styles.page}>
      <PageHero
        title={<>Rejoignez le colloque<br />et faites entendre <span style={{ color: '#C5A059' }}>votre voix.</span></>}
        tagline="INSCRIPTION"
        description="Remplissez le formulaire ci-dessous pour vous inscrire. Un email de confirmation vous sera envoyé avec tous les détails pratiques."
        image="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80"
      />
      
      <RegistrationForm />
      
      <section className={styles.newsletterSection}>
        <div className="container">
          <NewsletterBox />
        </div>
      </section>
    </div>
  );
}

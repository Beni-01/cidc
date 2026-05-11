import PageHero from "@/features/shared/components/PageHero/PageHero";
import ContactForm from "@/features/contact/sections/ContactForm/ContactForm";
import NewsletterBox from "@/features/shared/components/NewsletterBox/NewsletterBox";
import styles from "./page.module.scss";

export default function ContactPage() {
  return (
    <div className={styles.page}>
      <PageHero
        title={<>Nous sommes<br />à votre écoute.</>}
        tagline="CONTACTEZ-NOUS"
        description="Pour toute question ou information complémentaire, n'hésitez pas à nous écrire ou à nous appeler. Notre équipe vous répondra avec plaisir."
        image="https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&q=80"
      />
      
      <ContactForm />
      
      <section className={styles.newsletterSection}>
        <div className="container">
          <NewsletterBox />
        </div>
      </section>
    </div>
  );
}

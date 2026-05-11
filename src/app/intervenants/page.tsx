import PageHero from "@/features/shared/components/PageHero/PageHero";
import Stats from "@/features/home/sections/Stats/Stats";
import SpeakersGrid from "@/features/intervenants/sections/SpeakersGrid/SpeakersGrid";
import InfoCards from "@/features/shared/components/InfoCards/InfoCards";
import NewsletterBox from "@/features/shared/components/NewsletterBox/NewsletterBox";
import styles from "./page.module.scss";

export default function IntervenantsPage() {
  return (
    <div className={styles.page}>
      <PageHero
        title={<>Des voix d&apos;excellence,<br />des perspectives d&apos;avenir</>}
        tagline="NOS INTERVENANTS"
        description="Rencontrez les experts et universitaires qui animeront les débats et partageront leurs recherches lors de cette édition exceptionnelle."
        image="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80"
      />
      <Stats />
      <SpeakersGrid />
      <InfoCards />
      
      <section className={styles.newsletterSection}>
        <div className="container">
          <NewsletterBox />
        </div>
      </section>
    </div>
  );
}

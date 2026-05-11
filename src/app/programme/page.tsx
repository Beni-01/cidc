import PageHero from "@/features/shared/components/PageHero/PageHero";
import Timeline from "@/features/programme/sections/Timeline/Timeline";
import AxesQuote from "@/features/programme/sections/AxesQuote/AxesQuote";
import DownloadBar from "@/features/programme/sections/DownloadBar/DownloadBar";
import InfoCards from "@/features/shared/components/InfoCards/InfoCards";
import NewsletterBox from "@/features/shared/components/NewsletterBox/NewsletterBox";
import styles from "./page.module.scss";

export default function ProgrammePage() {
  return (
    <div className={styles.page}>
      <PageHero
        title={<>Programme</>}
        tagline="CALENDRIER"
        description="Découvrez le déroulement du colloque et ne manquez aucune session. Trois jours d'échanges, de réflexions et de dialogues."
        image="/images/hero-gavel.webp"
      />
      
      <div className={styles.dateSelector}>
        <div className="container">
          <div className={styles.tabs}>
            <button className={`${styles.tab} ${styles.active}`}>
              <span>MER. 22 OCT.</span>
              <strong>Jour 1</strong>
            </button>
            <button className={styles.tab}>
              <span>JEU. 23 OCT.</span>
              <strong>Jour 2</strong>
            </button>
            <button className={styles.tab}>
              <span>VEN. 24 OCT.</span>
              <strong>Jour 3</strong>
            </button>
          </div>
        </div>
      </div>

      <Timeline />
      <AxesQuote />
      <DownloadBar />
      <InfoCards />
      
      <section className={styles.newsletterSection}>
        <div className="container">
          <NewsletterBox />
        </div>
      </section>
    </div>
  );
}

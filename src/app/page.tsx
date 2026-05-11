import Hero from "@/features/home/sections/Hero/Hero";
import EventDetails from "@/features/home/sections/EventDetails/EventDetails";
import About from "@/features/home/sections/About/About";
import Stats from "@/features/home/sections/Stats/Stats";
import SpeakersPreview from "@/features/home/sections/SpeakersPreview/SpeakersPreview";
import InfoCards from "@/features/shared/components/InfoCards/InfoCards";
import NewsletterBox from "@/features/shared/components/NewsletterBox/NewsletterBox";
import styles from "./page.module.scss";

export default function Home() {
  return (
    <div className={styles.home}>
      <Hero />
      <EventDetails />
      <About />
      <Stats />
      <SpeakersPreview />
      <InfoCards />

      <section className={styles.newsletterSection}>
        <div className="container">
          <NewsletterBox />
        </div>
      </section>
    </div>
  );
}

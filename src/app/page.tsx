import Hero from "@/features/home/sections/Hero/Hero";
import Countdown from "@/features/home/sections/Countdown/Countdown";
import About from "@/features/home/sections/About/About";
import Stats from "@/features/home/sections/Stats/Stats";
import SpeakersPreview from "@/features/home/sections/SpeakersPreview/SpeakersPreview";
import Partners from "@/features/home/sections/Partners/Partners";
import RegistrationCTA from "@/features/home/sections/RegistrationCTA/RegistrationCTA";
import AnimatedSection from "@/features/shared/components/AnimatedSection/AnimatedSection";
import NewsletterBox from "@/features/shared/components/NewsletterBox/NewsletterBox";
import styles from "./page.module.scss";

export default function Home() {
  return (
    <div className={styles.home}>
      <Hero />
      <Stats />
      <Countdown />
      <About />
      <SpeakersPreview />
      <Partners />
      <RegistrationCTA />

      <section className={styles.newsletterSection}>
        <div className="container">
          <AnimatedSection animation="softZoom" rootMargin="0px 0px -20px 0px">
            <NewsletterBox />
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}

import Image from "next/image";
import Link from "next/link";
import Countdown from "@/features/home/sections/Countdown/Countdown";
import { speakersData } from "@/features/intervenants/sections/SpeakersGrid/speakers.data";
import AnimatedSection from "@/features/shared/components/AnimatedSection/AnimatedSection";
import CountUpNumber from "@/features/shared/components/CountUpNumber";
import styles from "./page.module.scss";

const allSpeakers = speakersData;

const countryFlags: Record<string, string> = {
  CM: "🇨🇲",
  CI: "🇨🇮",
  SN: "🇸🇳",
  CD: "🇨🇩",
  ML: "🇲🇱",
  MA: "🇲🇦",
  NG: "🇳🇬",
  DZ: "🇩🇿",
};

const stats = [
  { value: 1, label: "JOUR", padStart: 2 },
  { value: 24, label: "SESSIONS" },
  { value: 60, label: "INTERVENANTS", suffix: "+" },
  { value: 500, label: "PARTICIPANTS", suffix: "+" },
];

export default function IntervenantsPage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroTexture} />
        <div className={styles.heroContent}>
          <span className={styles.edition}>ÉDITION 2026</span>
          <span className={styles.goldLine} />
          <h1 className={styles.heroTitle}>
            Penser la<br />
            Constitution.<br />
            Bâtir <span>l&apos;avenir.</span>
          </h1>
          <p className={styles.heroText}>
            Un rendez-vous international pour réfléchir, échanger et renforcer la culture constitutionnelle face aux défis contemporains.
          </p>
          <Link href="/about" className={styles.heroButton}>
            DÉCOUVRIR LE COLLOQUE <span>→</span>
          </Link>
        </div>

        <div className={styles.heroVisual}>
          <div className={styles.dots} />
          <Image
            src="/images/hero-gavel.webp"
            alt="Constitution et palais de justice"
            fill
            priority
            sizes="(max-width: 900px) 100vw, 52vw"
            className={styles.heroImage}
          />
        </div>
      </section>

      <section className={styles.detailsWrap} aria-label="Informations clés">
        <AnimatedSection animation="softZoom" rootMargin="0px 0px -20px 0px">
          <div className={styles.detailsCard}>
          <div className={styles.place}>
            <div className={styles.calendarIcon}>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <rect x="3" y="4" width="18" height="18" rx="2" />
                <path d="M16 2v4M8 2v4M3 10h18M8 14h.01M12 14h.01M16 14h.01" />
              </svg>
            </div>
            <div>
              <strong>KINSHASA, RDC</strong>
              <span>22 OCTOBRE 2026</span>
            </div>
          </div>
          <div className={styles.stats}>
            {stats.map((item) => (
              <div className={styles.stat} key={item.label}>
                <strong>
                  <CountUpNumber
                    target={item.value}
                    suffix={item.suffix}
                    padStart={item.padStart}
                  />
                </strong>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
          </div>
        </AnimatedSection>
      </section>

      <AnimatedSection animation="fadeInUp" className={styles.countdownReveal}>
        <Countdown />
      </AnimatedSection>

      <section className={styles.speakers}>
        <div className={styles.container}>
          <AnimatedSection animation="fadeInUp" className={styles.sectionHeader}>
            <span>NOS INTERVENANTS</span>
            <h2>Des voix d&apos;excellence, des perspectives d&apos;avenir</h2>
            <i />
          </AnimatedSection>

          <div className={styles.speakerGrid}>
            {allSpeakers.map((speaker, index) => (
              <AnimatedSection
                key={speaker.id}
                animation="fadeInUp"
                delay={index * 0.07}
                className={styles.revealItem}
              >
                <article className={styles.speakerCard}>
                  <div className={styles.medallion}>
                    <div className={styles.medallionRing} />
                    <div className={styles.speakerGlow} />
                    <div className={styles.speakerPhoto}>
                      <Image
                        src={speaker.image}
                        alt={speaker.name}
                        fill
                        sizes="(max-width: 700px) 50vw, 170px"
                        className={styles.speakerImage}
                      />
                    </div>
                  </div>
                  <h3>{speaker.name}</h3>
                  <p>{speaker.role}</p>
                  <div className={styles.country}>
                    <span>{countryFlags[speaker.countryCode] ?? "🏳️"}</span>
                    {speaker.country}
                  </div>
                </article>
              </AnimatedSection>
            ))}
          </div>

        </div>
      </section>

      <section className={styles.registrationCall}>
        <div className={styles.container}>
          <AnimatedSection animation="softZoom">
            <div className={styles.registrationBox}>
              <span>INSCRIPTION</span>
              <h2>Participez au colloque international</h2>
              <p>
                Rejoignez les intervenants, chercheurs et praticiens réunis pour débattre des grands enjeux constitutionnels contemporains.
              </p>
              <div className={styles.registrationActions}>
                <Link href="/inscription" className={styles.primaryCta}>
                  S&apos;INSCRIRE AU COLLOQUE <span>→</span>
                </Link>
                <Link href="/programme" className={styles.secondaryCta}>
                  VOIR LE PROGRAMME
                </Link>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </main>
  );
}

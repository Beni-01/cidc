import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/features/shared/constants/site.config";
import styles from "./Footer.module.scss";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.brand}>
            <Image 
              src="/logos/logo.png" 
              alt="Logo CIDC" 
              width={220} 
              height={50} 
              className={styles.footerLogo}
            />
            <p className={styles.description}>
              Un espace de dialogue et de coopération pour des constitutions au service de la liberté, de la justice et de la démocratie.
            </p>
            <div className={styles.socials}>
              {Object.entries(siteConfig.social).map(([platform, url]) => (
                <a key={platform} href={url} className={styles.socialLink} title={platform}>
                  <span className={styles.socialIcon}>{platform.substring(0, 1)}</span>
                </a>
              ))}
            </div>
          </div>

          <div className={styles.links}>
            <h4 className={styles.title}>LIENS RAPIDES</h4>
            <div className={styles.linksGrid}>
              <Link href="/">Accueil</Link>
              <Link href="/about">À propos</Link>
              <Link href="/programme">Programme</Link>
              <Link href="/intervenants">Intervenants</Link>
              <Link href="/ressources">Ressources</Link>
              <Link href="/actualites">Actualités</Link>
              <Link href="/contact">Contact</Link>
            </div>
          </div>

          <div className={styles.contact}>
            <h4 className={styles.title}>NOUS CONTACTER</h4>
            <ul className={styles.contactList}>
              <li>
                <span className={styles.icon}>✉</span>
                <a href={`mailto:${siteConfig.contact.email}`}>{siteConfig.contact.email}</a>
              </li>
              <li>
                <span className={styles.icon}>📞</span>
                <a href={`tel:${siteConfig.contact.phone}`}>{siteConfig.contact.phone}</a>
              </li>
              <li>
                <span className={styles.icon}>📍</span>
                <span>{siteConfig.contact.address}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className={styles.bottom}>
          <p>© {currentYear} {siteConfig.name}. Tous droits réservés.</p>
          <div className={styles.legal}>
            <Link href="/mentions-legales">Mentions légales</Link>
            <span className={styles.separator}>|</span>
            <Link href="/confidentialite">Politique de confidentialité</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { siteConfig } from "@/features/shared/constants/site.config";
import styles from "./Footer.module.scss";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [isMampOpen, setIsMampOpen] = useState(false);

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.brand}>
            <div className={styles.logoArea}>
              <div className={styles.templeIcon}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21h18M3 10h18M5 10v11M19 10v11M9 10v11M15 10v11M2 10l10-8 10 8" /></svg>
              </div>
              <div className={styles.logoText}>
                <h3>COLLOQUE INTERNATIONAL</h3>
                <p>DE DROIT CONSTITUTIONNEL</p>
              </div>
            </div>
            <p className={styles.description}>
              Un espace de dialogue et de coopération pour des constitutions au service de la liberté, de la justice et de la démocratie.
            </p>
            <div className={styles.socials}>
              <a href="#" className={styles.socialLink} title="LinkedIn">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg>
              </a>
              <a href="#" className={styles.socialLink} title="Facebook">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
              </a>
              <a href="#" className={styles.socialLink} title="X">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4l11.733 16h4.267l-11.733 -16z" /><path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" /></svg>
              </a>
              <a href="#" className={styles.socialLink} title="YouTube">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 2-2h15a2 2 0 0 1 2 2 24.12 24.12 0 0 1 0 10 2 2 0 0 1-2 2h-15a2 2 0 0 1-2-2Z" /><path d="m10 15 5-3-5-3z" /></svg>
              </a>
            </div>
          </div>

          <div className={styles.links}>
            <h4 className={styles.title}>LIENS RAPIDES</h4>
            <ul className={styles.linksList}>
              <li><Link href="/">Accueil</Link></li>
              <li><Link href="/about">À propos</Link></li>
              <li><Link href="/programme">Programme</Link></li>
              <li><Link href="/intervenants">Intervenants</Link></li>
              <li><Link href="/ressources">Ressources</Link></li>
              <li><Link href="/actualites">Actualités</Link></li>
              <li><Link href="/contact">Contact</Link></li>
              <li><Link href="/admin">Admin</Link></li>
            </ul>
          </div>

          <div className={styles.contact}>
            <h4 className={styles.title}>NOUS CONTACTER</h4>
            <ul className={styles.contactList}>
              <li>
                <div className={styles.icon}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
                </div>
                <a href={`mailto:${siteConfig.contact.email}`}>{siteConfig.contact.email}</a>
              </li>
              <li>
                <div className={styles.icon}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                </div>
                <a href={`tel:${siteConfig.contact.phone}`}>{siteConfig.contact.phone}</a>
              </li>
              <li>
                <div className={styles.icon}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>
                </div>
                <span>{siteConfig.contact.address}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className={styles.bottom}>
          <div className={styles.copyright}>
            <p>© {currentYear} Colloque International de Droit Constitutionnel. Tous droits réservés.</p>
            <button className={styles.mampCredit} type="button" onClick={() => setIsMampOpen(true)}>
              Developed with love by <strong>MampCode</strong>
            </button>
          </div>
          <div className={styles.legal}>
            <Link href="/mentions-legales">Mentions légales</Link>
            <span className={styles.separator}>|</span>
            <Link href="/confidentialite">Politique de confidentialité</Link>
          </div>
        </div>
      </div>

      {isMampOpen && (
        <div className={styles.modalOverlay} role="dialog" aria-modal="true" aria-label="MampCode">
          <div className={styles.modalCard}>
            <button className={styles.closeModal} type="button" onClick={() => setIsMampOpen(false)} aria-label="Fermer">
              ×
            </button>
            <div className={styles.mampLogo}>
              <Image src="/logos/mampcode.png" alt="MampCode" fill sizes="(max-width: 700px) 82vw, 520px" />
            </div>
            <span className={styles.modalEyebrow}>Votre partenaire en solution digitale</span>
            <h3>Vous voulez aussi collaborer avec nous sur votre projet ?</h3>
            <p>
              N&apos;hésitez pas, prenons contact. MampCode vous accompagne dans la conception de sites, plateformes et expériences digitales modernes.
            </p>
            <a className={styles.callButton} href="tel:0852857071">Appeler 0852857071</a>
          </div>
        </div>
      )}
    </footer>
  );
}

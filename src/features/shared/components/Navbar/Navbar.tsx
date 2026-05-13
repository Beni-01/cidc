"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { navigationLinks } from "@/features/shared/constants/navigation";
import Button from "../Button";
import styles from "./Navbar.module.scss";

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          <div className={styles.templeIcon}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21h18M3 10h18M5 10v11M19 10v11M9 10v11M15 10v11M2 10l10-8 10 8" /></svg>
          </div>
          <div className={styles.logoText}>
            <h3>COLLOQUE INTERNATIONAL</h3>
            <p>DE DROIT CONSTITUTIONNEL</p>
          </div>
        </Link>

        <div className={styles.menu}>
          {navigationLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`${styles.link} ${pathname === link.href ? styles.active : ""}`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className={styles.actions}>
          <Button variant="dark" href="/inscription" className={styles.registerBtn}>
            S&apos;INSCRIRE
          </Button>
          <button
            className={`${styles.menuToggle} ${isOpen ? styles.open : ""}`}
            type="button"
            aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={isOpen}
            aria-controls="mobile-navigation"
            onClick={() => setIsOpen((current) => !current)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      <button
        className={`${styles.backdrop} ${isOpen ? styles.show : ""}`}
        type="button"
        aria-label="Fermer le menu"
        onClick={() => setIsOpen(false)}
      />
      <div id="mobile-navigation" className={`${styles.mobileMenu} ${isOpen ? styles.show : ""}`}>
        <span className={styles.mobileEyebrow}>Navigation</span>
        {navigationLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`${styles.mobileLink} ${pathname === link.href ? styles.active : ""}`}
            onClick={() => setIsOpen(false)}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}

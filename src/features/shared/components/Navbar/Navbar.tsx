"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigationLinks } from "@/features/shared/constants/navigation";
import { siteConfig } from "@/features/shared/constants/site.config";
import styles from "./Navbar.module.scss";

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}>
      <nav className={styles.nav}>
        <Link href="/" className={styles.logo}>
          <span className={styles.logoIcon}>⚖</span>
          <div className={styles.logoText}>
            <span className={styles.logoTitle}>{siteConfig.shortName}</span>
            <span className={styles.logoSubtitle}>Droit Constitutionnel</span>
          </div>
        </Link>

        <ul className={`${styles.links} ${isOpen ? styles.open : ""}`}>
          {navigationLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`${styles.link} ${
                  pathname === link.href ? styles.active : ""
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li className={styles.ctaMobile}>
            <Link href="/inscription" className={styles.ctaButton}>
              S&apos;inscrire
            </Link>
          </li>
        </ul>

        <Link href="/inscription" className={styles.ctaDesktop}>
          S&apos;inscrire
        </Link>

        <button
          className={`${styles.burger} ${isOpen ? styles.burgerOpen : ""}`}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Menu de navigation"
          aria-expanded={isOpen}
        >
          <span />
          <span />
          <span />
        </button>
      </nav>
    </header>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { navigationLinks } from "@/features/shared/constants/navigation";
import Button from "../Button";
import styles from "./Navbar.module.scss";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          <Image 
            src="/logos/logo.png" 
            alt="CIDC Logo" 
            width={300} 
            height={80} 
            priority
            className={styles.logoImg}
          />
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
        </div>
      </div>
    </nav>
  );
}

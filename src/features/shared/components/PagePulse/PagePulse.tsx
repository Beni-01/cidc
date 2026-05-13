"use client";

import { usePathname } from "next/navigation";
import styles from "./PagePulse.module.scss";

export default function PagePulse() {
  const pathname = usePathname();

  return (
    <div key={pathname} className={styles.overlay} aria-hidden="true">
      <div className={styles.portal}>
        <span className={styles.ring} />
        <span className={styles.ring} />
        <span className={styles.ring} />
        <span className={styles.core} />
      </div>
      <span className={styles.scan} />
    </div>
  );
}

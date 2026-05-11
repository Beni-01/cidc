import styles from "./Stats.module.scss";

const statsData = [
  { value: "40+", label: "Pays représentés", icon: "🌍" },
  { value: "60+", label: "Conférences & panels", icon: "🎙" },
  { value: "2000+", label: "Participants", icon: "🎓" },
  { value: "50+", label: "Publications", icon: "📄" },
  { value: "Institutionnels", label: "Partenaires", icon: "🏛" },
];

export default function Stats() {
  return (
    <section className={styles.stats}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {statsData.map((stat, index) => (
            <div key={index} className={styles.statItem}>
              <div className={styles.icon}>{stat.icon}</div>
              <div className={styles.content}>
                <span className={styles.value}>{stat.value}</span>
                <span className={styles.label}>{stat.label}</span>
              </div>
              {index < statsData.length - 1 && <div className={styles.divider} />}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

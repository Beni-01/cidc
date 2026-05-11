import { programmeData } from "./programme.data";
import styles from "./Timeline.module.scss";

export default function Timeline() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.timeline}>
          <div className={styles.line} />
          
          {programmeData.map((item, index) => (
            <div key={item.id} className={`${styles.item} ${index % 2 === 0 ? styles.left : styles.right}`}>
              <div className={styles.timeTag}>{item.time.split(' – ')[0]}</div>
              
              <div className={`${styles.card} ${styles[item.type]}`}>
                <div className={styles.cardHeader}>
                  <span className={styles.typeTag}>{item.type.replace('-', ' ')}</span>
                  <span className={styles.timeRange}>{item.time}</span>
                </div>
                
                <h3 className={styles.cardTitle}>{item.title}</h3>
                
                {item.description && <p className={styles.cardDesc}>{item.description}</p>}
                
                {item.speakers && (
                  <div className={styles.speakers}>
                    <p className={styles.label}>Intervenants :</p>
                    <div className={styles.speakerList}>
                      {item.speakers.map((s, i) => (
                        <span key={i} className={styles.speaker}>{s}</span>
                      ))}
                    </div>
                  </div>
                )}
                
                {item.location && (
                  <div className={styles.location}>
                    <span className={styles.icon}>📍</span> {item.location}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

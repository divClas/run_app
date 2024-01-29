import styles from "./About.module.css";

function About() {
  return (
    <div>
      <div className={styles.about_body}>
        <div className={styles.about_wrapper}>
          <div className={styles.text_about}>
            <h1>О нашем забеге</h1>
            <p>
              "ЗА БЕГ" - это ежегодный марафон, организованный с целью поддержки
              здорового образа жизни и пропаганды спорта среди местного
              населения.
            </p>
            <p>
              Мы приглашаем всех желающих принять участие в этом захватывающем
              событии, независимо от возраста и уровня физической подготовки.
            </p>
            <p>
              На нашем марафоне вы сможете насладиться красивыми пейзажами и
              дружественной атмосферой. Присоединяйтесь к нам и станьте частью
              этого незабываемого события!
            </p>
            <h1>Дата Следующего забега</h1>
            <div className={styles.date}>
              <p>12.02.2024</p>
            </div>
          </div>
          <img
            src="https://static.irk.ru/media/img/site/gallery/30517/7dcad987-d67d-47be-90f5-61855f5a8fa3_jpg_800x600_x-False_q85.jpg"
            alt="Забег"
          />
        </div>
      </div>
    </div>
  );
}
export default About;

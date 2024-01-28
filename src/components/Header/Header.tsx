import { Link } from "react-router-dom";
import styles from "./Header.module.css";

const Header = () => {
  return (
    <header className={styles.header}>
      <nav className={styles.navbar}>
        <ul className={styles.navbar_body}>
          <li className={styles.link_header}>
            <Link to="/">О забеге</Link>
          </li>
          <li className={styles.link_header}>
            <Link to="/participants">Участники</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;

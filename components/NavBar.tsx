import Link from 'next/link';
import styles from './NavBar.module.css';

const NavBar = () => (
  <nav className={styles.nav}>
    <ul className={styles.navList}>
      <li><Link href="/">Home</Link></li>
      <li><Link href="/agent-factory">Agent Factory</Link></li>
    </ul>
  </nav>
);

export default NavBar; 
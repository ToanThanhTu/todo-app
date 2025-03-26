import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <h1 className={styles.h1}>Todo App</h1>
      <p>Weather</p>
    </header>
  )
}
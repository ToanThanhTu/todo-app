import styles from "./Header.module.css"

export default function Header() {
  const date = new Date()
  const day = date.getDate()
  const month = date.getMonth() + 1
  const year = date.getFullYear()
  const dateStr = `${day}/${month}/${year}`
  const weekDay = date.toLocaleString("en", { weekday: "long" })

  return (
    <header className={styles.header}>
      <h1 className={styles.h1}>Todo App</h1>

      <div className={styles.dateContainer}>
        <p className={styles.weekDay}>{weekDay}</p>
        <p className={styles.date}>{dateStr}</p>
      </div>
    </header>
  )
}

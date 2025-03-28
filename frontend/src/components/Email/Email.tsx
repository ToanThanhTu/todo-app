import { ContactFormModel } from "@/types"
import styles from "./Email.module.css"

export default function ContactEmail({ name, email, message }: ContactFormModel) {
  return (
    <main className={styles.main}>
      <section className={styles.section}>
        <h1 className={styles.h1}>
          You have a new message from {name} ({email}):
        </h1>

        <article>
          <p>{message}</p>
        </article>

        <br />
      </section>

      <a href={`mailto:${email}?subject=Trevor Tu: Communication`} className={styles.btn}>
        Reply
      </a>
    </main>
  )
}

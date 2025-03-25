import styles from "@/components/Footer/Footer.module.css"
import GitHubIcon from "@mui/icons-material/GitHub"
import LinkedInIcon from '@mui/icons-material/LinkedIn';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.description}>
        <p>© 2025. All Rights Reserved. Developed by Trevor Tu</p>
        <p>
          Source code:{" "}
          <a
            href="https://github.com/ToanThanhTu/todo-app"
            target="_blank"
            className={styles.sourcecode}
          >
            GitHub
          </a>
        </p>
      </div>

      <div className={styles.divider} />

      <div className={styles.socials}>
        <a href="https://github.com/ToanThanhTu/" target="_blank">
          <GitHubIcon fontSize="large" />
        </a>
        <a href="https://www.linkedin.com/in/trevor-tu/" target="_blank">
          <LinkedInIcon fontSize="large" />
        </a>
      </div>
    </footer>
  )
}

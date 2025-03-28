import EmailIcon from "@mui/icons-material/Email"
import SmartphoneIcon from "@mui/icons-material/Smartphone"
import LinkedInIcon from "@mui/icons-material/LinkedIn"
import GitHubIcon from "@mui/icons-material/GitHub"
import ContactSupportIcon from "@mui/icons-material/ContactSupport"
import styles from "./Contact.module.css"
import React from "react"
import { contacts } from "../../../data/contacts"
import { Tile, TileHeader } from "@/components/Tile/Tile"
import ContactForm from "@/components/Form/ContactForm"

const iconMap = {
  Email: <EmailIcon />,
  Phone: <SmartphoneIcon />,
  LinkedIn: <LinkedInIcon />,
  GitHub: <GitHubIcon />,
}

function Contact() {
  return (
    <div className={styles.container}>
      <Tile style={{ flexGrow: 1, display: "flex", flexDirection: "column", gap: "8px" }}>
        <TileHeader title="Contact me" icon={<ContactSupportIcon />} fontSize="1.2rem" />

        <ul className={styles.contacts}>
          {contacts.map(({ name, display, url, id }) => (
            <li key={id}>
              <a href={url} target="_blank" rel="noreferrer" className={styles.contact}>
                {iconMap[name as keyof typeof iconMap]}
                <span>{display}</span>
              </a>
            </li>
          ))}
        </ul>
      </Tile>

      <div className={styles.dividerContainer}>
        <div className={styles.divider} />
        <span>or</span>
        <div className={styles.divider} />
      </div>

      <Tile style={{ flexGrow: 1, display: "flex", flexDirection: "column", gap: "20px" }}>
        <TileHeader title="Send me a message" icon={<EmailIcon />} fontSize="1.2rem" />
        
        <ContactForm />
      </Tile>
    </div>
  )
}

export default Contact

import EmailIcon from "@mui/icons-material/Email"
import SmartphoneIcon from "@mui/icons-material/Smartphone"
import LinkedInIcon from "@mui/icons-material/LinkedIn"
import GitHubIcon from "@mui/icons-material/GitHub"

import contactsStyles from "./Contacts.module.css"
import React from "react"
import { contacts } from "../../../data/contacts"

const iconMap = {
  Email: <EmailIcon />,
  Phone: <SmartphoneIcon />,
  LinkedIn: <LinkedInIcon />,
  GitHub: <GitHubIcon />,
}

function Contacts() {
  return (
    <div className={contactsStyles.container}>
      <h1>Contact me</h1>

      <div className={contactsStyles.contacts}>
        {contacts.map(({ name, display, url, id }) => (
          <a
            key={id}
            href={url}
            target="_blank"
            rel="noreferrer"
            className={contactsStyles.contact}
          >
            {iconMap[name as keyof typeof iconMap]} - {display}
          </a>
        ))}
      </div>
    </div>
  )
}

export default Contacts

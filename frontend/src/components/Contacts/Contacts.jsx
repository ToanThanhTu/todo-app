import EmailIcon from "@mui/icons-material/Email";
import SmartphoneIcon from "@mui/icons-material/Smartphone";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";

import { contacts } from "../../../db.json";

import contactsStyles from "./Contacts.module.css";

const iconMap = {
  Email: <EmailIcon />,
  Phone: <SmartphoneIcon />,
  LinkedIn: <LinkedInIcon />,
  GitHub: <GitHubIcon />,
};

function Contacts() {
  return (
    <div className={contactsStyles.container}>
      <h1>Contact me</h1>

      <div className={contactsStyles.contacts}>
        {contacts.map(({ name, icon, url }) => (
          <a key={name} href={url} target="_blank" rel="noreferrer">
            {iconMap[icon]} - {name}
          </a>
        ))}
      </div>
    </div>
  );
}

export default Contacts;

import EmailIcon from "@mui/icons-material/Email";
import SmartphoneIcon from "@mui/icons-material/Smartphone";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";

import { contacts } from "../../../db.json";

const iconMap = {
  Email: <EmailIcon />,
  Phone: <SmartphoneIcon />,
  LinkedIn: <LinkedInIcon />,
  GitHub: <GitHubIcon />,
};

function Contacts() {
  return (
    <div>
      <h1>Contact me</h1>
      {contacts.map(({ name, icon, url }) => (
        <div key={name}>
          <a href={url} target="_blank" rel="noreferrer">
            <p>
              {iconMap[icon]} {name}
            </p>
          </a>
        </div>
      ))}
    </div>
  );
}

export default Contacts;

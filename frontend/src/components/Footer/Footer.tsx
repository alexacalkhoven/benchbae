import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import DevPostLogo from '../../assets/devpost_logo.svg';
import './Footer.css';

const DEVPOST_URL = 'https://devpost.com/software/benchbae';
const GITHUB_URL = 'https://github.com/alexacalkhoven/benchbae';

const Footer = () => {
  return (
    <div className="footer-container">
      <a href={GITHUB_URL}>
        <FontAwesomeIcon icon={faGithub} className="footer-icon" />
      </a>
      <a href={DEVPOST_URL}>
        <img src={DevPostLogo} alt="DevPost" className="footer-icon" />
      </a>
    </div>
  );
};

export default Footer;
import "./FooterTwo.css";
import { Link } from "react-router-dom";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

function FooterTwo() {
  return (
    <footer id="footer-container">
      <p>Meet the team</p>
      <div className="footer-people-container">
        <div className="footer-person-container">
          <p>Bayode</p>
          <div className="footer-links-container">
            <a
              href="https://github.com/bayodelaoye"
              rel="noreferrer"
              target="_blank"
            >
              <FaGithub className="footer-icon" />
            </a>
            <a
              href="https://www.linkedin.com/in/bayode-olaoye/"
              rel="noreferrer"
              target="_blank"
            >
              <FaLinkedin className="footer-icon" />
            </a>
          </div>
        </div>
        <div className="footer-person-container">
          <p>Tyler</p>
          <div className="footer-links-container">
            <a
              href="https://github.com/tylothedino"
              rel="noreferrer"
              target="_blank"
            >
              <FaGithub className="footer-icon" />
            </a>
            <a
              href="https://www.linkedin.com/in/tylothedino/"
              rel="noreferrer"
              target="_blank"
            >
              <FaLinkedin className="footer-icon" />
            </a>
          </div>
        </div>
        <div className="footer-person-container">
          <p>Scott</p>
          <div className="footer-links-container">
            <a
              href="https://github.com/ScottFeichter"
              rel="noreferrer"
              target="_blank"
            >
              <FaGithub className="footer-icon" />
            </a>
            <a
              href="https://www.linkedin.com/in/scottfeichter/"
              rel="noreferrer"
              target="_blank"
            >
              <FaLinkedin className="footer-icon" />
            </a>
          </div>
        </div>
        <div className="footer-person-container">
          <p>Tayon</p>
          <div className="footer-links-container">
            <a
              href="https://github.com/Tayondw"
              rel="noreferrer"
              target="_blank"
            >
              <FaGithub className="footer-icon" />
            </a>
            <a
              href="https://www.linkedin.com/in/tayon/"
              rel="noreferrer"
              target="_blank"
            >
              <FaLinkedin className="footer-icon" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default FooterTwo;

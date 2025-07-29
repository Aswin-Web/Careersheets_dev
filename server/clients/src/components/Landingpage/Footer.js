import React from "react";
import { Link } from "react-router-dom";
import classes from "./Footer.module.css";
import logo from "../../images/Careersheets-logo.png";

const navLinks = [
  { title: "Services", href: "/" },
  { title: "About Us", href: "/" },
  { title: "Help Center", href: "/" },
  { title: "Contact Us", href: "/" },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={classes.footerContainer}>
      <div className={classes.mainFooter}>
        <div className={classes.ctaContent}>
          <Link to="/">
            <img src={logo} alt="Careersheets logo" className={classes.logo} />
          </Link>
          <h2>Ready to Build Your Future?</h2>
          <p>Create a professional profile and start tracking your career journey today.</p>
          <nav className={classes.footerNav}>
            {navLinks.map((link) => (
              <Link key={link.title} to={link.href} className={classes.navLink}>
                {link.title}
              </Link>
            ))}
          </nav>
        </div>
        <div className={classes.footerContent}>


          <p className={classes.copyright}>
            © {currentYear} CareerSheets. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
import React from 'react';
import styles from './Footer.module.css';

const Footer = () => {
    return (
        <div className={styles.footer}>
            <div className={styles.contact}>
                Questions? Call <a href="#">000-800-000-0000</a>
            </div>
            <ul className={styles.links}>
                <li><a href="#">FAQ</a></li>
                <li><a href="#">Help Centre</a></li>
                <li><a href="#">Account</a></li>
                <li><a href="#">Media Centre</a></li>
                <li><a href="#">Investor Relations</a></li>
                <li><a href="#">Jobs</a></li>
                <li><a href="#">Ways to Watch</a></li>
                <li><a href="#">Terms of Use</a></li>
                <li><a href="#">Privacy</a></li>
                <li><a href="#">Cookie Preferences</a></li>
                <li><a href="#">Corporate Information</a></li>
                <li><a href="#">Contact Us</a></li>
            </ul>
            <div className={styles.copyright}>
                Netflix India Clone
            </div>
        </div>
    );
};

export default Footer;

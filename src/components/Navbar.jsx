import React, { useState } from 'react';
import styles from './Navbar.module.css';
import { useScrollPosition } from '../hooks/useScrollPosition';

const Navbar = () => {
  const scrollY = useScrollPosition();
  const isScrolled = scrollY > 100;

  const [isSearchExpanded, setIsSearchExpanded] = useState(false);

  return (
    <div className={`${styles.nav} ${isScrolled ? styles.navBlack : ''}`}>
      <div className={styles.navLeft}>
        <div className={styles.logo}>CINISTREAM</div>
        <ul className={styles.navLinks}>
          <li className={styles.active}>Home</li>
          <li>TV Shows</li>
          <li>Movies</li>
          <li>New & Popular</li>
          <li>My List</li>
          <li>Browse by Languages</li>
        </ul>
      </div>
      <div className={styles.navRight}>
        <div className={`${styles.searchBox} ${isSearchExpanded ? styles.expanded : ''}`}>
          <span className={styles.icon} onClick={() => setIsSearchExpanded(!isSearchExpanded)}>🔍</span>
          <input
            type="text"
            placeholder="Titles, people, genres"
            className={styles.searchInput}
            onBlur={() => setIsSearchExpanded(false)}
          />
        </div>
        <div style={{ fontSize: '14px' }}>Children</div>
        <div className={styles.icon}>🔔</div>

        <div className={styles.profileContainer}>
          <div className={styles.icon}>👤</div>
          <div className={styles.dropdown}>
            <ul>
              <li>Account</li>
              <li>Help Center</li>
              <li>Sign Out of Netflix</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

import React from 'react';
import styles from './navbar.module.css';
import logo from '../../assets/logo.jpg'; // Importe a imagem corretamente

const Navbar = () => {
  return (
    <nav className={styles['navbar-container']}>
      <div className={styles['navbar-logo']}>
        <img className={styles['navbar-img']} src={logo} alt="Logo" />
      </div>
    </nav>
  );
};

export default Navbar;

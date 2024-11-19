import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './navbar.module.css';
import logo from '../../assets/logo.jpg';

const Navbar = () => {
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const correctPassword = "12345"; // Defina aqui a senha correta

  // Função para abrir o modal
  const handleAdminClick = () => {
    setShowModal(true);
  };

  // Função para verificar a senha
  const handlePasswordCheck = () => {
    if (!password.trim()) {
      setError("A senha não pode estar vazia!");
      return;
    }
  
    if (password === correctPassword) {
      setLoading(true);
      setTimeout(() => {
        navigate('/admin');
        setLoading(false);
        setShowModal(false);
        setPassword("");
        setError("");
      }, 500);
    } else {
      setError("Ops! A senha está incorreta. Tente novamente.");
    }
  };
  return (
    <div>
      {/* Navbar */}
      <nav className={styles['navbar-container']}>
        <div className={styles['navbar-logo']}>
          <img className={styles['navbar-img']} src={logo} alt="Logo" />
        </div>
        <button onClick={handleAdminClick} className={styles['navbar-button']}>
          {loading ? "Carregando..." : "Admin"}
        </button>
      </nav>

      {/* Modal de senha */}
      {showModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h2>Digite a senha</h2>
            <input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.input}
            />
            {error && <p className={styles.error}>{error}</p>}
            <button onClick={handlePasswordCheck} className={styles.button}>
              Confirmar
            </button>
            <button
              onClick={() => setShowModal(false)}
              className={styles.cancelButton}
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;

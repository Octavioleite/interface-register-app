import React, { useState, useEffect } from "react";
import Navbar from "../../components/navbar/navbar";
import styles from "./userpage.module.css";

const UserPage = ({ user }) => {
  const [isModalOpen, setIsModalOpen] = useState(true); 

  if (!user) {
    return <p>Carregando...</p>;
  }

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <Navbar />
      <h1>Bem-vindo, {user.name}</h1>
      <center><p><strong>PAUTAS</strong></p></center>

      {isModalOpen && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <span className={styles.closeButton} onClick={closeModal}>
              &times;
            </span>
            <h1>Aviso Importante</h1>
            <p className={styles.p}>
              Os dados fornecidos serão utilizados exclusivamente para verificar a autenticidade do cadastro, garantindo total confidencialidade e segurança das informações.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserPage;

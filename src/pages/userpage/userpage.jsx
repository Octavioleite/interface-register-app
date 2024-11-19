import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../../components/navbar/navbar";
import styles from "./userpage.module.css";

const UserPage = ({ user }) => {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [pautas, setPautas] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [votos, setVotos] = useState({});
  
  const baseUrl = "https://api-register-users-gold.vercel.app";

  if (!user) {
    return <p>Carregando...</p>;
  }

  // Função para buscar pautas do backend
  const getPautas = async () => {
    setLoading(true);
    setError("");
    try {
      const { data } = await axios.get(`${baseUrl}/agenda`);
      setPautas(data);
    } catch (err) {
      setError("Erro ao carregar pautas.");
    } finally {
      setLoading(false);
    }
  };

  // Função para votar em uma pauta
  const handleVotar = async (pautaId, voto) => {
    if (votos[pautaId]) {
      alert("Você já votou nesta pauta!");
      return;
    }

    try {
      const response = await axios.post(`${baseUrl}/agenda/votar`, {
        pautaId,
        userId: user.id,
        voto,
      });
      setVotos((prevVotos) => ({ ...prevVotos, [pautaId]: voto }));  // Atualiza corretamente o estado de votos
      alert(`Voto registrado: ${voto === "favor" ? "Apoia" : "Não apoia"}`);
      getPautas();
    } catch (err) {
      console.error("Erro ao registrar voto:", err.response ? err.response.data : err.message);
      setError(err.response ? err.response.data.error : "Erro desconhecido ao registrar voto.");
    }
  };

  useEffect(() => {
    getPautas();

    // Configurando polling para obter pautas a cada 10 segundos
    const interval = setInterval(() => {
      getPautas();
    }, 10000); // Intervalo de 10 segundos

    return () => clearInterval(interval); // Limpar o intervalo ao desmontar o componente
  }, []);

  const closeModal = () => {
    setIsModalOpen(false);  // Atualização do estado para fechar o modal
  };

  return (
    <div className={styles.container}>
      <Navbar />
      <h1 className={styles.welcome}>Bem-vindo, {user.name}</h1>

      {/* Modal de aviso */}
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

      {loading && <p>Carregando pautas...</p>}
      {error && <p className={styles.error}>{error}</p>}

      {/* Lista de Pautas */}
      <div className={styles.pautaList}>
        {pautas.length === 0 ? (
          <p className={styles.noPauta}>Nenhuma pauta disponível.</p>
        ) : (
          <ul className={styles.ul}>
            {pautas.map((pauta) => (
              <li key={pauta.id} className={styles.pautaItem}>
                <h2>{pauta.tema}</h2>
                <p>{pauta.describ}</p>
                <p>Votos a favor: {pauta.VotFavor}</p>
                <p>Votos contra: {pauta.VotNfavor}</p>
                <div className={styles.votingButtons}>
                  <button
                    onClick={() => handleVotar(pauta.id, "favor")}
                    disabled={votos[pauta.id]}
                    className={styles.btn}
                  >
                    Apoia
                  </button>
                  <button
                    onClick={() => handleVotar(pauta.id, "naoFavor")}
                    disabled={votos[pauta.id]}
                    className={styles.btnNao}
                  >
                    Não Apoia
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default UserPage;

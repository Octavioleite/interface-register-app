import React, { useState, useEffect } from "react";
import Navbar from "../../components/navbar/navbar";
import styles from "./admin.module.css";
import axios from "axios";

const Admin = () => {
  const [pautas, setPautas] = useState([]);
  const [tema, setTema] = useState("");
  const [describ, setDescrib] = useState("");
  const [VotFavor, setVotFavor] = useState("");
  const [VotNfavor, setVotNfavor] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const baseUrl = "https://api-register-users-gold.vercel.app";

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

  const addNewPauta = async () => {
    if (!tema || !describ) {
      return alert("Preencha todos os campos!");
    }
    const data = { tema, describ, VotFavor: VotFavor || 0, VotNfavor: VotNfavor || 0 }; // Adicionando votos
    try {
      const { data: newPauta } = await axios.post(`${baseUrl}/agenda`, data);
      setPautas([...pautas, newPauta]);
      setTema("");
      setDescrib("");
      setVotFavor("");
      setVotNfavor("");
    } catch (err) {
      setError("Erro ao adicionar pauta.");
    }
  };

  useEffect(() => {
    getPautas();

    // Configurando polling para atualizar as pautas a cada 10 segundos
    const interval = setInterval(() => {
      getPautas();
    }, 10000); // Intervalo de 10 segundos

    return () => clearInterval(interval); // Limpa o intervalo ao desmontar o componente
  }, []);

  return (
    <div className={styles.container}>
      <Navbar />
      <div className={styles.content}>
        <h1>Bem-vindo, administrador</h1>

        {loading && <p className={styles.loading}>Carregando pautas...</p>}
        {error && <p className={styles.error}>{error}</p>}

        <div className={styles.form}>
          <h2>Adicionar Nova Pauta</h2>
          <input
            type="text"
            placeholder="Tema"
            value={tema}
            onChange={(e) => setTema(e.target.value)}
            className={styles.input}
          />
          <input
            type="text"
            placeholder="Descrição"
            value={describ}
            onChange={(e) => setDescrib(e.target.value)}
            className={styles.input}
          />
          <input
            type="number"
            placeholder="Votos a favor"
            value={VotFavor}
            onChange={(e) => setVotFavor(e.target.value)}
            className={styles.input}
          />
          <input
            type="number"
            placeholder="Votos não a favor"
            value={VotNfavor}
            onChange={(e) => setVotNfavor(e.target.value)}
            className={styles.input}
          />
          <button onClick={addNewPauta} className={styles.button}>
            Adicionar Pauta
          </button>
        </div>

        <div className={styles.listContainer}>
          <h2>Lista de Pautas</h2>
          {pautas.length === 0 ? (
            <p className={styles.noPauta}>Nenhuma pauta disponível</p>
          ) : (
            <ul className={styles.list}>
              {pautas.map((pauta) => (
                <li key={pauta.id} className={styles.pautaItem}>
                  <div className={styles.pautaContent}>
                    <div className={styles.pautaTema}>
                      <strong>{pauta.tema}</strong>
                    </div>
                    <div className={styles.pautaDescricao}>
                      <p>{pauta.describ}</p>
                    </div>
                    <div className={styles.pautaNota}>
                      <span>(Votos a favor: {pauta.VotFavor})</span>
                    </div>
                    <div className={styles.pautaNota}>
                      <span>(Votos não a favor: {pauta.VotNfavor})</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;

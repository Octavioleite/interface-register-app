import React, { useState, useEffect } from "react";
import Navbar from "../../components/navbar/navbar";
import styles from "./admin.module.css";
import axios from "axios";

const UserPage = () => {
  const [pautas, setPautas] = useState([]);
  const [tema, setTema] = useState("");
  const [describ, setDescrib] = useState("");
  const [Npoints, setnPoints] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const baseUrl = "http://localhost:3001";

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
    const data = { tema, describ, Npoints };
    try {
      const { data: newPauta } = await axios.post(`${baseUrl}/agenda`, data);
      setPautas([...pautas, newPauta]);
      setTema("");
      setDescrib("");
      setnPoints("");
    } catch (err) {
      setError("Erro ao adicionar pauta.");
    }
  };

  useEffect(() => {
    getPautas();
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
            placeholder="Nº de pontos"
            value={Npoints}
            onChange={(e) => setnPoints(e.target.value)}
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
              <span>(Votos: {pauta.Npoints})</span>
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

export default UserPage;

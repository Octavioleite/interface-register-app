import axios from "axios";
import { useState, useEffect } from "react";

import "./App.css";
import Image from "./assets/image.svg";
import Trash from "./assets/trash.svg";

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pauta, setPauta] = useState("");
  const [pautas, setPautas] = useState([]);
  const [votes, setVotes] = useState({}); // Armazenar votos por usuário

  const baseUrl = "https://api-register-users.vercel.app";

  const getUsers = async () => {
    const { data } = await axios.get(`${baseUrl}/users`);
    setUsers(data);
  };

  const getPautas = async () => {
    // Adicione um endpoint para obter pautas
    const { data } = await axios.get(`${baseUrl}/pautas`);
    setPautas(data);
  };

  const addNewUser = async () => {
    if (!name || !email) {
      return alert("Preencha os campos !");
    }
    const data = { name, email };

    const { data: newUser } = await axios.post(`${baseUrl}/users`, data);

    setUsers([...users, newUser]);
    setName("");
    setEmail("");
  };

  const removeUser = async (id) => {
    await axios.delete(`${baseUrl}/users/${id}`);

    setUsers(users.filter((user) => user.id !== id));
  };

  const addPauta = async () => {
    if (!pauta) {
      return alert("Preencha o campo de pauta!");
    }
    const data = { descricao: pauta, votos: 0 };
    
    // Adicione um endpoint para criar pautas
    const { data: newPauta } = await axios.post(`${baseUrl}/pautas`, data);

    setPautas([...pautas, newPauta]);
    setPauta("");
  };

  const vote = async (pautaId) => {
    // Verifica se o usuário já votou nesta pauta
    if (votes[email] && votes[email][pautaId]) {
      return alert("Você já votou nesta pauta!");
    }

    // Adiciona o voto à pauta
    const updatedPautas = pautas.map((p) =>
      p.id === pautaId ? { ...p, votos: p.votos + 1 } : p
    );

    setPautas(updatedPautas);

    // Armazena que o usuário votou nesta pauta
    setVotes({ ...votes, [email]: { ...votes[email], [pautaId]: true } });

    // Atualiza a pauta no servidor
    await axios.put(`${baseUrl}/pautas/${pautaId}`, {
      votos: updatedPautas.find(p => p.id === pautaId).votos,
    });
  };

  useEffect(() => {
    getUsers();
    getPautas();
  }, []);

  return (
    <div className="app">
      <div className="screen">
        <img src={Image} alt="image" />
        <h1>Register</h1>

        <label>
          Name
          <input
            placeholder="Pedro Silva"
            type="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>

        <label>
          Email
          <input
            placeholder="email@email.com"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>

        <button onClick={addNewUser}>Register new user</button>

        <h1>Pautas</h1>

        <label>
          Nova Pauta
          <input
            placeholder="Descrição da pauta"
            type="text"
            value={pauta}
            onChange={(e) => setPauta(e.target.value)}
          />
        </label>
        
        <button onClick={addPauta}>Adicionar Pauta</button>

        <ul>
          {pautas.map((p) => (
            <li key={p.id}>
              <div>
                <p>{p.descricao}</p>
                <p>Votos: {p.votos}</p>
              </div>
              <button onClick={() => vote(p.id)}>Votar</button>
            </li>
          ))}
        </ul>

        <ul>
          {users.map((user) => (
            <li key={user.id}>
              <div>
                <p>{user?.name}</p>
                <p>{user?.email}</p>
              </div>
              <button
                className="btn-trash"
                onClick={() => removeUser(user?.id)}
              >
                <img src={Trash} alt="trash" />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;

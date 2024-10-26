import axios from "axios";
import { useState, useEffect } from "react";

import "./App.css";
import Image from "./assets/image.svg";
import Trash from "./assets/trash.svg";

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pautas, setPautas] = useState([]); // Estado para armazenar pautas
  const [descricaoPauta, setDescricaoPauta] = useState(""); // Estado para a descrição da pauta

  const baseUrl = "http://localhost:3001"; // Ajuste para o URL do seu backend

  // Função para buscar usuários
  const getUsers = async () => {
    const { data } = await axios.get(`${baseUrl}/users`);
    setUsers(data);
  };

  // Função para buscar pautas
  const getPautas = async () => {
    const { data } = await axios.get(`${baseUrl}/pautas`);
    setPautas(data);
  };

  // Função para adicionar um novo usuário
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

  // Função para remover um usuário
  const removeUser = async (id) => {
    await axios.delete(`${baseUrl}/users/${id}`);

    setUsers(users.filter((user) => user.id !== id));
  };

  // Função para adicionar uma nova pauta
  const addNewPauta = async () => {
    if (!descricaoPauta) {
      return alert("Preencha a descrição da pauta !");
    }
    const data = { descricao: descricaoPauta };

    const { data: newPauta } = await axios.post(`${baseUrl}/pautas`, data);

    setPautas([...pautas, newPauta]); // Atualiza a lista de pautas
    setDescricaoPauta(""); // Limpa o campo de descrição
  };

  // Função para votar em uma pauta
  const votePauta = async (id) => {
    const pauta = pautas.find((p) => p.id === id);
    await axios.put(`${baseUrl}/pautas/${id}`, { votos: pauta.votos + 1 });
    getPautas(); // Atualiza a lista de pautas
  };

  useEffect(() => {
    getUsers();
    getPautas(); // Chama a função para buscar as pautas
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

        <h1>Pautas</h1>

        <label>
          Descrição da Pauta
          <input
            placeholder="Descrição da pauta"
            type="text"
            value={descricaoPauta}
            onChange={(e) => setDescricaoPauta(e.target.value)}
          />
        </label>

        <button onClick={addNewPauta}>Adicionar Pauta</button>

        <ul>
          {pautas.map((pauta) => (
            <li key={pauta.id}>
              <div>
                <p>{pauta?.descricao}</p>
                <p>Votos: {pauta?.votos}</p>
              </div>
              <button
                className="btn-vote"
                onClick={() => votePauta(pauta.id)}
              >
                Votar
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;

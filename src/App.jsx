import axios from "axios";
import { useState, useEffect } from "react";

import "./App.css";
import Image from "./assets/image.svg";
import Trash from "./assets/trash.svg";

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");
  const [numberApto, setNumberApto] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false); // Estado de carregamento
  const [error, setError] = useState(""); // Estado para mensagens de erro
  
  const baseUrl = "  http://localhost:3001";

 //const baseUrl = "https://api-register-users-gold.vercel.app";

  const getUsers = async () => {
    setLoading(true);
    setError(""); // Limpa mensagens de erro anteriores
    try {
      const { data } = await axios.get(`${baseUrl}/users`);
      setUsers(data);
    } catch (err) {
      setError("Erro ao carregar usuários.");
    } finally {
      setLoading(false);
    }
  };

  const addNewUser = async () => {
    if (!name || !email || !cpf ||!numberApto) {
      return alert("Preencha os campos !");
    }

    // Validação simples de e-mail
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return alert("Por favor, insira um e-mail válido.");
    }

    const data = { name, cpf, email, numberApto};

    try {
      const { data: newUser } = await axios.post(`${baseUrl}/users`, data);
      setUsers([...users, newUser]);
      setName("");
      setCpf("");
      setEmail("");
      setNumberApto("");
    } catch (err) {
      setError("Erro ao adicionar usuário.");
    }
  };

  const removeUser = async (id) => {
    if (window.confirm("Tem certeza que deseja remover este usuário?")) {
      try {
        await axios.delete(`${baseUrl}/users/${id}`);
        setUsers(users.filter((user) => user.id !== id));
      } catch (err) {
        setError("Erro ao remover usuário.");
      }
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="app">
      <div className="screen">
        <img src={Image} alt="image" />
        <h1>Register</h1>
        {error && <p style={{ color: 'red' }}>{error}</p>} {/* Mensagem de erro */}

        <label>
          Name
          <input
            placeholder="Pedro Silva"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label>
          CPF
          <input
            placeholder="111.111.111-11"
            type="text"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
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
        <label>
          Número da unidade
          <input
            placeholder="85"
            type="text"
            value={numberApto}
            onChange={(e) => setNumberApto(e.target.value)}
          />
        </label>

        <button onClick={addNewUser} disabled={loading}>
          {loading ? "Loading..." : "Register new user"}
        </button>

        <ul>
          {users.map((user) => (
            <li key={user.id}> {/* Adicionando chave única */}
              <div>
                <p>{user?.name}</p>
                <p>{user?.cpf}</p>
                <p>{user?.email}</p>
                <p>{user?.numberApto}</p>
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

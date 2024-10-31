import axios from "axios";
import { useState, useEffect } from "react";

import "./App.css";
import Image from "./assets/image.svg";
import Trash from "./assets/trash.svg";

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false); // Estado de carregamento
  const [error, setError] = useState(""); // Estado para mensagens de erro

  const baseUrl = "https://api-register-users-cofr7psad-octavioleites-projects.vercel.app/?vercelToolbarCode=H9Upg_oM6vxH2f7";

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
    if (!name || !email) {
      return alert("Preencha os campos !");
    }

    // Validação simples de e-mail
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return alert("Por favor, insira um e-mail válido.");
    }

    const data = { name, email };

    try {
      const { data: newUser } = await axios.post(`${baseUrl}/users`, data);
      setUsers([...users, newUser]);
      setName("");
      setEmail("");
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
          Email
          <input
            placeholder="email@email.com"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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

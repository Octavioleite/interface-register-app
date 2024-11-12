import axios from "axios";
import { useState, useEffect } from "react";
import Navbar from "./components/navbar/navbar";
import IconUser from "./assets/icon_register_users.png";
import styles from './App.module.css';
import Trash from "./assets/trash.svg";
import { useNavigate } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';
import UserPage from './components/userpage/userpage'; // Certifique-se de importar a página de usuários

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");
  const [numberApto, setNumberApto] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const goToUsers = () => {
    navigate('/users');
  };

  const baseUrl = "http://localhost:3001";

  const getUsers = async () => {
    setLoading(true);
    setError("");
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
    if (!name || !email || !cpf || !numberApto) {
      return alert("Preencha todos os campos!");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return alert("Por favor, insira um e-mail válido.");
    }

    const data = { name, cpf, email, numberApto };
    try {
      const { data: newUser } = await axios.post(`${baseUrl}/users`, data);
      setUsers([...users, newUser]);
      setName("");
      setCpf("");
      setEmail("");
      setNumberApto("");
      goToUsers();
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

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === 'Enter') {
        addNewUser();
      }
    };
    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [addNewUser]);

  return (
    <Routes>
      <Route path="/" element={
        <div className={styles.app}>
          <Navbar />
          <div className={styles.screen}>
            <img src={IconUser} alt="Logo" />
            <h1>Registro de Condôminos</h1>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <label>
              Nome
              <input
                type="text"
                placeholder="Pedro Silva"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>
            <label>
              CPF
              <input
                type="text"
                placeholder="111.111.111-11"
                value={cpf}
                onChange={(e) => setCpf(e.target.value)}
              />
            </label>
            <label>
              Email
              <input
                type="email"
                placeholder="email@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            <label>
              Número da unidade
              <input
                type="text"
                placeholder="85"
                value={numberApto}
                onChange={(e) => setNumberApto(e.target.value)}
              />
            </label>

            <button onClick={addNewUser} disabled={loading}>
              {loading ? "Carregando..." : "Registrar"}
            </button>

            <ul>
              {users.map((user) => (
                <li key={user.id}>
                  <div>
                    <p>Nome: {user.name}</p>
                    <p>CPF: {user.cpf}</p>
                    <p>E-mail: {user.email}</p>
                    <p>Número da unidade: {user.numberApto}</p>
                  </div>
                  <button className="btn-trash" onClick={() => removeUser(user.id)}>
                    <img src={Trash} alt="Excluir" />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      } />
      <Route path="/users" element={<UserPage users={users} />} />
    </Routes>
  );
}

export default App;

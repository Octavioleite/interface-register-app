import axios from "axios";
import { useState, useEffect } from "react";

import "./App.css";
import Image from "./assets/image.svg";
import Trash from "./assets/trash.svg";

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const baseUrl = "https://api-register-users.vercel.app";

  const getUsers = async () => {
    const { data } = await axios.get(`${baseUrl}/users`);
    setUsers(data);
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

  useEffect(() => {
    getUsers();
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
            <li>
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

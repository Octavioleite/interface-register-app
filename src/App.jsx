import axios from "axios";
import { useState, useEffect } from "react";

import "./App.css";
import Image from "./assets/image.svg";
import Trash from "./assets/trash.svg";

function App() {
  const [issues, setIssues] = useState([]);
  const [title, setTitle] = useState("");

  const baseUrl = "https://api-register-users.vercel.app"; // Atualize para o URL do seu back-end

  const getIssues = async () => {
    const { data } = await axios.get(`${baseUrl}/issues`);
    setIssues(data);
  };

  const addNewIssue = async () => {
    if (!title) {
      return alert("Preencha o título da pauta!");
    }
    const data = { title };

    const { data: newIssue } = await axios.post(`${baseUrl}/issues`, data);
    setIssues([...issues, newIssue]);
    setTitle("");
  };

  const vote = async (id, vote) => {
    await axios.post(`${baseUrl}/issues/${id}/vote`, { vote });
    getIssues(); // Recarregar as pautas após o voto
  };

  const removeIssue = async (id) => {
    await axios.delete(`${baseUrl}/issues/${id}`);
    setIssues(issues.filter((issue) => issue.id !== id));
  };

  useEffect(() => {
    getIssues();
  }, []);

  return (
    <div className="app">
      <div className="screen">
        <img src={Image} alt="image" />
        <h1>Cadastrar Pauta</h1>

        <label>
          Título
          <input
            placeholder="Título da Pauta"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>

        <button onClick={addNewIssue}>Adicionar Pauta</button>

        <ul>
          {issues.map((issue) => (
            <li key={issue.id}>
              <div>
                <p>{issue.title}</p>
                <p>A favor: {issue.votesFor} | Não sou a favor: {issue.votesAgainst}</p>
              </div>
              <button onClick={() => vote(issue.id, "for")}>A Favor</button>
              <button onClick={() => vote(issue.id, "against")}>Não Sou a Favor</button>
              <button className="btn-trash" onClick={() => removeIssue(issue.id)}>
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

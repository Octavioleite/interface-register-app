import React from "react";

const UserPage = ({ users }) => {
  return (
    <div>
      {users.map((user) => (
        <div key={user.id}>
          <h1>Bem Vindo, {user.name}</h1>
          <ul>
            <li>
              <p>Nome: {user.name}</p>
              <p>CPF: {user.cpf}</p>
              <p>Email: {user.email}</p>
              <p>Número da unidade: {user.numberApto}</p>
            </li>
          </ul>
        </div>
      ))}
    </div>
  );
};

export default UserPage;

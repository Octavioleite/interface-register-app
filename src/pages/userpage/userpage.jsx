import React from "react";
import Navbar from "../../components/navbar/navbar";
import styles from "./userpage.module.css";

const UserPage = ({ user }) => {
  if (!user) {
    return <p>Carregando...</p>;
  }
  //className={styles.h1}
  return (
    <div>
      <Navbar />
      
      <h1>Bem-vindo, {user.name}</h1>
      <p>teste</p> 
    </div>
  );
};

export default UserPage;

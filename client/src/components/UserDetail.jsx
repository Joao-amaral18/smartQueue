import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "../api/axios";

const UserDetail = ({  }) => {
  const [user, setUser] = useState(null);
const { userId } = useParams(); 


  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const response = await axios.get(`/users/${userId}`);
      setUser(response.data);
    } catch (error) {
      console.error(`Error fetching user ${userId}:`, error);
    }
  };

  if (!user) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Detalhes do Usuário</h2>
      <p>
        <strong>Nome:</strong> {user.name}
      </p>
      <p>
        <strong>Email:</strong> {user.email}
      </p>
      <p>
        <strong>CPF:</strong> {user.cpf}
      </p>
    </div>
  );
};

export default UserDetail;

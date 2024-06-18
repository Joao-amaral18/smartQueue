import React, { useState, useEffect } from "react";
import axios from "../api/axios";
import { Link } from "react-router-dom";

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const viewUser = (userId) => {
    // Aqui você pode redirecionar para a tela de detalhes do usuário
    // Por exemplo, navegar para `/users/${userId}`
    console.log(`Visualizar usuário ${userId}`);
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Lista de Usuários</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {users.map((user) => (
          <div key={user.id} className="bg-white p-4 rounded-md shadow-md">
            <h3 className="text-lg font-semibold">{user.name}</h3>
            <p className="text-gray-600 mb-2">Email: {user.email}</p>
            <p className="text-gray-600 mb-2">CPF: {user.cpf}</p>
            <Link
              to={`/users/${user.id}`}
              className="bg-yellow-600 hover:bg-yellow-700 text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
            >
              Ver Usuário
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserList;

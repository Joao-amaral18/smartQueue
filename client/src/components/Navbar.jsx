import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-red-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/" className="text-white text-xl font-bold">
            Frango assado King 
          </Link>
        </div>
        <div className="flex space-x-4">
          <NavLink to="/products">Produtos</NavLink>
          <NavLink to="/users">Usuários</NavLink>
          <NavLink to="/order">Pedidos</NavLink>
        </div>
      </div>
    </nav>
  );
};

const NavLink = ({ to, children }) => {
  return (
    <Link
      to={to}
      className="text-white hover:bg-red-900 px-3 py-2 rounded-md text-sm font-medium transition duration-300"
      activeClassName="bg-red-700"
    >
      {children}
    </Link>
  );
};

export default Navbar;

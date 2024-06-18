import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";

import ProductForm from "./components/ProductForm";
import ProductsList from "./components/ProductsList";
import ProductDetail from "./components/ProductDetail";
import OrderList from "./components/OrderList";
import OrderDetail from "./components/OrderDetail";
import CreateOrderForm from "./components/CreateOrderForm";
import UserList from "./components/UserList";
import UserDetail from "./components/UserDetail";
import CreateUserForm from "./components/CreateUserForm";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { AuthProvider } from "./context/AuthContext";

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <div>
          <Navbar />
          <div className="container mx-auto p-4">
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/products" element={<ProductsList />} />
              <Route path="/products/new" element={<ProductForm />} />

              <Route path="/products" element={<ProductDetail />} />
              <Route path="/order" element={<OrderList />} />
              <Route path="/order/:orderId" element={<OrderDetail />} />
              <Route path="/order/new" element={<CreateOrderForm />} />

              <Route path="/users" element={<UserList />} />
              <Route path="/users/:userId" element={<UserDetail />} />
              <Route path="/users/new" element={<CreateUserForm />} />

              <Route path="/" element={<Navigate to="/products" />} />
            </Routes>
          </div>
        </div>
      </AuthProvider>
    </Router>
  );
};

export default App;

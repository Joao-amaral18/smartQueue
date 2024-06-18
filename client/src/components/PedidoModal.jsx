import React from "react";

const PedidoModal = ({ children, onClose }) => {
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded-md shadow-md w-1/2">
        <button className="text-red-500 float-right" onClick={onClose}>
          Fechar
        </button>
        {children}
      </div>
    </div>
  );
};

export default PedidoModal;

import React from "react";

const Modal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
      <div className="relative w-auto max-w-lg mx-auto my-6">
        {/* Modal conteúdo */}
        <div className="relative flex flex-col bg-white shadow-lg rounded-md">
          {/* Header */}
          <div className="flex items-center justify-between p-5 bg-yellow-500 rounded-t-md">
            <h3 className="text-lg font-semibold text-white">Processando...</h3>
          </div>
          {/* Corpo do Modal */}
          <div className="flex flex-col items-center justify-center p-5">
            {/* Spinner (ou qualquer indicador de carregamento) */}
            <div className="animate-spin h-12 w-12 rounded-full border-t-2 border-b-2 border-yellow-500"></div>
            <p className="mt-4 text-sm text-gray-600">Aguarde enquanto processamos sua solicitação.</p>
          </div>
        </div>
      </div>
      {/* Fundo escurecido */}
      <div className="fixed inset-0 bg-black opacity-25"></div>
    </div>
  );
};

export default Modal;

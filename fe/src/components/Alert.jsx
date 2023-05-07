import React from 'react';

const Alert = ({ message, type = 'error', onClose }) => {
  const alertStyles = {
    error: 'bg-red-500 text-white',
    info: 'bg-blue-500 text-white',
    success: 'bg-green-500 text-white',
  };

  return (
    <div className={`fixed top-16 left-0 right-0 mx-auto w-full max-w-md rounded-md p-4 mb-4 ${alertStyles[type]}`}>
      <div className="flex justify-between">
        <div>{message}</div>
        {onClose && (
          <button
            onClick={onClose}
            className="bg-transparent border-none text-white text-lg font-bold"
          >
            &times;
          </button>
        )}
      </div>
    </div>
  );
};

export default Alert;

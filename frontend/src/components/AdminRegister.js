// File: src/components/AdminRegister.js
import React from 'react';

const AdminRegister = () => {
  const handleRegister = () => {
    const data = { username: 'admin', password: 'admin123' };

    fetch('http://localhost:3000/AdminReg', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error('Error:', error));
  };

  return <button onClick={handleRegister}>Register Admin</button>;
};

export default AdminRegister;

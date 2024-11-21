// File: src/services/apiService.js
export const registerAdmin = async (data) => {
    try {
      const response = await fetch('http://localhost:3000/Adminregister', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      return await response.json();
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  };
  
  
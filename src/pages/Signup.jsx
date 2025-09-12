import React, { useState } from 'react';

function Signup() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    cellNumber: '',
    password: '',
    role: ''
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const add = async (data) => {
    try {
      setLoading(true);

      // Puoi sostituire fetch con axiosClient.post se preferisci:
      // const response = await axiosClient.post('/user/register', data);

      const response = await fetch('http://localhost:8081/api/user/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Errore durante la registrazione.');
      }

      return true;
    } catch (err) {
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const isSuccess = await add(formData);

    if (isSuccess) {
      setSuccess('✅ Utente registrato con successo!');
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        cellNumber: '',
        password: '',
        role: ''
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: '0 auto' }}>
      <h2>Registrazione</h2>

      <input
        type="text"
        name="firstName"
        placeholder="Nome"
        value={formData.firstName}
        onChange={handleChange}
        required
      />

      <input
        type="text"
        name="lastName"
        placeholder="Cognome"
        value={formData.lastName}
        onChange={handleChange}
        required
      />

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
      />

      <input
        type="username"
        name="username"
        placeholder="username"
        value={formData.username}
        onChange={handleChange}
        required
      />

      <input
        type="tel"
        name="cellNumber"
        placeholder="Telefono"
        value={formData.cellNumber}
        onChange={handleChange}
        required
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        required
      />

      <select
        name="role"
        value={formData.role}
        onChange={handleChange}
        required
        style={{ marginTop: '10px', padding: '8px', width: '100%' }}
      >
        <option value="" disabled>Seleziona ruolo</option>
        <option value="CLIENT">Cliente</option>
        <option value="TRAINER">Trainer</option>
      </select>

      <button type="submit" disabled={loading} style={{ marginTop: '15px' }}>
        {loading ? 'Registrazione in corso...' : 'Registrati'}
      </button>

      {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
      {success && <p style={{ color: 'green', marginTop: '10px' }}>{success}</p>}
    </form>
  );
}

export default Signup;

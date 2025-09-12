import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosClient from '../api/axiosClient';
import { Form, Button, Spinner, Alert } from 'react-bootstrap';

const palette = {
    primary: '#2575fc',
    primaryDark: '#1a54d6',
    text: '#333',
    background: '#f5f7fa',
    inputBg: '#fff',
    inputBorder: '#ccc',
    shadow: 'rgba(37, 117, 252, 0.3)',
};

const UserUpdateForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        email: '',
        role: '',
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        setLoading(true);
        axiosClient.get(`/user/readUserById/${id}`)
            .then(res => {
                setUser({
                    firstName: res.data.firstName || '',
                    lastName: res.data.lastName || '',
                    email: res.data.email || '',
                    role: res.data.role || '',
                });
                setLoading(false);
            })
            .catch(err => {
                setError('Errore: ' + (err.response?.data?.message || err.message));
                setLoading(false);
            });
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSaving(true);
        setError('');

        const updatePayload = {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role,
        };

        axiosClient.put(`/user/update/${id}`, updatePayload)
            .then(() => {
                setSaving(false);
                navigate('/userlist');
            })
            .catch(err => {
                setError('Errore durante l\'aggiornamento: ' + (err.response?.data?.message || err.message));
                setSaving(false);
            });
    };

    if (loading) return (
        <div style={{
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: palette.background,
        }}>
            <Spinner animation="border" variant="primary" />
        </div>
    );

    return (
        <div
            style={{
                height: '100vh',
                width: '100vw',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#2575fc', // sfondo blu
                boxSizing: 'border-box',
                padding: 0,
                margin: 0,
            }}
        >
            <form
                onSubmit={handleSubmit}
                style={{
                    backgroundColor: 'white',
                    padding: '1.5rem 2rem',
                    borderRadius: '12px',
                    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
                    width: '360px',
                    maxHeight: '90vh',
                    overflowY: 'auto',
                    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                    color: '#222',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.9rem',
                    boxSizing: 'border-box',
                    margin: '0 auto',
                    border: '2px solid #a3c1ff', // bordo azzurro chiaro
                }}
            >
                <h2
                    style={{
                        textAlign: 'center',
                        marginBottom: '1rem',
                        color: '#2575fc',
                        fontWeight: '700',
                        textTransform: 'uppercase',
                        letterSpacing: '1.2px',
                        fontSize: '1.5rem',
                    }}
                >
                    Aggiorna Utente
                </h2>

                {error && (
                    <div
                        style={{
                            backgroundColor: '#f8d7da',
                            color: '#842029',
                            padding: '0.75rem 1rem',
                            borderRadius: '8px',
                            fontSize: '0.9rem',
                        }}
                    >
                        {error}
                    </div>
                )}

                {/* Nome */}
                <label htmlFor="firstName" style={{ fontWeight: '600', fontSize: '0.9rem' }}>
                    Nome
                </label>
                <input
                    id="firstName"
                    type="text"
                    name="firstName"
                    value={user.firstName}
                    onChange={handleChange}
                    required
                    style={{
                        padding: '0.45rem 0.9rem',
                        fontSize: '0.95rem',
                        borderRadius: '8px',
                        border: '1.5px solid #ccc',
                        outline: 'none',
                        transition: 'border-color 0.3s ease',
                    }}
                    onFocus={(e) => (e.target.style.borderColor = '#2575fc')}
                    onBlur={(e) => (e.target.style.borderColor = '#ccc')}
                    autoComplete="given-name"
                />

                {/* Cognome */}
                <label htmlFor="lastName" style={{ fontWeight: '600', fontSize: '0.9rem' }}>
                    Cognome
                </label>
                <input
                    id="lastName"
                    type="text"
                    name="lastName"
                    value={user.lastName}
                    onChange={handleChange}
                    required
                    style={{
                        padding: '0.45rem 0.9rem',
                        fontSize: '0.95rem',
                        borderRadius: '8px',
                        border: '1.5px solid #ccc',
                        outline: 'none',
                        transition: 'border-color 0.3s ease',
                    }}
                    onFocus={(e) => (e.target.style.borderColor = '#2575fc')}
                    onBlur={(e) => (e.target.style.borderColor = '#ccc')}
                    autoComplete="family-name"
                />

                {/* Email */}
                <label htmlFor="email" style={{ fontWeight: '600', fontSize: '0.9rem' }}>
                    Email
                </label>
                <input
                    id="email"
                    type="email"
                    name="email"
                    value={user.email}
                    onChange={handleChange}
                    required
                    style={{
                        padding: '0.45rem 0.9rem',
                        fontSize: '0.95rem',
                        borderRadius: '8px',
                        border: '1.5px solid #ccc',
                        outline: 'none',
                        transition: 'border-color 0.3s ease',
                    }}
                    onFocus={(e) => (e.target.style.borderColor = '#2575fc')}
                    onBlur={(e) => (e.target.style.borderColor = '#ccc')}
                    autoComplete="email"
                />

                {/* Ruolo */}
                <label htmlFor="role" style={{ fontWeight: '600', fontSize: '0.9rem' }}>
                    Ruolo
                </label>
                <select
                    id="role"
                    name="role"
                    value={user.role}
                    onChange={handleChange}
                    required
                    style={{
                        padding: '0.45rem 0.9rem',
                        fontSize: '0.95rem',
                        borderRadius: '8px',
                        border: '1.5px solid #ccc',
                        outline: 'none',
                        backgroundColor: 'white',
                        color: '#222',
                        cursor: 'pointer',
                        transition: 'border-color 0.3s ease',
                    }}
                    onFocus={(e) => (e.target.style.borderColor = '#2575fc')}
                    onBlur={(e) => (e.target.style.borderColor = '#ccc')}
                >
                    <option value="" disabled>
                        Seleziona ruolo
                    </option>
                    <option value="ADMIN">Admin</option>
                    <option value="CLIENT">Client</option>
                </select>

                {/* Pulsanti */}
                <button
                    type="submit"
                    disabled={saving}
                    style={{
                        marginTop: '1rem',
                        padding: '0.6rem',
                        fontSize: '1rem',
                        fontWeight: '700',
                        color: 'white',
                        backgroundColor: '#2575fc',
                        border: 'none',
                        borderRadius: '10px',
                        cursor: saving ? 'wait' : 'pointer',
                        transition: 'background-color 0.3s ease',
                    }}
                    onMouseEnter={(e) => {
                        if (!saving) e.currentTarget.style.backgroundColor = '#1a54d6';
                    }}
                    onMouseLeave={(e) => {
                        if (!saving) e.currentTarget.style.backgroundColor = '#2575fc';
                    }}
                >
                    {saving ? 'Salvataggio...' : 'Aggiorna Utente'}
                </button>

                <button
                    type="button"
                    disabled={saving}
                    onClick={() => navigate('/users')}
                    style={{
                        marginTop: '0.5rem',
                        padding: '0.5rem',
                        fontSize: '0.9rem',
                        fontWeight: '600',
                        color: '#2575fc',
                        backgroundColor: 'transparent',
                        border: '2px solid #2575fc',
                        borderRadius: '10px',
                        cursor: saving ? 'wait' : 'pointer',
                        transition: 'background-color 0.3s ease, color 0.3s ease',
                    }}
                    onMouseEnter={(e) => {
                        if (!saving) {
                            e.currentTarget.style.backgroundColor = '#2575fc';
                            e.currentTarget.style.color = 'white';
                        }
                    }}
                    onMouseLeave={(e) => {
                        if (!saving) {
                            e.currentTarget.style.backgroundColor = 'transparent';
                            e.currentTarget.style.color = '#2575fc';
                        }
                    }}
                >
                    Annulla
                </button>
            </form>
        </div>
    );



};

export default UserUpdateForm;

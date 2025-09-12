import React, { useEffect, useState } from 'react';
import axiosClient from '../api/axiosClient';
import { Card, Row, Col, Spinner, Alert, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const palette = {
  primary: '#2575fc',
  primaryLight: '#d3e3ff',
  text: '#333',
  background: '#f8faff',
};

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const fetchUsers = () => {
    setLoading(true);
    setError('');
    axiosClient.get('/user/userList')
      .then(res => {
        setUsers(res.data);
        setLoading(false);
      })
      .catch(err => {
        setError('Errore: ' + (err.response?.data?.message || err.message));
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = (id) => {
    if (window.confirm('Sei sicuro di voler eliminare questo utente?')) {
      setLoading(true);
      axiosClient.delete(`/user/delete/${id}`)
        .then(() => {
          fetchUsers();
        })
        .catch(err => {
          setError('Errore durante la cancellazione: ' + (err.response?.data?.message || err.message));
          setLoading(false);
        });
    }
  };

  if (loading) return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: '60vh' }}>
      <Spinner animation="border" variant="primary" />
    </div>
  );

  if (error) return (
    <Alert variant="danger" className="mt-4 text-center">
      {error}
    </Alert>
  );

  return (
    <div style={{ padding: '2rem', backgroundColor: palette.background, minHeight: '100vh' }}>
      <h2
        className="mb-4"
        style={{
          color: palette.primary,
          fontWeight: '700',
          textAlign: 'center',
          letterSpacing: '2px',
          textTransform: 'uppercase',
          userSelect: 'none',
        }}
      >
        Lista Utenti
      </h2>

      <div className="d-flex justify-content-center mb-4">
        <button
          type="button"
          onClick={() => navigate('/dashboard')}
          style={{
            marginTop: '0.5rem',
            padding: '0.5rem',
            fontSize: '0.9rem',
            fontWeight: '600',
            color: '#2575fc',
            backgroundColor: 'transparent',
            border: '2px solid #2575fc',
            borderRadius: '10px',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease, color 0.3s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#2575fc';
            e.currentTarget.style.color = 'white';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.color = '#2575fc';
          }}
        >
          Torna alla Dashboard
        </button>
      </div>


      <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {users.map(user => (
          <Col key={user.id}>
            <Card
              style={{
                borderRadius: '15px',
                boxShadow: '0 4px 15px rgba(37, 117, 252, 0.3)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                cursor: 'default',
                backgroundColor: palette.primaryLight,
                color: palette.text,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
              className="h-100"
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(37, 117, 252, 0.5)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.boxShadow = '0 4px 15px rgba(37, 117, 252, 0.3)';
              }}
            >
              <Card.Body>
                <Card.Title
                  style={{ fontWeight: '700', fontSize: '1.3rem', marginBottom: '0.4rem', color: palette.primary }}
                >
                  {user.firstName} {user.lastName}
                </Card.Title>
                <Card.Subtitle className="mb-3" style={{ fontSize: '0.9rem', color: palette.primary }}>
                  <strong>Ruolo:</strong> {user.role}
                </Card.Subtitle>

                <Card.Text style={{ fontSize: '0.9rem', color: palette.text }}>
                  <strong>ID:</strong> {user.id}<br />
                  <strong>Email:</strong>{' '}
                  <a href={`mailto:${user.email}`} style={{ color: palette.primary, textDecoration: 'underline' }}>
                    {user.email}
                  </a>
                </Card.Text>
              </Card.Body>

              <div className="p-3 pt-0 d-flex gap-2">
                <Button variant="warning" size="sm" onClick={() => navigate(`/user/update/${user.id}`)} style={{ flex: 1 }}>
                  Aggiorna
                </Button>
                <Button variant="danger" size="sm" onClick={() => handleDelete(user.id)} style={{ flex: 1 }}>
                  Elimina
                </Button>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default UserList;

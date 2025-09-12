import React, { useState } from 'react';
import axiosClient, { setAuth, clearAuth } from '../api/axiosClient';
import { useNavigate } from 'react-router-dom';

import { Container, Row, Col, Card, Form, Button, Alert, Spinner, InputGroup } from 'react-bootstrap';
import { FaUser, FaLock } from 'react-icons/fa';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setError('');
    if (!username || !password) {
      setError('Inserisci username e password');
      return;
    }
    setLoading(true);
    setAuth(username, password);
    try {
      await axiosClient.get('/user/me');
      setLoading(false);
      navigate('/dashboard');
    } catch (err) {
      setLoading(false);
      clearAuth();
      if (err.response && (err.response.status === 401 || err.response.status === 403)) {
        setError('Credenziali non valide o accesso negato.');
      } else if (err.response) {
        setError(`Errore: ${err.response.status} - ${err.response.statusText}`);
      } else {
        setError('Impossibile contattare il server.');
      }
    }
  };

  return (
    <Container
      fluid
      className="d-flex justify-content-center align-items-center"
      style={{
        minHeight: '100vh',
        minWidth: '100vw',
        background: 'linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)',
        padding: '20px',
        overflow: 'hidden',
      }}
    >
      <Row className="justify-content-center w-100" style={{ maxWidth: '480px' }}>
        <Col xs={12} className="d-flex flex-column align-items-center">
          {/* Styled Title */}
          <h1
            style={{
              fontWeight: '700',
              fontSize: '2.6rem',
              color: 'white',
              textShadow: '2px 2px 8px rgba(0,0,0,0.3)',
              marginBottom: '1.5rem',
              fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
              userSelect: 'none',
              textAlign: 'center',
              letterSpacing: '2px',
            }}
          >
            Accedi al Gestionale
          </h1>

          <Card
            className="p-4 shadow-lg w-100"
            style={{
              borderRadius: '20px',
              backgroundColor: 'rgba(255, 255, 255, 0.85)',
            }}
          >
            <Card.Body>
              {error && <Alert variant="danger" className="shadow-sm">{error}</Alert>}

              <Form>
                <Form.Group controlId="username" className="mb-3">
                  <Form.Label>Username</Form.Label>
                  <InputGroup>
                    <InputGroup.Text className="bg-primary text-white border-0 rounded-start">
                      <FaUser />
                    </InputGroup.Text>
                    <Form.Control
                      type="text"
                      placeholder="Inserisci username"
                      value={username}
                      onChange={e => setUsername(e.target.value)}
                      disabled={loading}
                      autoComplete="username"
                      className="rounded-end"
                      style={{ borderLeft: 'none' }}
                    />
                  </InputGroup>
                </Form.Group>

                <Form.Group controlId="password" className="mb-4">
                  <Form.Label>Password</Form.Label>
                  <InputGroup>
                    <InputGroup.Text className="bg-primary text-white border-0 rounded-start">
                      <FaLock />
                    </InputGroup.Text>
                    <Form.Control
                      type="password"
                      placeholder="Inserisci password"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      disabled={loading}
                      autoComplete="current-password"
                      className="rounded-end"
                      style={{ borderLeft: 'none' }}
                    />
                  </InputGroup>
                </Form.Group>

                <Button
                  variant="primary"
                  className="w-100 mb-3 fw-bold"
                  onClick={handleLogin}
                  disabled={loading}
                  size="lg"
                  style={{ borderRadius: '12px', letterSpacing: '1px' }}
                >
                  {loading ? (
                    <>
                      <Spinner animation="border" size="sm" className="me-2" />
                      Caricamento...
                    </>
                  ) : (
                    'Login'
                  )}
                </Button>

                <div className="text-center">
                  <p className="mb-2 text-muted">Non hai ancora un account?</p>
                  <Button
                    variant="outline-primary"
                    onClick={() => navigate('/signup')}
                    disabled={loading}
                    size="sm"
                    style={{ borderRadius: '12px', letterSpacing: '1px' }}
                  >
                    Sign Up
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;

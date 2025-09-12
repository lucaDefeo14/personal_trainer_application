import React from 'react';
import { Nav } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { FaUserPlus, FaUsers, FaDumbbell, FaCreditCard } from 'react-icons/fa';

const palette = {
  primary: '#2575fc', // blu chiaro principale
  primaryLight: '#d3e3ff', // azzurro chiaro per hover o sfondo
  textDark: '#333',
  textLight: '#fff',
  background: '#f8faff',
  fixedBg: '#2575fc', // sfondo fisso blu chiaro
};

const Dashboard = () => {
  const location = useLocation();

  const links = [
    { to: '/addUser', label: 'Aggiungi utente', icon: <FaUserPlus /> },
    { to: '/users', label: 'Gestione Utenti', icon: <FaUsers /> },
    { to: '/trainings', label: 'Gestione Allenamenti', icon: <FaDumbbell /> },
    { to: '/payments', label: 'Gestione Pagamenti', icon: <FaCreditCard /> },
  ];

  return (
    <div
      style={{
        display: 'flex',
        height: '100vh',
        width: '100vw',
        overflow: 'hidden',
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        backgroundColor: palette.fixedBg,
        backgroundImage: `url("data:image/svg+xml,%3csvg width='120' height='60' viewBox='0 0 120 60' xmlns='http://www.w3.org/2000/svg'%3e%3cpolygon points='0,60 30,10 60,60' fill='%232154c7' /%3e%3cpolygon points='40,60 70,20 100,60' fill='%234f79d1' /%3e%3cpolygon points='80,60 110,15 140,60' fill='%2375a2f4' /%3e%3c/svg%3e")`,
        backgroundRepeat: 'repeat-x',
        backgroundPosition: 'bottom',
        backgroundSize: '120px 60px',
        color: palette.textLight,
      }}
    >
      {/* Sidebar */}
      <nav
        style={{
          width: '280px',
          backgroundColor: palette.background,
          boxShadow: '2px 0 12px rgba(0,0,0,0.1)',
          display: 'flex',
          flexDirection: 'column',
          padding: '2rem 1.5rem',
          boxSizing: 'border-box',
          position: 'fixed',
          top: 0,
          bottom: 0,
          left: 0,
          zIndex: 1000,
          color: palette.textDark,
        }}
      >
        <h2
          style={{
            color: palette.primary,
            fontWeight: '700',
            fontSize: '1.8rem',
            marginBottom: '2rem',
            userSelect: 'none',
            letterSpacing: '2px',
          }}
        >
          Dashboard
        </h2>
        <Nav className="flex-column">
          {links.map(({ to, label, icon }) => (
            <Nav.Item key={to} style={{ marginBottom: '1rem' }}>
              <Nav.Link
                as={Link}
                to={to}
                active={location.pathname === to}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  color: location.pathname === to ? palette.primary : '#555',
                  fontWeight: location.pathname === to ? '700' : '500',
                  fontSize: '1.1rem',
                  padding: '0.6rem 1rem',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  backgroundColor: location.pathname === to ? palette.primaryLight : 'transparent',
                  transition: 'background-color 0.3s ease, color 0.3s ease',
                  cursor: 'pointer',
                  userSelect: 'none',
                }}
                onMouseEnter={e => {
                  if (location.pathname !== to) {
                    e.currentTarget.style.color = '#6a11cb';
                    e.currentTarget.style.backgroundColor = 'rgba(106, 17, 203, 0.1)';
                  }
                }}
                onMouseLeave={e => {
                  if (location.pathname !== to) {
                    e.currentTarget.style.color = '#555';
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }
                }}
              >
                <span style={{ fontSize: '1.3rem', color: location.pathname === to ? palette.primary : '#555' }}>{icon}</span>
                {label}
              </Nav.Link>
            </Nav.Item>
          ))}
        </Nav>
      </nav>

      {/* Main content */}
      <main
        style={{
          marginLeft: '280px',
          padding: '2.5rem 3rem',
          width: 'calc(100vw - 280px)',
          overflowY: 'auto',
          color: palette.textLight,
          textShadow: '1px 1px 6px rgba(0,0,0,0.5)',
          fontSize: '1.3rem',
          fontWeight: '600',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          userSelect: 'none',
          minHeight: '100vh',
          boxSizing: 'border-box',
        }}
      >
        <p>
          Seleziona una voce dalla sidebar per gestire il tuo gestionale.
        </p>
      </main>
    </div>
  );
};

export default Dashboard;

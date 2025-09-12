import React, { useEffect, useState } from 'react';
import axiosClient from '../api/axiosClient';

const TrainingList = () => {
  const [trainings, setTrainings] = useState([]);

  useEffect(() => {
    axiosClient.get('/training/trainingList')
      .then(res => setTrainings(res.data))
      .catch(err => alert('Errore: ' + err.message));
  }, []);

  return (
    <div>
      <h2>Allenamenti</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th><th>Titolo</th><th>Cliente</th><th>PT</th><th>Data Inizio</th><th>Data Fine</th>
          </tr>
        </thead>
        <tbody>
          {trainings.map(t => (
            <tr key={t.id}>
              <td>{t.id}</td>
              <td>{t.title}</td>
              <td>{t.clientName}</td>
              <td>{t.ptName}</td>
              <td>{t.startDate}</td>
              <td>{t.endDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TrainingList;

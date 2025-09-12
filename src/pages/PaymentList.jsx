import React, { useEffect, useState } from 'react';
import axiosClient from '../api/axiosClient';

const PaymentList = () => {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    axiosClient.get('/payment/paymentList')
      .then(res => setPayments(res.data))
      .catch(err => alert('Errore: ' + err.message));
  }, []);

  return (
    <div>
      <h2>Pagamenti</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th><th>Importo</th><th>Metodo</th><th>Stato</th><th>Data</th><th>User ID</th>
          </tr>
        </thead>
        <tbody>
          {payments.map(p => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.amount}</td>
              <td>{p.method}</td>
              <td>{p.status}</td>
              <td>{p.paymentDate}</td>
              <td>{p.user}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentList;

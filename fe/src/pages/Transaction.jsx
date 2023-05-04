import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Transaction = () => {
  const [transactions, setTransactions] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const userToken = localStorage.getItem('user_token');


  const fetchTransactions = async () => {
    try {
      const response = await axios.get('http://localhost:5500/statistic/transaction', {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
        params: {
          startDate,
          endDate,
        },
      });

      setTransactions(response.data.data);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  const handleDateChange = (e) => {
    const { name, value } = e.target;

    if (name === 'startDate') {
      setStartDate(value);
    } else if (name === 'endDate') {
      setEndDate(value);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [startDate, endDate]);

  return (
    <div className="min-h-screen">
      <div className="container mx-auto py-10 w-3/4">
        <h1 className="text-xl font-bold mb-6 text-center">Total Transactions</h1>
        <div className="mb-4">
          <label htmlFor="startDate" className="mr-2">Start Date:</label>
          <input
            type="date"
            id="startDate"
            name="startDate"
            value={startDate}
            onChange={handleDateChange}
            className="bg-white border border-gray-300 rounded py-2 px-4"
          />
          <label htmlFor="endDate" className="ml-4 mr-2">End Date:</label>
          <input
            type="date"
            id="endDate"
            name="endDate"
            value={endDate}
            onChange={handleDateChange}
            className="bg-white border border-gray-300 rounded py-2 px-4"
          />
        </div>
        <table className="w-full bg-white shadow-md rounded overflow-hidden">
          <thead className="bg-teal-400 text-white">
            <tr>
              <th className="py-2 px-4">Transaction ID</th>
              <th className="py-2 px-4">Date</th>
              <th className="py-2 px-4">Total Amount</th>
              <th className="py-2 px-4">Items</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction, index) => (
              <tr key={transaction.transaction_id} className={`${index % 2 === 0 ? 'bg-gray-100' : ''}`}>
                <td className="py-2 px-4">{transaction.transaction_id}</td>
                <td className="py-2 px-4">{transaction.date}</td>
                <td className="py-2 px-4">{transaction.total_amount}</td>
                <td className="py-2 px-4">
                  <ul className="list-disc list-inside">
                    {transaction.items.map((item) => (
                      <li key={item.product_id}>
                        {item.product_name} - {item.quantity} - {item.total}
                      </li>
                    ))}
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Transaction;

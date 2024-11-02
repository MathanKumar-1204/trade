// src/components/PaymentHistory.js

import React, { useState } from "react";

const PaymentHistory = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const payments = [
    { name: "MSFT", amount: "Rs. 150", date: "1 day ago" },
    { name: "GOOG", amount: "Rs. 44", date: "Now" },
  ];

  // Filtered payments based on search
  const filteredPayments = payments.filter((payment) =>
    payment.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4">Payment History</h2>
      
      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search payments..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg"
        />
      </div>

      {/* Payment History Boxes */}
      <div className="space-y-4">
        {filteredPayments.map((payment, index) => (
          <div key={index} className="border rounded-lg p-4 bg-gray-50 shadow flex flex-col">
            <p className="font-bold text-lg mb-1">{payment.name}</p> {/* Reduced margin-bottom */}
            <div className="flex justify-between items-center">
              <p className="text-blue-600">{payment.amount}</p>
              <span className="text-sm text-gray-500">{payment.date}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaymentHistory;

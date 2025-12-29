import React, { useState } from "react";
import Table from "./Layout/Tables";
import { FaSearch } from "react-icons/fa";

const View_customer = () => {
  const [search, setSearch] = useState("");

  const columns = [
    { header: "Name", field: "name" },
    { header: "Email", field: "email" },
    { header: "Mobile", field: "mobile" },
  ];

  const customers = [
    { name: "Faiz", email: "faiz@gmail.com", mobile: "9876543210" },
    { name: "Ali", email: "ali@gmail.com", mobile: "9123456780" },
    { name: "Ahmed", email: "ahmed@gmail.com", mobile: "9000011111" },
    { name: "Rahul", email: "rahul@gmail.com", mobile: "9012345678" },
    { name: "Aman", email: "aman@gmail.com", mobile: "9023456789" },
    { name: "Sohail", email: "sohail@gmail.com", mobile: "9034567890" },
    { name: "Imran", email: "imran@gmail.com", mobile: "9045678901" },
    { name: "Karan", email: "karan@gmail.com", mobile: "9056789012" },
    { name: "Rohit", email: "rohit@gmail.com", mobile: "9067890123" },
    { name: "Sameer", email: "sameer@gmail.com", mobile: "9078901234" },
  ];

  // 🔍 Search filter
  const filteredCustomers = customers.filter((cust) =>
    cust.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container ">
      <div className="card shadow-lg">

        {/* 🔥 Header */}
        <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
          <h5 className="mb-0">View Customers</h5>

          {/* 🔍 Search with icon */}
          <div className="input-group w-50 ">
            <span className="input-group-text bg-white">
              <FaSearch />
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Search customer..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* 📊 Scrollable Table */}
        <div className="card-body p-0 mt-2">
          <div style={{ maxHeight: "400px", overflowY: "auto" }}>
            <Table columns={columns} data={filteredCustomers} />
          </div>
        </div>

      </div>
    </div>
  );
};

export default View_customer;

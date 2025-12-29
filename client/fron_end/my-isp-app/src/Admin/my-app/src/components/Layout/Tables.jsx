import React from "react";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";

const Table = ({ columns, data, onView, onEdit, onDelete }) => {
  return (
    <div className="table-responsive shadow rounded">
      <table className="table table-hover table-bordered align-middle">
        <thead className="table-dark text-center">
          <tr>
            {columns.map((col, index) => (
              <th key={index}>{col.header}</th>
            ))}
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {data.length > 0 ? (
            data.map((row, index) => (
              <tr key={index}>
                {columns.map((col, i) => (
                  <td key={i}>{row[col.field]}</td>
                ))}

                {/* 🔘 Action Buttons */}
                <td className="text-center">
                  <button
                    className="btn btn-sm btn-info me-2"
                    onClick={() => onView(row)}
                  >
                    <FaEye />
                  </button>

                  <button
                    className="btn btn-sm btn-warning me-2"
                    onClick={() => onEdit(row)}
                  >
                    <FaEdit />
                  </button>

                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => onDelete(row)}
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length + 1} className="text-center text-muted">
                No Data Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;

import React from "react";
 

/* Capitalize each word (UI only) */
const capitalizeWords = (text = "") =>
  text
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase());

const Table_State = ({ statesList = [], onEdit, onDelete }) => {
  return (
    <div className="container mt-4">
      <h5 className="mb-3">State List</h5>

      <div className="table-responsive">
        <table className="table table-bordered table-striped align-middle">
          <thead className="table-dark">
            <tr>
              <th style={{ width: "5%" }}>#</th>
              <th style={{ width: "70%" }}>State Name</th>
              <th style={{ width: "25%" }}>Action</th>
            </tr>
          </thead>

          <tbody>
            {statesList.length > 0 ? (
              statesList.map((item, index) => (
                <tr key={item._id}>
                  <td>{index + 1}</td>
                  <td>{capitalizeWords(item.state)}</td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-sm btn-warning me-2"
                      onClick={() => onEdit(item)}
                      title="Edit"
                    >
                      ✏️
                    </button>
                    <button
                      type="button"
                      className="btn btn-sm btn-danger"
                      onClick={() => onDelete(item._id)}
                      title="Delete"
                    >
                      ❌
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center text-muted">
                  No states found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table_State;

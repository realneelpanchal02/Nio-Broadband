import React, { useEffect, useState, useCallback } from "react";
import Table_State from "./Table_State";

const State = () => {
  const [loading, setLoading] = useState(true);
  const [btnLoading, setBtnLoading] = useState(false);

  const [stateName, setStateName] = useState("");
  const [statesList, setStatesList] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const [toast, setToast] = useState({
    show: false,
    type: "success",
    message: "",
  });

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 700);
    return () => clearTimeout(timer);
  }, []);

  const showToast = (type, message) => {
    setToast({ show: true, type, message });
    setTimeout(() => {
      setToast({ show: false, type: "", message: "" });
    }, 3000);
  };

  const fetchStates = useCallback(async () => {
    try {
      const res = await fetch("http://localhost:8000/state");
      const data = await res.json();
      setStatesList(data);
    } catch (err) {
      console.error(err);
      showToast("danger", "Failed to fetch states");
    }
  }, []);

  useEffect(() => {
    fetchStates();
  }, [fetchStates]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmed = stateName.trim();
    if (!trimmed) {
      showToast("warning", "State name is required");
      return;
    }

    try {
      setBtnLoading(true);
      let res;
      if (editingId) {
        res = await fetch(`http://localhost:8000/state/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ state: trimmed }),
        });
      } else {
        res = await fetch("http://localhost:8000/state", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ state: trimmed }),
        });
      }

      const result = await res.json();

      setTimeout(() => {
        setBtnLoading(false);
        if (!res.ok || result.success === false) {
          showToast("danger", result.message || "Operation failed");
          return;
        }

        showToast(
          "success",
          editingId
            ? "State updated successfully"
            : "State added successfully"
        );

        setStateName("");
        setEditingId(null);
        setShowForm(false); // hide form
        fetchStates();
      }, 500);
    } catch (err) {
      console.error(err);
      setBtnLoading(false);
      showToast("danger", "Server error");
    }
  };

  const handleEdit = (item) => {
    setStateName(item.state);
    setEditingId(item._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this state?")) return;
    try {
      const res = await fetch(`http://localhost:8000/state/${id}`, {
        method: "DELETE",
      });
      const result = await res.json();
      if (!res.ok || result.success === false) {
        showToast("danger", result.message || "Delete failed");
        return;
      }
      showToast("success", "State deleted successfully");
      fetchStates();
    } catch (err) {
      console.error(err);
      showToast("danger", "Server error");
    }
  };

  return (
    <>
      {/* 🔔 TOAST */}
      {toast.show && (
        <div
          className="position-fixed top-0 start-50 translate-middle-x mt-3"
          style={{ zIndex: 9999 }}
        >
          <div className={`toast show text-bg-${toast.type} shadow border-0`}>
            <div className="toast-body fw-semibold text-center">
              {toast.message}
            </div>
          </div>
        </div>
      )}

      {loading ? (
        <div className="vh-100 d-flex justify-content-center align-items-center">
          <div className="text-center">
            <div className="spinner-border text-primary mb-3"></div>
            <div className="fw-semibold fs-5">Loading States...</div>
          </div>
        </div>
      ) : (
        <div className="container mt-4">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4>State Management</h4>
            <button
              className="btn btn-success"
              onClick={() => setShowForm((prev) => !prev)}
            >
              {showForm ? "Close Form" : "Add New State"}
            </button>
          </div>

          {/* 📦 COLLAPSIBLE FORM */}
          {showForm && (
            <div
              className="mb-4 mx-auto"
              style={{ maxWidth: "500px", transition: "all 0.5s ease" }}
            >
              <div className="card border-0 shadow-lg rounded-4">
                <div className="card-header bg-dark text-white text-center py-3 rounded-top-4">
                  <h5 className="mb-1 fw-bold">
                    🗺 {editingId ? "Update State" : "Add New State"}
                  </h5>
                  <small className="text-light opacity-75">
                    Manage states easily
                  </small>
                </div>

                <div className="card-body p-3">
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label className="form-label fw-semibold fs-6">
                        State Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Eg: Maharashtra"
                        value={stateName}
                        onChange={(e) => setStateName(e.target.value)}
                      />
                    </div>

                    <button
                      type="submit"
                      className="btn btn-primary w-100 fw-semibold"
                      disabled={btnLoading}
                    >
                      {btnLoading
                        ? "Saving..."
                        : editingId
                        ? "Update State"
                        : "Save State"}
                    </button>
                  </form>
                </div>

                <div className="card-footer text-center text-muted">
                  State Management System
                </div>
              </div>
            </div>
          )}

          {/* 📋 TABLE */}
          {!showForm && (
            <Table_State
              statesList={statesList}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          )}
        </div>
      )}
    </>
  );
};

export default State;

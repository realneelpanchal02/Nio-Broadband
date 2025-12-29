import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const Plan_entry = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const editData = location.state?.plans;

  const [statesList, setStatesList] = useState([]);
  const [plans, setPlans] = useState([]);
  const [form, setForm] = useState({ state: "", plan: "" });
  const [toast, setToast] = useState({ show: false, type: "", message: "" });
  const [loading, setLoading] = useState(false);

  const showToast = (type, message) => {
    setToast({ show: true, type, message });
    setTimeout(() => setToast({ show: false }), 2500);
  };

  useEffect(() => {
    const fetchStates = async () => {
      setLoading(true);
      try {
        const res = await fetch("http://localhost:8000/state");
        const data = await res.json();
        setStatesList(data.map((s) => s.state));
      } catch {
        showToast("danger", "State fetch failed");
      }
      setLoading(false);
    };
    fetchStates();
  }, []);

  useEffect(() => {
    const fetchPlans = async () => {
      setLoading(true);
      try {
        const res = await fetch("http://localhost:8000/plans");
        const data = await res.json();
        setPlans(data);
      } catch {
        showToast("danger", "Plan fetch failed");
      }
      setLoading(false);
    };
    fetchPlans();
  }, []);

  useEffect(() => {
    if (editData) {
      setForm({
        state: editData.state || "",
        plan: editData.plan?._id || editData.plan || "",
      });
    }
  }, [editData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.state || !form.plan) {
      showToast("danger", "All fields required");
      return;
    }

    setLoading(true);
    const payload = { state: form.state, plan: form.plan };
    try {
      const url = editData
        ? `http://localhost:8000/plan_entry/${editData._id}`
        : "http://localhost:8000/plan_entry";
      const method = editData ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Request failed");
      await res.json();

      showToast(
        "success",
        editData ? "Updated successfully" : "Added successfully"
      );
      setForm({ state: "", plan: "" });
      setTimeout(() => navigate("/plan_entry_show"), 1200);
    } catch (err) {
      console.error(err);
      showToast("danger", "Operation failed");
    }
    setLoading(false);
  };

  return (
    <div className="d-flex justify-content-center  bg-light mt-2">
      <div
        className="card shadow-lg p-5"
        style={{ width: "500px", borderRadius: "1.2rem" }}
      >
        <div className="text-center mb-4">
          <i className="bi bi-pencil-square fs-1 text-dark"></i>
          <h3 className="mt-2">{editData ? "Update Plan Entry" : "Add Plan Entry"}</h3>
        </div>

        {toast.show && (
          <div className={`alert alert-${toast.type} py-2 text-center`}>
            {toast.message}
          </div>
        )}

        {loading ? (
          <div className="d-flex justify-content-center my-4">
            <div className="spinner-border text-dark" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            {/* STATE */}
            <div className="mb-4">
              <label className="form-label fs-6 fw-semibold">State</label>
              <select
                name="state"
                className="form-select form-select-lg"
                value={form.state}
                onChange={handleChange}
              >
                <option value="">Select State</option>
                {statesList.map((s, i) => (
                  <option key={i} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            {/* PLAN */}
            <div className="mb-4">
              <label className="form-label fs-6 fw-semibold">Plan</label>
              <select
                name="plan"
                className="form-select form-select-lg"
                value={form.plan}
                onChange={handleChange}
              >
                <option value="">Select Plan</option>
                {plans.map((p) => (
                  <option key={p._id} value={p._id}>
                    {p.name} | ₹{p.price} | {p.speed || "-"} | {p.validity || "-"} | {p.discount || "-"}
                  </option>
                ))}
              </select>
            </div>

            <button className="btn btn-dark w-100 py-2 fs-5">
              {editData ? "Update" : "Add"}
            </button>
          </form>
        )}

        <div className="text-center mt-3">
          <small className="text-muted">Admin Panel Style Form</small>
        </div>
      </div>
    </div>
  );
};

export default Plan_entry;

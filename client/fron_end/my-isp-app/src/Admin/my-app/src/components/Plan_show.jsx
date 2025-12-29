import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const Plan_show = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState(null); // For modal
  const navigate = useNavigate();

  const fetchPlans = async () => {
    try {
      const res = await fetch("http://localhost:8000/plans");
      const data = await res.json();
      setPlans(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Backend not reachable", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this plan?")) return;
    await fetch(`http://localhost:8000/plans/${id}`, { method: "DELETE" });
    setPlans((prev) => prev.filter((p) => p._id !== id));
  };

  const handleUpdate = (plan) => {
    navigate("/plan", { state: { plan } });
  };

  const calculateActualPrice = (price, discount) => {
    const p = Number(price) || 0;
    const d = Number(discount) || 0;
    return (p - (p * d) / 100).toFixed(2);
  };

  if (loading) return <h3 className="text-center mt-5">Loading...</h3>;

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="fw-bold">📋 Plans Admin Panel</h3>
        <button 
          className="btn btn-success"
          onClick={() => navigate("/plan")}
        >
          <i className="bi bi-plus-lg"></i> Add New Plan
        </button>
      </div>

      <div className="table-responsive shadow rounded">
        <table className="table table-striped table-hover align-middle">
          <thead className="table-dark text-center">
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Original Price</th>
              <th>Discounted Price</th>
              <th>Speed</th>
              <th>Validity</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {plans.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center">
                  No plans found.
                </td>
              </tr>
            )}
            {plans.map((plan, index) => (
              <tr key={plan._id} className="text-center">
                <td>{index + 1}</td>
                <td>{plan.name}</td>
                <td>₹{plan.price}</td>
                <td>
                  {plan.discount ? (
                    <>₹{calculateActualPrice(plan.price, plan.discount)}</>
                  ) : (
                    <>-</>
                  )}
                </td>
                <td>{plan.speed}</td>
                <td>{plan.validity}</td>
                <td>
                  <button
                    className="btn btn-primary btn-sm me-1"
                    onClick={() => setSelectedPlan(plan)}
                    title="View Plan"
                  >
                    <i className="bi bi-eye"></i>
                  </button>
                  <button
                    className="btn btn-info btn-sm me-1"
                    onClick={() => handleUpdate(plan)}
                    title="Update Plan"
                  >
                    <i className="bi bi-pencil-square"></i>
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(plan._id)}
                    title="Delete Plan"
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for viewing plan */}
     {/* Modal for viewing plan */}
{selectedPlan && (
  <div className="modal d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: 'rgba(0,0,0,0.3)' }}>
    <div className="modal-dialog modal-dialog-centered" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">{selectedPlan.name} Details</h5>
          <button 
            type="button" 
            className="btn-close" 
            onClick={() => setSelectedPlan(null)}
          ></button>
        </div>
        <div className="modal-body">
          <p><strong>Original Price:</strong> ₹{selectedPlan.price}</p>
          <p>
            <strong>Discounted Price:</strong> 
            {selectedPlan.discount ? ` ₹${calculateActualPrice(selectedPlan.price, selectedPlan.discount)}` : ' -'}
          </p>
          <p><strong>Discount:</strong> {selectedPlan.discount ? `${selectedPlan.discount}%` : '-'}</p>
          <p><strong>Speed:</strong> {selectedPlan.speed}</p>
          <p><strong>Validity:</strong> {selectedPlan.validity}</p>
          <p><strong>Created At:</strong> {new Date(selectedPlan.crtedAt).toLocaleString()}</p>
        </div>
        <div className="modal-footer">
          <button 
            type="button" 
            className="btn btn-secondary" 
            onClick={() => setSelectedPlan(null)}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default Plan_show;

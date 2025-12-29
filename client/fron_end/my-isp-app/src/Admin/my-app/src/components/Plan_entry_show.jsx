import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const Plan_entry_show = () => {
  const [plans, setPlans] = useState([]);
  const [viewPlan, setViewPlan] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  /* ================= FETCH ALL PLANS ================= */
  const fetchPlans = async () => {
    try {
      const res = await fetch("http://localhost:8000/plan_entry");
      const data = await res.json();
      setTimeout(() => {
        setPlans(data);
        setLoading(false);
      }, 1000);
    } catch (err) {
      console.error("Failed to fetch plans:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  /* ================= UPDATE ================= */
  const handleUpdate = (item) => {
    navigate("/plan_entry", { state: { plans: item } });
  };

  /* ================= DELETE ================= */
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete?")) return;

    try {
      await fetch(`http://localhost:8000/plan_entry/${id}`, {
        method: "DELETE",
      });
      setLoading(true);
      fetchPlans();
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  /* ================= CALCULATE FINAL PRICE ================= */
  const calculateFinalPrice = (price, discount) => {
    if (!discount) return price;
    if (typeof discount === "string" && discount.includes("%")) {
      const percent = parseFloat(discount.replace("%", ""));
      return price - (price * percent) / 100;
    }
    return price - discount;
  };

  return (
    <div className="container mt-5">
      {/* ================= TOP HEADER ================= */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="text-primary fw-bold">📋 Plans Management</h3>
        <button
          className="btn btn-success"
          onClick={() => navigate("/plan_entry")}
        >
          <i className="bi bi-plus-lg me-1"></i> Top Up / Add New Plan
        </button>
      </div>

      {loading ? (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: "200px" }}
        >
          <div
            className="spinner-border text-primary"
            style={{ width: "4rem", height: "4rem" }}
            role="status"
          >
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <>
          {/* ================= TABLE ================= */}
          <div className="table-responsive shadow-sm">
            <table className="table table-striped table-hover align-middle">
              <thead className="table-dark text-center">
                <tr>
                  <th>Id</th>
                  <th>State</th>
                  <th>Plan Name</th>
                  <th>Price</th>
                  <th>Discount</th>
                  <th>Final Price</th>
                  <th>Speed</th>
                  <th>Validity</th>
                  <th width="180">Actions</th>
                </tr>
              </thead>
              <tbody className="text-center">
                {plans.length === 0 ? (
                  <tr>
                    <td colSpan="9" className="text-muted">
                      No Plans Found
                    </td>
                  </tr>
                ) : (
                  plans.map((item, index) => (
                    <tr key={item._id}>
                      <td>{index + 1}</td>
                      <td>{item.state}</td>
                      <td>{item.plan?.name}</td>
                      <td>
                        <del>₹{item.plan?.price}</del>
                      </td>
                      <td>{item.plan?.discount ?? 0}</td>
                      <td>
                        ₹{calculateFinalPrice(item.plan?.price, item.plan?.discount)}
                      </td>
                      <td>{item.plan?.speed}</td>
                      <td>
                        <span className="badge bg-info text-dark">
                          {item.plan?.validity}
                        </span>
                      </td>
                      <td>
                        <button
                          className="btn btn-sm btn-primary me-2"
                          onClick={() => setViewPlan(item)}
                          title="View Details"
                        >
                          <i className="bi bi-eye"></i>
                        </button>
                        <button
                          className="btn btn-sm btn-warning me-2"
                          onClick={() => handleUpdate(item)}
                          title="Edit Plan"
                        >
                          <i className="bi bi-pencil"></i>
                        </button>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => handleDelete(item._id)}
                          title="Delete Plan"
                        >
                          <i className="bi bi-trash"></i>
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* ================= MODAL POPUP ================= */}
          {viewPlan && (
            <div className="modal d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: 'rgba(0,0,0,0.3)' }}>
              <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">{viewPlan.plan?.name} Details</h5>
                    <button
                      type="button"
                      className="btn-close"
                      onClick={() => setViewPlan(null)}
                    ></button>
                  </div>
                  <div className="modal-body">
                    <div className="table-responsive">
                      <table className="table table-borderless">
                        <tbody>
                          <tr>
                            <th>State:</th>
                            <td>{viewPlan.state}</td>
                          </tr>
                          <tr>
                            <th>Plan Name:</th>
                            <td>{viewPlan.plan?.name}</td>
                          </tr>
                          <tr>
                            <th> Main Price:</th>
                            <td><del>₹{viewPlan.plan?.price}</del></td>
                          </tr>
                          <tr>
                            <th>Discount:</th>
                            <td>{viewPlan.plan?.discount ?? 0}%</td>
                          </tr>
                          <tr>
                            <th>Final Price:</th>
                            <td>₹{calculateFinalPrice(viewPlan.plan?.price, viewPlan.plan?.discount)}</td>
                          </tr>
                          <tr>
                            <th>Speed:</th>
                            <td>{viewPlan.plan?.speed}</td>
                          </tr>
                          <tr>
                            <th>Validity:</th>
                            <td>{viewPlan.plan?.validity}</td>
                          </tr>
                          <tr>
                            <th>Date:</th>
                            <td>{viewPlan.createdAt ? new Date(viewPlan.createdAt).toLocaleString() : viewPlan.crtedAt ? new Date(viewPlan.crtedAt).toLocaleString() : "N/A"}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => setViewPlan(null)}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Plan_entry_show;

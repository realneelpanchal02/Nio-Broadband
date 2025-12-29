import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Plan = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // -----------------------------
  // Form state (WITH DATE)
  // -----------------------------
  const [form, setForm] = useState({
    name: "",
    price: "",
    validity: "",
    discount: "",
    speed: "",
    date: "",
  });

  // -----------------------------
  // Loading & toast
  // -----------------------------
  const [btnLoading, setBtnLoading] = useState(false);
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success",
  });

  // -----------------------------
  // Prefill on EDIT + date fix
  // -----------------------------
  useEffect(() => {
    if (location.state?.plan) {
      const plan = location.state.plan;

      setForm({
        ...plan,
        date: plan.date ? plan.date.split("T")[0] : "",
      });
    } else {
      // ADD MODE → set today date
      setForm((prev) => ({
        ...prev,
        date: new Date().toISOString().split("T")[0],
      }));
    }
  }, [location.state]);

  // -----------------------------
  // Input handler
  // -----------------------------
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // -----------------------------
  // Toast
  // -----------------------------
  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(
      () => setToast((prev) => ({ ...prev, show: false })),
      3000
    );
  };

  // -----------------------------
  // SUBMIT (ADD / UPDATE)
  // -----------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !form.name ||
      !form.price ||
      !form.validity ||
      !form.discount ||
      !form.speed ||
      !form.date
    ) {
      showToast("All fields are required", "warning");
      return;
    }

    const isEdit = Boolean(form._id);
    const url = isEdit
      ? `http://localhost:8000/plans/${form._id}`
      : "http://localhost:8000/plans";
    const method = isEdit ? "PUT" : "POST";

    try {
      setBtnLoading(true);

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const result = await res.json();

      if (!res.ok || result.success === false) {
        showToast(result.message || "Something went wrong", "danger");
        return;
      }

      showToast(
        isEdit ? "Plan Updated Successfully" : "Plan Added Successfully",
        "success"
      );

      navigate("/plan_show");
    } catch (error) {
      console.error(error);
      showToast("Server error", "danger");
    } finally {
      setBtnLoading(false);
    }
  };

  return (
    <>
      {/* Toast */}
      {toast.show && (
        <div
          className="position-fixed top-0 start-50 translate-middle-x mt-3"
          style={{ zIndex: 1055 }}
        >
          <div className={`toast show text-bg-${toast.type} shadow border-0`}>
            <div className="toast-body text-center fw-semibold">
              {toast.message}
            </div>
          </div>
        </div>
      )}

      {/* Form */}
      <div className="container mt-2">
        <div className="row justify-content-center">
          <div className="col-lg-9 col-xl-8">
            <div className="card border-0 shadow-lg rounded-4">
              <div className="card-header bg-dark text-white text-center py-4">
                <h4 className="fw-bold mb-1">
                  {form._id ? "✏️ Edit Plan" : "📦 Create New Internet Plan"}
                </h4>
                <small className="opacity-75">
                  Fill plan details carefully
                </small>
              </div>

              <div className="card-body p-5">
                <form onSubmit={handleSubmit}>
                  <div className="row g-4">

                    <div className="col-md-6">
                      <label className="form-label fw-semibold">Plan Name</label>
                      <input
                        type="text"
                        name="name"
                        className="form-control form-control-lg"
                        value={form.name}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label fw-semibold">Price (₹)</label>
                      <input
                        type="number"
                        name="price"
                        className="form-control form-control-lg"
                        value={form.price}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label fw-semibold">Validity</label>
                      <select
                        name="validity"
                        className="form-select form-select-lg"
                        value={form.validity}
                        onChange={handleChange}
                      >
                        <option value="">Select days</option>
                        <option value="30">30 Days</option>
                        <option value="90">90 Days</option>
                        <option value="180">180 Days</option>
                        <option value="365">365 Days</option>
                      </select>
                    </div>

                    <div className="col-md-6">
                      <label className="form-label fw-semibold">
                        Discount (%)
                      </label>
                      <input
                        type="number"
                        name="discount"
                        className="form-control form-control-lg"
                        value={form.discount}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label fw-semibold">Plan Date</label>
                      <input
                        type="date"
                        name="date"
                        className="form-control form-control-lg"
                        value={form.date}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label fw-semibold">
                        Internet Speed
                      </label>
                      <select
                        name="speed"
                        className="form-select form-select-lg"
                        value={form.speed}
                        onChange={handleChange}
                      >
                        <option value="">Select speed</option>
                        <option value="10 Mbps">10 Mbps</option>
                        <option value="50 Mbps">50 Mbps</option>
                        <option value="100 Mbps">100 Mbps</option>
                        <option value="200 Mbps">200 Mbps</option>
                        <option value="500 Mbps">500 Mbps</option>
                        <option value="1 Gbps">1 Gbps</option>
                      </select>
                    </div>
                  </div>

                  <button
                    className="btn btn-primary btn-lg w-100 mt-5"
                    disabled={btnLoading}
                  >
                    {btnLoading ? (
                      <span className="spinner-border spinner-border-sm me-2" />
                    ) : form._id ? (
                      "Update Plan"
                    ) : (
                      "Save Plan"
                    )}
                  </button>
                </form>
              </div>
            </div>

            <p className="text-center text-muted mt-4">
              Powered by ISP Management System
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Plan;

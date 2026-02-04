import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { formatPrice } from "../utils/format";

export default function Checkout() {
  const { cart, cartTotal, dispatch } = useCart();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    confirmEmail: "",
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  if (cart.length === 0) {
    return (
      <div className="page">
        <div className="empty-state">
          <h2>Nothing to check out</h2>
          <p>Add some tickets to your cart first.</p>
          <Link to="/" className="btn btn-primary">
            Browse Events
          </Link>
        </div>
      </div>
    );
  }

  function validate() {
    const errs = {};
    if (!form.name.trim()) errs.name = "Name is required";
    if (!form.email.trim()) errs.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      errs.email = "Enter a valid email";
    if (form.confirmEmail !== form.email)
      errs.confirmEmail = "Emails do not match";
    return errs;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setSubmitting(true);

    // Simulate processing delay
    setTimeout(() => {
      const orderData = {
        orderId: `TV-${Date.now().toString(36).toUpperCase()}`,
        name: form.name,
        email: form.email,
        items: [...cart],
        subtotal: cartTotal,
        fee: Math.round(cartTotal * 0.1),
        total: cartTotal + Math.round(cartTotal * 0.1),
        date: new Date().toISOString(),
      };

      localStorage.setItem("lastOrder", JSON.stringify(orderData));
      dispatch({ type: "CLEAR_CART" });
      navigate("/confirmation");
    }, 1200);
  }

  const totalWithFee = cartTotal + Math.round(cartTotal * 0.1);

  return (
    <div className="page">
      <Link to="/cart" className="back-link">
        &larr; Back to Cart
      </Link>
      <h1 className="page-title">Checkout</h1>

      <div className="checkout-layout">
        <form className="checkout-form" onSubmit={handleSubmit}>
          <h2>Your Information</h2>

          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              id="name"
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className={errors.name ? "input-error" : ""}
              placeholder="John Doe"
            />
            {errors.name && <span className="error-msg">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className={errors.email ? "input-error" : ""}
              placeholder="john@example.com"
            />
            {errors.email && <span className="error-msg">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="confirmEmail">Confirm Email</label>
            <input
              id="confirmEmail"
              type="email"
              value={form.confirmEmail}
              onChange={(e) =>
                setForm({ ...form, confirmEmail: e.target.value })
              }
              className={errors.confirmEmail ? "input-error" : ""}
              placeholder="john@example.com"
            />
            {errors.confirmEmail && (
              <span className="error-msg">{errors.confirmEmail}</span>
            )}
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-lg"
            disabled={submitting}
          >
            {submitting ? "Processing..." : `Pay ${formatPrice(totalWithFee)}`}
          </button>
        </form>

        <div className="checkout-summary">
          <h3>Order Summary</h3>
          {cart.map((item) => (
            <div
              key={`${item.eventId}-${item.tier}`}
              className="checkout-item"
            >
              <div>
                <strong>{item.eventTitle}</strong>
                <br />
                <small>
                  {item.tier} &times; {item.quantity}
                </small>
              </div>
              <span>{formatPrice(item.price * item.quantity)}</span>
            </div>
          ))}
          <hr />
          <div className="summary-row">
            <span>Subtotal</span>
            <span>{formatPrice(cartTotal)}</span>
          </div>
          <div className="summary-row">
            <span>Service Fee</span>
            <span>{formatPrice(Math.round(cartTotal * 0.1))}</span>
          </div>
          <div className="summary-row summary-total">
            <span>Total</span>
            <span>{formatPrice(totalWithFee)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

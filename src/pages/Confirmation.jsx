import { Link } from "react-router-dom";
import { formatDate, formatPrice } from "../utils/format";

export default function Confirmation() {
  let order;
  try {
    order = JSON.parse(localStorage.getItem("lastOrder"));
  } catch {
    order = null;
  }

  if (!order) {
    return (
      <div className="page">
        <div className="empty-state">
          <h2>No order found</h2>
          <Link to="/" className="btn btn-primary">
            Browse Events
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="confirmation">
        <div className="confirmation-header">
          <span className="confirmation-check">&#10003;</span>
          <h1>Order Confirmed!</h1>
          <p>
            Thank you, <strong>{order.name}</strong>. A confirmation email has
            been sent to <strong>{order.email}</strong>.
          </p>
          <p className="order-id">Order #{order.orderId}</p>
        </div>

        <div className="confirmation-details">
          <h2>Order Details</h2>
          {order.items.map((item) => (
            <div
              key={`${item.eventId}-${item.tier}`}
              className="confirmation-item"
            >
              <div>
                <h3>{item.eventTitle}</h3>
                <p>
                  {item.tier} &middot; {item.quantity}{" "}
                  {item.quantity === 1 ? "ticket" : "tickets"}
                </p>
                <p className="confirmation-item-meta">
                  {formatDate(item.eventDate)} &middot; {item.venue}
                </p>
              </div>
              <span className="confirmation-item-price">
                {formatPrice(item.price * item.quantity)}
              </span>
            </div>
          ))}

          <div className="confirmation-totals">
            <div className="summary-row">
              <span>Subtotal</span>
              <span>{formatPrice(order.subtotal)}</span>
            </div>
            <div className="summary-row">
              <span>Service Fee</span>
              <span>{formatPrice(order.fee)}</span>
            </div>
            <div className="summary-row summary-total">
              <span>Total Charged</span>
              <span>{formatPrice(order.total)}</span>
            </div>
          </div>
        </div>

        <Link to="/" className="btn btn-primary">
          Browse More Events
        </Link>
      </div>
    </div>
  );
}

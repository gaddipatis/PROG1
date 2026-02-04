import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { formatDate, formatPrice } from "../utils/format";

export default function Cart() {
  const { cart, dispatch, cartTotal } = useCart();

  if (cart.length === 0) {
    return (
      <div className="page">
        <div className="empty-state">
          <h2>Your cart is empty</h2>
          <p>Browse events and add some tickets to get started.</p>
          <Link to="/" className="btn btn-primary">
            Browse Events
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <h1 className="page-title">Your Cart</h1>

      <div className="cart-layout">
        <div className="cart-items">
          {cart.map((item) => (
            <div
              key={`${item.eventId}-${item.tier}`}
              className="cart-item"
            >
              <div className="cart-item-info">
                <h3>{item.eventTitle}</h3>
                <p className="cart-item-meta">
                  {item.tier} · {formatDate(item.eventDate)}
                </p>
                <p className="cart-item-venue">{item.venue}</p>
              </div>

              <div className="cart-item-controls">
                <div className="cart-qty">
                  <button
                    className="qty-btn"
                    onClick={() =>
                      dispatch({
                        type: "UPDATE_QUANTITY",
                        payload: {
                          eventId: item.eventId,
                          tier: item.tier,
                          quantity: item.quantity - 1,
                        },
                      })
                    }
                  >
                    &minus;
                  </button>
                  <span className="qty-display">{item.quantity}</span>
                  <button
                    className="qty-btn"
                    onClick={() =>
                      dispatch({
                        type: "UPDATE_QUANTITY",
                        payload: {
                          eventId: item.eventId,
                          tier: item.tier,
                          quantity: item.quantity + 1,
                        },
                      })
                    }
                  >
                    +
                  </button>
                </div>

                <span className="cart-item-price">
                  {formatPrice(item.price * item.quantity)}
                </span>

                <button
                  className="cart-remove"
                  onClick={() =>
                    dispatch({
                      type: "REMOVE_TICKET",
                      payload: {
                        eventId: item.eventId,
                        tier: item.tier,
                      },
                    })
                  }
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <h3>Order Summary</h3>
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
            <span>
              {formatPrice(cartTotal + Math.round(cartTotal * 0.1))}
            </span>
          </div>
          <Link to="/checkout" className="btn btn-primary btn-lg">
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </div>
  );
}

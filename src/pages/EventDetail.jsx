import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import events from "../data/events";
import { useCart } from "../context/CartContext";
import { formatDate, formatTime, formatPrice } from "../utils/format";

export default function EventDetail() {
  const { id } = useParams();
  const event = events.find((e) => e.id === Number(id));
  const { cart, dispatch } = useCart();

  const [selections, setSelections] = useState(
    event ? event.tickets.map(() => 0) : []
  );
  const [added, setAdded] = useState(false);

  if (!event) {
    return (
      <div className="page">
        <div className="empty-state">
          <h2>Event not found</h2>
          <Link to="/" className="btn btn-primary">
            Back to Events
          </Link>
        </div>
      </div>
    );
  }

  function getAvailableForTier(tierName) {
    const ticketInfo = event.tickets.find((t) => t.tier === tierName);
    const inCart = cart.find(
      (item) => item.eventId === event.id && item.tier === tierName
    );
    return ticketInfo.available - (inCart ? inCart.quantity : 0);
  }

  function handleQuantityChange(index, value) {
    const newSelections = [...selections];
    newSelections[index] = Math.max(
      0,
      Math.min(Number(value), getAvailableForTier(event.tickets[index].tier))
    );
    setSelections(newSelections);
    setAdded(false);
  }

  function handleAddToCart() {
    let anyAdded = false;
    selections.forEach((qty, i) => {
      if (qty > 0) {
        dispatch({
          type: "ADD_TICKET",
          payload: {
            eventId: event.id,
            tier: event.tickets[i].tier,
            quantity: qty,
          },
        });
        anyAdded = true;
      }
    });
    if (anyAdded) {
      setSelections(event.tickets.map(() => 0));
      setAdded(true);
      setTimeout(() => setAdded(false), 2500);
    }
  }

  const hasSelections = selections.some((q) => q > 0);
  const selectionTotal = selections.reduce(
    (sum, qty, i) => sum + qty * event.tickets[i].price,
    0
  );

  return (
    <div className="page">
      <Link to="/" className="back-link">
        &larr; All Events
      </Link>

      <div className="event-detail">
        <div className="event-detail-image">
          <img src={event.image} alt={event.title} />
        </div>

        <div className="event-detail-info">
          <span className="event-detail-category">{event.category}</span>
          <h1 className="event-detail-title">{event.title}</h1>
          <div className="event-detail-meta">
            <div className="meta-item">
              <span className="meta-label">Date</span>
              <span className="meta-value">{formatDate(event.date)}</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">Time</span>
              <span className="meta-value">{formatTime(event.date)}</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">Venue</span>
              <span className="meta-value">{event.venue}</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">Location</span>
              <span className="meta-value">{event.city}</span>
            </div>
          </div>
          <p className="event-detail-description">{event.description}</p>
        </div>
      </div>

      <section className="ticket-section">
        <h2>Select Tickets</h2>
        <div className="ticket-tiers">
          {event.tickets.map((ticket, i) => {
            const remaining = getAvailableForTier(ticket.tier);
            return (
              <div key={ticket.tier} className="ticket-tier">
                <div className="tier-info">
                  <h3>{ticket.tier}</h3>
                  <span className="tier-price">{formatPrice(ticket.price)}</span>
                  <span className="tier-availability">
                    {remaining > 0
                      ? `${remaining} remaining`
                      : "Sold Out"}
                  </span>
                </div>
                <div className="tier-controls">
                  <button
                    className="qty-btn"
                    onClick={() =>
                      handleQuantityChange(i, selections[i] - 1)
                    }
                    disabled={selections[i] <= 0}
                  >
                    &minus;
                  </button>
                  <span className="qty-display">{selections[i]}</span>
                  <button
                    className="qty-btn"
                    onClick={() =>
                      handleQuantityChange(i, selections[i] + 1)
                    }
                    disabled={remaining <= 0}
                  >
                    +
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {hasSelections && (
          <div className="ticket-summary">
            <span>Subtotal: {formatPrice(selectionTotal)}</span>
          </div>
        )}

        <button
          className="btn btn-primary btn-lg"
          onClick={handleAddToCart}
          disabled={!hasSelections}
        >
          {added ? "Added to Cart!" : "Add to Cart"}
        </button>
      </section>
    </div>
  );
}

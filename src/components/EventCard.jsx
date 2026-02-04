import { Link } from "react-router-dom";
import { formatDate, formatPrice } from "../utils/format";

export default function EventCard({ event }) {
  const lowestPrice = Math.min(...event.tickets.map((t) => t.price));

  return (
    <Link to={`/event/${event.id}`} className="event-card">
      <div className="event-card-image">
        <img src={event.image} alt={event.title} />
        <span className="event-card-category">{event.category}</span>
      </div>
      <div className="event-card-body">
        <h3 className="event-card-title">{event.title}</h3>
        <p className="event-card-meta">
          <span>{formatDate(event.date)}</span>
          <span className="meta-dot">·</span>
          <span>{event.city}</span>
        </p>
        <p className="event-card-venue">{event.venue}</p>
        <div className="event-card-footer">
          <span className="event-card-price">
            From {formatPrice(lowestPrice)}
          </span>
          <span className="event-card-cta">Get Tickets &rarr;</span>
        </div>
      </div>
    </Link>
  );
}

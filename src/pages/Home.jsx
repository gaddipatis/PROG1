import { useState } from "react";
import events from "../data/events";
import EventCard from "../components/EventCard";

const categories = ["All", ...new Set(events.map((e) => e.category))];

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? events
      : events.filter((e) => e.category === activeCategory);

  return (
    <div className="page">
      <header className="hero">
        <h1>Find Your Next Experience</h1>
        <p>Concerts, sports, theater, and more — all in one place.</p>
      </header>

      <div className="filter-bar">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`filter-btn ${activeCategory === cat ? "active" : ""}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="event-grid">
        {filtered.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
}

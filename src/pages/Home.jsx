import { useState } from "react";
import events from "../data/events";
import EventCard from "../components/EventCard";

const categories = ["All", ...new Set(events.map((e) => e.category))];

const TOP_10_CITIES = [
  "New York, NY",
  "Los Angeles, CA",
  "Chicago, IL",
  "Houston, TX",
  "Phoenix, AZ",
  "Philadelphia, PA",
  "San Antonio, TX",
  "San Diego, CA",
  "Dallas, TX",
  "San Jose, CA",
];

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedCity, setSelectedCity] = useState("");

  const filtered = events.filter((e) => {
    const matchesCategory =
      activeCategory === "All" || e.category === activeCategory;
    const matchesCity = !selectedCity || e.city === selectedCity;
    return matchesCategory && matchesCity;
  });

  return (
    <div className="page">
      <header className="hero">
        <h1>Find Your Next Experience</h1>
        <p>Concerts, sports, theater, and more — all in one place.</p>
      </header>

      <div className="filter-bar">
        <div className="filter-bar-categories">
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

        <select
          className="city-select"
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
        >
          <option value="">All Cities</option>
          {TOP_10_CITIES.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>

      {filtered.length === 0 ? (
        <div className="empty-state">
          <h2>No events found</h2>
          <p>Try changing your filters to see more events.</p>
        </div>
      ) : (
        <div className="event-grid">
          {filtered.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}
    </div>
  );
}

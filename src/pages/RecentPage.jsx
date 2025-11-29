import { useEffect, useState } from "react";
import { getRecentHistory } from "../api/History";

export default function RecentPage() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    getRecentHistory({ days: 3, maxResults: 50 }).then(setItems);
  }, []);

  return (
    <section className="container mt-3">
      <h2>Recently Visited (last 3 days)</h2>
      <ul className="list-group mt-3">
        {items.map((item) => (
          <li key={item.id} className="list-group-item">
            <a href={item.url} target="_blank" rel="noreferrer">
              {item.title || item.url}
            </a>
            <span className="d-block small text-muted">{item.url}</span>
          </li>
        ))}
        {items.length === 0 && <li className="list-group-item">No recent history (or permission not granted).</li>}
      </ul>
    </section>
  );
}

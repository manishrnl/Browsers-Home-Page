import { useEffect, useState } from "react";
import { getTopSites } from "../api/TopSites";

export default function MostVisitedPage() {
  const [sites, setSites] = useState([]);

  useEffect(() => {
    getTopSites().then(setSites);
  }, []);

  return (
    <section className="container mt-3">
      <h2>Most Visited</h2>
      <div className="row mt-3">
        {sites.map((site) => (
          <div key={site.url} className="col-6 col-md-4 col-lg-3 mb-3">
            <a
              href={site.url}
              target="_blank"
              rel="noreferrer"
              className="card text-decoration-none"
            >
              <div className="card-body">
                <h6 className="card-title text-truncate">{site.title || site.url}</h6>
                <p className="card-text small text-muted text-truncate">{site.url}</p>
              </div>
            </a>
          </div>
        ))}
        {sites.length === 0 && <p>No top sites (or permission not granted).</p>}
      </div>
    </section>
  );
}

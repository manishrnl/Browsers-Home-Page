// src/pages/HomePage.js
import React, { useState, useEffect } from "react";
import {
  getMostVisitedSites,
  getContinueTabs,
  getReadingHubItems,
  getPrivacyStats,
  togglePrivacyMode,
} from "../api/BrowserData";

// Helper to safely open user input as URL / search
function openUserInput(value) {
  if (!value.trim()) return;

  let url = value.trim();

  const looksLikeUrl = url.includes(".") || url.startsWith("http");
  if (looksLikeUrl) {
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      url = "https://" + url;
    }
    window.open(url, "_blank", "noopener,noreferrer");
  } else {
    const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(
      url
    )}`;
    window.open(searchUrl, "_blank", "noopener,noreferrer");
  }
}

// Focus timer: 25 minutes (1500 seconds)
const FOCUS_DURATION = 25 * 60;

export default function HomePage() {
  const [topSearch, setTopSearch] = useState("");
  const [startSearch, setStartSearch] = useState("");

  const [mostVisitedSites, setMostVisitedSites] = useState([]);
  const [continueTabs, setContinueTabs] = useState([]);
  const [readingHubItems, setReadingHubItems] = useState([]);

  const [privacyStats, setPrivacyStats] = useState({
    enabled: true,
    trackersBlocked: 0,
    adsBlocked: 0,
    timeSavedMinutes: 0,
  });

  // Loading state (simple)
  const [loading, setLoading] = useState(true);

  // Focus timer state
  const [secondsLeft, setSecondsLeft] = useState(FOCUS_DURATION);
  const [isRunning, setIsRunning] = useState(false);

  // -------- Load data from API / browser storage --------
  useEffect(() => {
    let isMounted = true;

    async function loadData() {
      try {
        const [
          mvSites,
          contTabs,
          rhItems,
          pStats,
        ] = await Promise.all([
          getMostVisitedSites(),
          getContinueTabs(),
          getReadingHubItems(),
          getPrivacyStats(),
        ]);

        if (!isMounted) return;

        setMostVisitedSites(Array.isArray(mvSites) ? mvSites : []);
        setContinueTabs(Array.isArray(contTabs) ? contTabs : []);
        setReadingHubItems(Array.isArray(rhItems) ? rhItems : []);
        setPrivacyStats(
          pStats || {
            enabled: true,
            trackersBlocked: 0,
            adsBlocked: 0,
            timeSavedMinutes: 0,
          }
        );
      } catch (err) {
        console.error("Failed to load browser data:", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadData();

    return () => {
      isMounted = false;
    };
  }, []);

  // -------- Focus timer effect --------
  useEffect(() => {
    if (!isRunning) return;

    const intervalId = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(intervalId);
          setIsRunning(false);
          alert("Focus session complete! 🎉");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [isRunning]);

  const timerMinutes = String(Math.floor(secondsLeft / 60)).padStart(2, "0");
  const timerSeconds = String(secondsLeft % 60).padStart(2, "0");

  const handleTopSearchSubmit = (e) => {
    e.preventDefault();
    openUserInput(topSearch);
  };

  const handleStartSearchSubmit = (e) => {
    e.preventDefault();
    openUserInput(startSearch);
  };

  const handleFocusStartPause = () => {
    if (secondsLeft === 0) {
      setSecondsLeft(FOCUS_DURATION);
    }
    setIsRunning((prev) => !prev);
  };

  const handleFocusReset = () => {
    setIsRunning(false);
    setSecondsLeft(FOCUS_DURATION);
  };

  const handleSendTab = (deviceName) => {
    alert(`Pretending to send current tab to: ${deviceName}`);
  };

  const handleTogglePrivacy = async () => {
    try {
      const updatedEnabled = await togglePrivacyMode(privacyStats.enabled);
      setPrivacyStats((prev) => ({
        ...prev,
        enabled: updatedEnabled,
      }));
    } catch (err) {
      console.error("Failed to toggle privacy mode:", err);
    }
  };

  return (
    <div className="container-fluid py-4">
      {/* Top search bar (like browser URL bar) */}
       <div className="row mb-4">
        <div className="col-12 col-lg-8 mx-auto">
          <form
            className="input-group shadow-sm"
            onSubmit={handleTopSearchSubmit}
          >
            <span className="input-group-text bg-white border-end-0">
              🔍
            </span>
            <input
              type="text"
              className="form-control border-start-0"
              placeholder="Search or enter URL"
              value={topSearch}
              onChange={(e) => setTopSearch(e.target.value)}
            />
            <button className="btn btn-primary" type="submit">
              Go
            </button>
          </form>
        </div>
      </div> 

      {loading && (
        <div className="text-center mb-3">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading browser data...</span>
          </div>
        </div>
      )}

      <div className="row g-4">
        {/* Start Card */}
        <section className="col-12 col-lg-5">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <h5 className="card-title mb-3">Start</h5>

              <form className="mb-3" onSubmit={handleStartSearchSubmit}>
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search or type a URL"
                    value={startSearch}
                    onChange={(e) => setStartSearch(e.target.value)}
                  />
                  <button className="btn btn-outline-primary" type="submit">
                    Open
                  </button>
                </div>
              </form>

              <div className="d-flex flex-wrap gap-2">
                <button
                  type="button"
                  className="btn btn-sm btn-outline-secondary"
                  onClick={() => alert("New tab group created (demo).")}
                >
                  New tab group
                </button>
                <button
                  type="button"
                  className="btn btn-sm btn-outline-secondary"
                  onClick={() =>
                    alert("Opening last session tabs (demo placeholder).")
                  }
                >
                  Open last session
                </button>
                <button
                  type="button"
                  className="btn btn-sm btn-outline-secondary"
                  onClick={() =>
                    alert("Showing reading list (demo placeholder).")
                  }
                >
                  Reading list
                </button>
                <button
                  type="button"
                  className="btn btn-sm btn-outline-secondary"
                  onClick={() =>
                    window.open("https://duckduckgo.com/", "_blank")
                  }
                >
                  Private window
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Most Visited */}
        <section className="col-12 col-sm-6 col-lg-3">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <h5 className="card-title mb-3">Most Visited</h5>
              {mostVisitedSites.length === 0 ? (
                <p className="text-muted small mb-0">
                  No most-visited data available yet.
                </p>
              ) : (
                <div className="row g-3">
                  {mostVisitedSites.map((site) => (
                    <div className="col-4" key={site.id || site.url}>
                      <button
                        type="button"
                        className="btn w-100 h-100 border rounded-3 d-flex flex-column justify-content-center align-items-center text-truncate"
                        onClick={() =>
                          window.open(
                            site.url,
                            "_blank",
                            "noopener,noreferrer"
                          )
                        }
                        title={site.name || site.url}
                      >
                        <div className="fw-bold mb-1">
                          {(site.name || site.url || "?").charAt(0)}
                        </div>
                        <small className="text-muted text-truncate w-100">
                          {site.name || site.url}
                        </small>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Continue Where You Left Off */}
        <section className="col-12 col-lg-4">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <h5 className="card-title mb-3">Continue Where You Left Off</h5>
              {continueTabs.length === 0 ? (
                <p className="text-muted small mb-0">
                  No recent tabs available.
                </p>
              ) : (
                <div className="d-flex flex-row flex-nowrap overflow-auto gap-3">
                  {continueTabs.map((tab) => (
                    <button
                      key={tab.id || tab.url}
                      type="button"
                      className="btn btn-light border rounded-3 px-3 py-2 text-start flex-shrink-0"
                      style={{ minWidth: "150px" }}
                      onClick={() =>
                        window.open(
                          tab.url,
                          "_blank",
                          "noopener,noreferrer"
                        )
                      }
                    >
                      <div className="fw-semibold text-truncate">
                        {tab.title || tab.url}
                      </div>
                      <small className="text-muted text-truncate d-block">
                        {tab.url}
                      </small>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Today Overview + Focus Timer */}
        <section className="col-12 col-lg-4">
          <div className="card shadow-sm h-100">
            <div className="card-body d-flex flex-column">
              <h5 className="card-title mb-3">Today Overview</h5>

              <div className="mb-3 p-3 border rounded-3 bg-light">
                <strong>Tasks</strong>
                <ul className="mb-0 small">
                  <li>Review pull requests</li>
                  <li>Finish dashboard layout</li>
                  <li>Read 2 articles from Reading Hub</li>
                </ul>
              </div>

              <div className="mb-3 p-3 border rounded-3 bg-light">
                <strong>Focus Timer</strong>
                <div className="d-flex align-items-baseline justify-content-between mt-2">
                  <div className="display-6 mb-0">
                    {timerMinutes}:{timerSeconds}
                  </div>
                  <div className="btn-group">
                    <button
                      type="button"
                      className="btn btn-sm btn-primary"
                      onClick={handleFocusStartPause}
                    >
                      {isRunning ? "Pause" : "Start"}
                    </button>
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-secondary"
                      onClick={handleFocusReset}
                    >
                      Reset
                    </button>
                  </div>
                </div>
                <small className="text-muted">
                  Default session: 25 minutes. Adjust in settings if you want.
                </small>
              </div>

              <button
                type="button"
                className="btn btn-outline-primary mt-auto"
                onClick={handleFocusStartPause}
              >
                {isRunning ? "Pause Focus Session" : "Start Focus Session"}
              </button>
            </div>
          </div>
        </section>

        {/* Privacy & Security */}
        <section className="col-12 col-sm-6 col-lg-3">
          <div className="card shadow-sm h-100">
            <div className="card-body d-flex flex-column">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <h5 className="card-title mb-0">Privacy &amp; Security</h5>
                <span
                  className={`badge ${
                    privacyStats.enabled ? "bg-success" : "bg-secondary"
                  }`}
                >
                  {privacyStats.enabled ? "On" : "Off"}
                </span>
              </div>

              <ul className="list-unstyled small mb-3">
                <li>
                  Trackers blocked:{" "}
                  <strong>
                    {privacyStats.enabled
                      ? privacyStats.trackersBlocked
                      : "0 (disabled)"}
                  </strong>
                </li>
                <li>
                  Ads blocked:{" "}
                  <strong>
                    {privacyStats.enabled
                      ? privacyStats.adsBlocked
                      : "0 (disabled)"}
                  </strong>
                </li>
                <li>
                  Time saved:{" "}
                  <strong>
                    {privacyStats.enabled
                      ? `${privacyStats.timeSavedMinutes} min`
                      : "0 min (disabled)"}
                  </strong>
                </li>
              </ul>

              <button
                type="button"
                className="btn btn-outline-danger mt-auto"
                onClick={handleTogglePrivacy}
              >
                {privacyStats.enabled
                  ? "Disable Privacy Mode"
                  : "Enable Privacy Mode"}
              </button>
            </div>
          </div>
        </section>

        {/* Reading Hub */}
        <section className="col-12 col-lg-5">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <h5 className="card-title mb-3">Reading Hub</h5>
              {readingHubItems.length === 0 ? (
                <p className="text-muted small mb-0">
                  No reading items yet. Save some pages from your browser / API.
                </p>
              ) : (
                readingHubItems.map((item) => (
                  <button
                    key={item.id || item.url}
                    type="button"
                    className="btn w-100 text-start mb-2 border rounded-3 bg-light"
                    onClick={() =>
                      window.open(
                        item.url,
                        "_blank",
                        "noopener,noreferrer"
                      )
                    }
                  >
                    <div className="fw-semibold">
                      {item.title || item.url}
                    </div>
                    <small className="text-muted text-truncate d-block">
                      {item.url}
                    </small>
                  </button>
                ))
              )}
            </div>
          </div>
        </section>

        {/* Devices & Sync */}
        <section className="col-12 col-sm-6 col-lg-3">
          <div className="card shadow-sm h-100">
            <div className="card-body d-flex flex-column">
              <h5 className="card-title mb-3">Devices &amp; Sync</h5>
              <div className="small mb-3">
                <button
                  type="button"
                  className="btn btn-light border w-100 mb-2 text-start"
                  onClick={() => handleSendTab("Phone")}
                >
                  📱 Phone — <span className="text-primary">Send Tab</span>
                </button>
                <button
                  type="button"
                  className="btn btn-light border w-100 mb-2 text-start"
                  onClick={() => handleSendTab("Laptop")}
                >
                  💻 Laptop — <span className="text-primary">Send Tab</span>
                </button>
                <button
                  type="button"
                  className="btn btn-light border w-100 text-start"
                  onClick={() => alert("Desktop already active (demo).")}
                >
                  🖥️ Desktop — <span className="text-success">Active</span>
                </button>
              </div>
              <small className="text-muted mt-auto">
                Real sync would be handled via your backend / browser account.
              </small>
            </div>
          </div>
        </section>

        {/* Widgets */}
        <section className="col-12 col-lg-4">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <h5 className="card-title mb-3">Widgets</h5>
              <div className="row g-3">
                <div className="col-12 col-sm-4">
                  <div className="border rounded-3 p-3 h-100">
                    <div className="small text-muted">Weather</div>
                    <div className="fw-semibold mt-1">24°C</div>
                    <small>Partly cloudy</small>
                  </div>
                </div>
                <div className="col-12 col-sm-4">
                  <div className="border rounded-3 p-3 h-100">
                    <div className="small text-muted">Time</div>
                    <div className="fw-semibold mt-1">
                      {new Date().toLocaleTimeString()}
                    </div>
                    <small>{new Date().toLocaleDateString()}</small>
                  </div>
                </div>
                <div className="col-12 col-sm-4">
                  <div className="border rounded-3 p-3 h-100">
                    <div className="small text-muted">Quick Note</div>
                    <small className="text-muted">
                      Hook this up to localStorage or your API to save notes.
                    </small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

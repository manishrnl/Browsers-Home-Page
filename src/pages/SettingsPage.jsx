// src/pages/SettingsPage.js
import React from "react";

export default function SettingsPage() {
  return (
    <div className="container">
      <h3 className="mb-3">Settings</h3>

      <form className="row g-3">
        <div className="col-12 col-md-6">
          <label className="form-label">Default Search Engine</label>
          <select className="form-select">
            <option>Google</option>
            <option>Bing</option>
            <option>DuckDuckGo</option>
          </select>
        </div>

        <div className="col-12 col-md-6">
          <label className="form-label">Homepage</label>
          <input
            className="form-control"
            placeholder="https://example.com"
            defaultValue="https://www.google.com"
          />
        </div>

        <div className="col-12">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="startup"
              defaultChecked
            />
            <label htmlFor="startup" className="form-check-label">
              Open previous tabs on startup
            </label>
          </div>
        </div>

        <div className="col-12">
          <button className="btn btn-primary">Save Settings</button>
        </div>
      </form>
    </div>
  );
}

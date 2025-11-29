// src/pages/PrivacyPage.js
import React from "react";

export default function PrivacyPage() {
  return (
    <div className="container">
      <h3 className="mb-3">Privacy & Security</h3>
      <p className="text-muted">
        Configure how Ulaa handles tracking, cookies and privacy.
      </p>

      <div className="mb-3">
        <h5>Tracking Protection</h5>
        <div className="btn-group">
          <button className="btn btn-outline-primary active">Standard</button>
          <button className="btn btn-outline-primary">Strict</button>
          <button className="btn btn-outline-primary">Custom</button>
        </div>
      </div>

      <div className="mb-3">
        <h5>Cookies</h5>
        <div className="form-check">
          <input className="form-check-input" type="checkbox" id="thirdparty" />
          <label htmlFor="thirdparty" className="form-check-label">
            Block third-party cookies
          </label>
        </div>
        <div className="form-check">
          <input className="form-check-input" type="checkbox" id="remember" />
          <label htmlFor="remember" className="form-check-label">
            Clear cookies on exit
          </label>
        </div>
      </div>

      <button className="btn btn-danger">Clear Browsing Data</button>
    </div>
  );
}

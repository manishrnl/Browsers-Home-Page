// src/pages/WorkspacesPage.js
import React from "react";

export default function WorkspacesPage() {
  return (
    <div className="container">
      <h3 className="mb-3">Workspaces</h3>
      <p className="text-muted">
        Manage different workspaces (e.g., Work, Personal, Study).
      </p>
      <div className="row g-3">
        {["Work", "Personal", "Research"].map((name, idx) => (
          <div className="col-12 col-md-4" key={idx}>
            <div className="card h-100">
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{name} Workspace</h5>
                <p className="card-text small text-muted flex-grow-1">
                  Tabs, sessions and tools grouped for {name.toLowerCase()}.
                </p>
                <button className="btn btn-primary mt-2">Open Workspace</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

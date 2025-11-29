// src/pages/ExtensionsPage.js
import React from "react";

const extensions = [
  { name: "Ad Blocker", status: "Enabled" },
  { name: "Password Manager", status: "Enabled" },
  { name: "Dark Reader", status: "Disabled" },
];

export default function ExtensionsPage() {
  return (
    <div className="container">
      <h3 className="mb-3">Extensions</h3>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Extension</th>
            <th>Status</th>
            <th>Toggle</th>
          </tr>
        </thead>
        <tbody>
          {extensions.map((ext, idx) => (
            <tr key={idx}>
              <td>{ext.name}</td>
              <td>{ext.status}</td>
              <td>
                <button className="btn btn-sm btn-outline-primary">
                  Toggle
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// src/App.js
import React, { useState } from "react";
import { NavLink, Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import WorkspacesPage from "./pages/WorkspacesPage";
import BookmarksPage from "./pages/BookmarksPage";
import FocusModePage from "./pages/FocusModePage";
import ExtensionsPage from "./pages/ExtensionsPage";
import SettingsPage from "./pages/SettingsPage";
import PrivacyPage from "./pages/PrivacyPage";

// NEW: provider that exposes bookmarks / mostVisited / recentHistory
import { ChromeDataProvider } from "./chrome/ChromeDataContext";

export default function App() {
  const [dark, setDark] = useState(false);

  const themeClass = dark ? "bg-dark text-light" : "bg-light text-dark";

  return (
    <ChromeDataProvider>
      <div className={themeClass} style={{ minHeight: "100vh" }}>
        <div className="container-fluid">
          <div className="row flex-nowrap">
            {/* Sidebar */}
            <aside
              className={`col-12 col-md-3 col-lg-2 border-end ${
                dark ? "border-secondary" : "border-light"
              } py-3`}
            >
              <div className="d-flex flex-column justify-content-between h-100">
                {/* Profile */}
                <div>
                  <div className="d-flex align-items-center mb-4">
                    <div
                      style={{
                        width: 48,
                        height: 48,
                        borderRadius: 16,
                        background:
                          "linear-gradient(135deg, rgba(111,66,193,1) 0%, rgba(32,201,151,1) 100%)",
                      }}
                      className="me-3"
                    ></div>
                    <div>
                      <div className="fw-semibold">Alex</div>
                      <div className="small opacity-75">Work Profile</div>
                    </div>
                  </div>

                  {/* Nav links */}
                  <nav className="nav flex-column gap-2">
                    <NavLink
                      to="/"
                      end
                      className={({ isActive }) =>
                        "btn text-start mb-1 " +
                        (isActive
                          ? dark
                            ? "btn-light text-dark"
                            : "btn-primary text-white"
                          : dark
                          ? "btn-outline-light"
                          : "btn-outline-secondary")
                      }
                    >
                      🏠 Home
                    </NavLink>

                    <NavLink
                      to="/workspaces"
                      className={({ isActive }) =>
                        "btn text-start mb-1 " +
                        (isActive
                          ? dark
                            ? "btn-light text-dark"
                            : "btn-primary text-white"
                          : dark
                          ? "btn-outline-light"
                          : "btn-outline-secondary")
                      }
                    >
                      📁 Workspaces
                    </NavLink>

                    <NavLink
                      to="/bookmarks"
                      className={({ isActive }) =>
                        "btn text-start mb-1 " +
                        (isActive
                          ? dark
                            ? "btn-light text-dark"
                            : "btn-primary text-white"
                          : dark
                          ? "btn-outline-light"
                          : "btn-outline-secondary")
                      }
                    >
                      ⭐ Bookmarks
                    </NavLink>

                    <NavLink
                      to="/focus"
                      className={({ isActive }) =>
                        "btn text-start mb-1 " +
                        (isActive
                          ? dark
                            ? "btn-light text-dark"
                            : "btn-primary text-white"
                          : dark
                          ? "btn-outline-light"
                          : "btn-outline-secondary")
                      }
                    >
                      ⏱️ Focus Mode
                    </NavLink>

                    <NavLink
                      to="/extensions"
                      className={({ isActive }) =>
                        "btn text-start mb-1 " +
                        (isActive
                          ? dark
                            ? "btn-light text-dark"
                            : "btn-primary text-white"
                          : dark
                          ? "btn-outline-light"
                          : "btn-outline-secondary")
                      }
                    >
                      🧱 Extensions
                    </NavLink>
                  </nav>
                </div>

                {/* Bottom links */}
                <div className="mt-4">
                  <NavLink
                    to="/settings"
                    className={({ isActive }) =>
                      "btn w-100 text-start mb-2 " +
                      (isActive
                        ? dark
                          ? "btn-light text-dark"
                          : "btn-primary text-white"
                        : dark
                        ? "btn-outline-light"
                        : "btn-outline-secondary")
                    }
                  >
                    ⚙️ Settings
                  </NavLink>

                  <NavLink
                    to="/privacy"
                    className={({ isActive }) =>
                      "btn w-100 text-start " +
                      (isActive
                        ? dark
                          ? "btn-light text-dark"
                          : "btn-primary text-white"
                        : dark
                        ? "btn-outline-light"
                        : "btn-outline-secondary")
                    }
                  >
                    🛡️ Privacy
                  </NavLink>
                </div>
              </div>
            </aside>

            {/* Main area */}
            <div
              className="col py-3 d-flex flex-column"
              style={{ minHeight: "100vh" }}
            >
              {/* Top bar */}
              <header
                className={
                  "d-flex align-items-center justify-content-between px-3 py-2 mb-3 rounded-3 shadow-sm " +
                  (dark ? "bg-secondary" : "bg-white")
                }
              >
                <div className="fs-4 fw-bold">Ulaa</div>

                <input
                  className={
                    "form-control mx-3 " +
                    (dark
                      ? "bg-dark text-light border-secondary"
                      : "bg-light")
                  }
                  placeholder="Search or enter URL"
                />

                <div className="d-flex align-items-center gap-3 fs-4">
                  <button
                    className={
                      "btn btn-sm " +
                      (dark ? "btn-outline-light" : "btn-outline-secondary")
                    }
                    onClick={() => setDark(!dark)}
                  >
                    🌗
                  </button>
                  <button
                    className={
                      "btn btn-sm " +
                      (dark ? "btn-outline-light" : "btn-outline-secondary")
                    }
                  >
                    🔔
                  </button>
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 12,
                      background:
                        "linear-gradient(135deg, rgba(111,66,193,1) 0%, rgba(32,201,151,1) 100%)",
                    }}
                  ></div>
                </div>
              </header>

              {/* Routed pages */}
              <main className="flex-grow-1">
                <Routes>
                  <Route path="/" element={<HomePage dark={dark} />} />
                  <Route path="/workspaces" element={<WorkspacesPage />} />
                  <Route path="/bookmarks" element={<BookmarksPage />} />
                  <Route path="/focus" element={<FocusModePage />} />
                  <Route path="/extensions" element={<ExtensionsPage />} />
                  <Route path="/settings" element={<SettingsPage />} />
                  <Route path="/privacy" element={<PrivacyPage />} />
                </Routes>
              </main>
            </div>
          </div>
        </div>
      </div>
    </ChromeDataProvider>
  );
}

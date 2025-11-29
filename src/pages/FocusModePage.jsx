// src/pages/FocusModePage.js
import React, { useState, useEffect } from "react";

export default function FocusModePage() {
  const [seconds, setSeconds] = useState(25 * 60);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      setSeconds((s) => (s > 0 ? s - 1 : 0));
    }, 1000);
    return () => clearInterval(id);
  }, [running]);

  const format = (s) => {
    const m = Math.floor(s / 60);
    const r = s % 60;
    return `${m.toString().padStart(2, "0")}:${r.toString().padStart(2, "0")}`;
  };

  return (
    <div className="container text-center">
      <h3 className="mb-3">Focus Mode</h3>
      <p className="text-muted">
        Simple Pomodoro-style focus timer (25 minutes).
      </p>

      <div className="display-3 mb-3">{format(seconds)}</div>

      <div className="btn-group">
        <button
          className="btn btn-success"
          onClick={() => setRunning(true)}
          disabled={running || seconds === 0}
        >
          Start
        </button>
        <button
          className="btn btn-warning"
          onClick={() => setRunning(false)}
          disabled={!running}
        >
          Pause
        </button>
        <button
          className="btn btn-secondary"
          onClick={() => {
            setRunning(false);
            setSeconds(25 * 60);
          }}
        >
          Reset
        </button>
      </div>
    </div>
  );
}

// src/api/history.js
export function getRecentHistory({ days = 7, maxResults = 50 } = {}) {
  return new Promise((resolve) => {
    if (!chrome.history) {
      resolve([]);
      return;
    }

    const now = Date.now();
    const startTime = now - days * 24 * 60 * 60 * 1000;

    chrome.history.search(
      {
        text: "",
        startTime,
        maxResults
      },
      (results) => {
        resolve(results); // [{ id, url, title, lastVisitTime, visitCount, ... }]
      }
    );
  });
}

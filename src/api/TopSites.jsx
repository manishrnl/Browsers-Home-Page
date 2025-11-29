// src/api/topSites.js
export function getTopSites() {
  return new Promise((resolve) => {
    if (!chrome.topSites) {
      resolve([]);
      return;
    }

    chrome.topSites.get((sites) => {
      resolve(sites); // [{ url, title, ... }]
    });
  });
}

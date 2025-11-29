// src/chrome/ChromeDataContext.js
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const ChromeDataContext = createContext(null);

export function ChromeDataProvider({ children }) {
  const [bookmarks, setBookmarks] = useState([]);
  const [mostVisited, setMostVisited] = useState([]);
  const [recentHistory, setRecentHistory] = useState([]);

  useEffect(() => {
    const api = window.chrome || window.browser;
    if (!api) return; // not running as an extension / no APIs

    // Bookmarks tree
    if (api.bookmarks?.getTree) {
      api.bookmarks.getTree((tree) => {
        setBookmarks(tree || []);
      });
    }

    // Most visited
    if (api.topSites?.get) {
      api.topSites.get((sites) => {
        setMostVisited(sites || []);
      });
    }

    // Recent history (e.g. last 7 days)
    if (api.history?.search) {
      const oneWeekAgo = Date.now() - 1000 * 60 * 60 * 24 * 7;
      api.history.search(
        { text: "", maxResults: 40, startTime: oneWeekAgo },
        (results) => {
          setRecentHistory(results || []);
        }
      );
    }
  }, []);

  const value = { bookmarks, mostVisited, recentHistory };

  return (
    <ChromeDataContext.Provider value={value}>
      {children}
    </ChromeDataContext.Provider>
  );
}

export function useChromeData() {
  return (
    useContext(ChromeDataContext) || {
      bookmarks: [],
      mostVisited: [],
      recentHistory: [],
    }
  );
}

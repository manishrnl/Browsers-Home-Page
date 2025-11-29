// src/api/browserData.js

// Helper: detect extension runtime (Chrome / Firefox)
function getRuntime() {
  if (typeof window === "undefined") return null;
  return window.browser?.runtime || window.chrome?.runtime || null;
}

// Generic message sender to extension (if running as extension)
function sendRuntimeMessage(message) {
  return new Promise((resolve, reject) => {
    const runtime = getRuntime();
    if (!runtime) {
      resolve(null); // Not running as extension
      return;
    }

    try {
      runtime.sendMessage(message, (response) => {
        const lastError = runtime.lastError;
        if (lastError) {
          console.warn("Runtime error:", lastError.message);
          reject(lastError);
        } else {
          resolve(response);
        }
      });
    } catch (err) {
      reject(err);
    }
  });
}

// ---------- MOST VISITED SITES ----------
const LS_MOST_VISITED_KEY = "ulaa_mostVisitedSites";

export async function getMostVisitedSites() {
  // 1. Try extension first
  const fromRuntime = await sendRuntimeMessage({
    type: "GET_MOST_VISITED_SITES",
  }).catch(() => null);

  if (fromRuntime && Array.isArray(fromRuntime.items)) {
    return fromRuntime.items;
  }

  // 2. Fallback to localStorage
  if (typeof window !== "undefined") {
    const raw = window.localStorage.getItem(LS_MOST_VISITED_KEY);
    if (raw) {
      try {
        return JSON.parse(raw);
      } catch (e) {
        console.warn("Failed to parse mostVisitedSites from localStorage", e);
      }
    }
  }

  // 3. Nothing stored
  return [];
}

// ---------- CONTINUE TABS ----------
const LS_CONTINUE_TABS_KEY = "ulaa_continueTabs";

export async function getContinueTabs() {
  const fromRuntime = await sendRuntimeMessage({
    type: "GET_CONTINUE_TABS",
  }).catch(() => null);

  if (fromRuntime && Array.isArray(fromRuntime.items)) {
    return fromRuntime.items;
  }

  if (typeof window !== "undefined") {
    const raw = window.localStorage.getItem(LS_CONTINUE_TABS_KEY);
    if (raw) {
      try {
        return JSON.parse(raw);
      } catch (e) {
        console.warn("Failed to parse continueTabs from localStorage", e);
      }
    }
  }

  return [];
}

// ---------- READING HUB ----------
const LS_READING_HUB_KEY = "ulaa_readingHubItems";

export async function getReadingHubItems() {
  const fromRuntime = await sendRuntimeMessage({
    type: "GET_READING_HUB_ITEMS",
  }).catch(() => null);

  if (fromRuntime && Array.isArray(fromRuntime.items)) {
    return fromRuntime.items;
  }

  if (typeof window !== "undefined") {
    const raw = window.localStorage.getItem(LS_READING_HUB_KEY);
    if (raw) {
      try {
        return JSON.parse(raw);
      } catch (e) {
        console.warn("Failed to parse readingHubItems from localStorage", e);
      }
    }
  }

  return [];
}

// ---------- PRIVACY STATS ----------
const LS_PRIVACY_STATS_KEY = "ulaa_privacyStats";

export async function getPrivacyStats() {
  const fromRuntime = await sendRuntimeMessage({
    type: "GET_PRIVACY_STATS",
  }).catch(() => null);

  if (fromRuntime && fromRuntime.stats) {
    return fromRuntime.stats;
  }

  if (typeof window !== "undefined") {
    const raw = window.localStorage.getItem(LS_PRIVACY_STATS_KEY);
    if (raw) {
      try {
        return JSON.parse(raw);
      } catch (e) {
        console.warn("Failed to parse privacyStats from localStorage", e);
      }
    }
  }

  // Default empty stats (no hardcoded "fake" numbers)
  return {
    enabled: true,
    trackersBlocked: 0,
    adsBlocked: 0,
    timeSavedMinutes: 0,
  };
}

export async function togglePrivacyMode(currentEnabled) {
  const newEnabled = !currentEnabled;

  // Inform extension if available
  await sendRuntimeMessage({
    type: "SET_PRIVACY_MODE",
    enabled: newEnabled,
  }).catch(() => null);

  // Persist a simple structure to localStorage as well
  if (typeof window !== "undefined") {
    const existingRaw = window.localStorage.getItem(LS_PRIVACY_STATS_KEY);
    let existing = {
      enabled: newEnabled,
      trackersBlocked: 0,
      adsBlocked: 0,
      timeSavedMinutes: 0,
    };

    if (existingRaw) {
      try {
        const parsed = JSON.parse(existingRaw);
        existing = { ...existing, ...parsed, enabled: newEnabled };
      } catch (_) {
        // ignore parse error, use default
      }
    }

    window.localStorage.setItem(
      LS_PRIVACY_STATS_KEY,
      JSON.stringify(existing)
    );
  }

  return newEnabled;
}

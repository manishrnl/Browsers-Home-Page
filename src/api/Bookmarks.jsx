// src/api/bookmarks.js
export function getAllBookmarks() {
  return new Promise((resolve) => {
    if (!chrome.bookmarks) {
      resolve([]);
      return;
    }

    chrome.bookmarks.getTree((tree) => {
      resolve(tree);
    });
  });
}

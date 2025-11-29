import { useEffect, useState } from "react";
import { getAllBookmarks } from "../api/Bookmarks";

function flattenBookmarks(nodes, arr = []) {
  nodes.forEach((node) => {
    if (node.url) {
      arr.push(node);
    }
    if (node.children) {
      flattenBookmarks(node.children, arr);
    }
  });
  return arr;
}

export default function BookmarksPage() {
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    getAllBookmarks().then((tree) => {
      setBookmarks(flattenBookmarks(tree));
    });
  }, []);

  return (
    <section className="container mt-3">
      <h2>Bookmarks</h2>
      <ul className="list-group mt-3">
        {bookmarks.map((b) => (
          <li key={b.id} className="list-group-item d-flex justify-content-between align-items-center">
            <a href={b.url} target="_blank" rel="noreferrer">
              {b.title || b.url}
            </a>
          </li>
        ))}
        {bookmarks.length === 0 && <li className="list-group-item">No bookmarks (or permission not granted).</li>}
      </ul>
    </section>
  );
}

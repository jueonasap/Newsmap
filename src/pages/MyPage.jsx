import { getBookmarks, removeBookmark } from "../utils/bookmark";
import { useState, useEffect } from "react";

export default function MyPage() {
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    setBookmarks(getBookmarks());
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>📌 저장한 기사</h2>

      {bookmarks.length === 0 && <p>저장한 기사가 없습니다.</p>}

      {bookmarks.map(b => (
        <div key={b.id} style={{ marginBottom: "12px" }}>
          <a href={b.url} target="_blank" rel="noreferrer">
            {b.title}
          </a>
          <button
            style={{ marginLeft: "10px" }}
            onClick={() => {
              removeBookmark(b.id);
              setBookmarks(getBookmarks());
            }}
          >
            ❌
          </button>
        </div>
      ))}
    </div>
  );
}

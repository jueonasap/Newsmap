import { useState, useRef } from "react";

/* 가짜 뉴스 데이터 */
const NEWS_DATA = {
  Korea: [
    {
      id: 1,
      title: "Korea economy shows signs of recovery",
      summary:
        "Experts report that Korea's economy is stabilizing due to increased exports and government stimulus.",
      press: "Korea Daily",
    },
    {
      id: 2,
      title: "Political debate heats up ahead of election",
      summary:
        "Major parties clash over economic and foreign policies as the election approaches.",
      press: "Seoul Times",
    },
  ],
  USA: [
    {
      id: 3,
      title: "US tech stocks surge amid AI boom",
      summary:
        "AI-related companies lead the stock market rally, raising concerns about a potential bubble.",
      press: "New York Herald",
    },
    {
      id: 4,
      title: "Supreme Court ruling sparks controversy",
      summary:
        "The latest ruling has divided public opinion across political lines.",
      press: "Washington Post",
    },
  ],
};

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [sidebarWidth, setSidebarWidth] = useState(320);
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [selectedArticle, setSelectedArticle] = useState(null);

  const isResizing = useRef(false);

  const startResize = () => {
    isResizing.current = true;
    document.addEventListener("mousemove", resize);
    document.addEventListener("mouseup", stopResize);
  };

  const resize = (e) => {
    if (!isResizing.current) return;
    const newWidth = window.innerWidth - e.clientX;
    if (newWidth >= 260 && newWidth <= 600) {
      setSidebarWidth(newWidth);
    }
  };

  const stopResize = () => {
    isResizing.current = false;
    document.removeEventListener("mousemove", resize);
    document.removeEventListener("mouseup", stopResize);
  };

  const handleRegionClick = (region) => {
    setSelectedRegion(region);
    setSelectedArticle(null);
    setSidebarOpen(true);
  };

  return (
    <div style={styles.app}>
      <header style={styles.header}>
        <h1 style={{ margin: 0 }}>🗺️ Newsmap</h1>
      </header>

      <div style={styles.main}>
        {/* Map */}
        <div style={styles.map}>
          {Object.keys(NEWS_DATA).map((region) => (
            <button
              key={region}
              style={styles.regionBtn}
              onClick={() => handleRegionClick(region)}
            >
              {region}
            </button>
          ))}
        </div>

        {/* Sidebar */}
        {sidebarOpen && (
          <div style={{ ...styles.sidebar, width: sidebarWidth }}>
            <div style={styles.resizer} onMouseDown={startResize} />

            <div style={styles.sidebarHeader}>
              <h3>{selectedRegion || "지역 선택"}</h3>
              <button onClick={() => setSidebarOpen(false)}>✕</button>
            </div>

            <div style={styles.newsList}>
              {selectedRegion &&
                NEWS_DATA[selectedRegion].map((news) => (
                  <div
                    key={news.id}
                    style={styles.newsItem}
                    onClick={() => setSelectedArticle(news)}
                  >
                    {news.title}
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* Article Detail */}
        {selectedArticle && (
          <div style={styles.article}>
            <h2>{selectedArticle.title}</h2>
            <p style={{ color: "#666" }}>
              📰 {selectedArticle.press}
            </p>
            <p>{selectedArticle.summary}</p>

            <button style={styles.factBtn}>
              🔍 팩트체크 보기
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  app: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    fontFamily: "sans-serif",
  },
  header: {
    height: "56px",
    background: "#111",
    color: "white",
    display: "flex",
    alignItems: "center",
    padding: "0 16px",
  },
  main: {
    flex: 1,
    display: "flex",
  },
  map: {
    flex: 1,
    background: "#f2f2f2",
    display: "flex",
    gap: "10px",
    justifyContent: "center",
    alignItems: "center",
  },
  regionBtn: {
    padding: "10px 14px",
    cursor: "pointer",
  },
  sidebar: {
    background: "white",
    borderLeft: "1px solid #ddd",
    position: "relative",
    display: "flex",
    flexDirection: "column",
  },
  resizer: {
    position: "absolute",
    left: 0,
    width: "6px",
    height: "100%",
    cursor: "col-resize",
    background: "#e5e5e5",
  },
  sidebarHeader: {
    padding: "12px",
    borderBottom: "1px solid #eee",
    display: "flex",
    justifyContent: "space-between",
  },
  newsList: {
    padding: "12px",
  },
  newsItem: {
    padding: "10px",
    borderBottom: "1px solid #eee",
    cursor: "pointer",
  },
  article: {
    width: "360px",
    padding: "16px",
    borderLeft: "1px solid #ddd",
    background: "#fafafa",
  },
  factBtn: {
    marginTop: "16px",
    padding: "10px",
    width: "100%",
    cursor: "pointer",
  },
};

export default App;

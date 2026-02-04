import { useState, useRef } from "react";

/* 가짜 뉴스 데이터 */
const NEWS_DATA = {
  Korea: [
    { id: 1, title: "Korea economy shows signs of recovery" },
    { id: 2, title: "Political debate heats up ahead of election" },
  ],
  USA: [
    { id: 3, title: "US tech stocks surge amid AI boom" },
    { id: 4, title: "Supreme Court ruling sparks controversy" },
  ],
  Japan: [
    { id: 5, title: "Japan faces declining birth rate crisis" },
    { id: 6, title: "Tokyo prepares for major infrastructure upgrade" },
  ],
  France: [
    { id: 7, title: "France protests continue over pension reform" },
    { id: 8, title: "Paris hosts global climate summit" },
  ],
};

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [sidebarWidth, setSidebarWidth] = useState(320);
  const [selectedRegion, setSelectedRegion] = useState(null);

  const isResizing = useRef(false);

  /* 사이드바 리사이즈 */
  const startResize = () => {
    isResizing.current = true;
    document.addEventListener("mousemove", resize);
    document.addEventListener("mouseup", stopResize);
  };

  const resize = (e) => {
    if (!isResizing.current) return;
    const newWidth = window.innerWidth - e.clientX;
    if (newWidth >= 240 && newWidth <= 600) {
      setSidebarWidth(newWidth);
    }
  };

  const stopResize = () => {
    isResizing.current = false;
    document.removeEventListener("mousemove", resize);
    document.removeEventListener("mouseup", stopResize);
  };

  /* 나라 클릭 */
  const handleRegionClick = (region) => {
    setSelectedRegion(region);
    setSidebarOpen(true);
  };

  return (
    <div style={styles.app}>
      {/* Header */}
      <header style={styles.header}>
        <h1 style={{ margin: 0 }}>🗺️ Newsmap</h1>
      </header>

      {/* Main */}
      <div style={styles.main}>
        {/* Map (가짜 지도 버튼들) */}
        <div style={styles.map}>
          <div style={styles.regionButtons}>
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
        </div>

        {/* Sidebar */}
        {sidebarOpen && (
          <div
            style={{
              ...styles.sidebar,
              width: sidebarWidth,
            }}
          >
            {/* Resize handle */}
            <div style={styles.resizer} onMouseDown={startResize} />

            <div style={styles.sidebarHeader}>
              <h3 style={{ margin: 0 }}>
                {selectedRegion ? selectedRegion : "지역 선택"}
              </h3>
              <button
                style={styles.closeBtn}
                onClick={() => setSidebarOpen(false)}
              >
                ✕
              </button>
            </div>

            <div style={styles.newsList}>
              {!selectedRegion && (
                <p style={{ color: "#999" }}>
                  지도에서 나라를 선택하세요
                </p>
              )}

              {selectedRegion &&
                NEWS_DATA[selectedRegion].map((news) => (
                  <div key={news.id} style={styles.newsItem}>
                    {news.title}
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>

      {/* Sidebar open button */}
      {!sidebarOpen && (
        <button
          style={styles.openBtn}
          onClick={() => setSidebarOpen(true)}
        >
          ☰
        </button>
      )}
    </div>
  );
}

/* 스타일 */
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
    position: "relative",
  },
  map: {
    flex: 1,
    background: "#f2f2f2",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  regionButtons: {
    display: "flex",
    gap: "12px",
  },
  regionBtn: {
    padding: "10px 16px",
    cursor: "pointer",
    borderRadius: "6px",
    border: "1px solid #ccc",
    background: "white",
  },
  sidebar: {
    background: "white",
    borderLeft: "1px solid #ddd",
    display: "flex",
    flexDirection: "column",
    position: "relative",
  },
  resizer: {
    position: "absolute",
    left: 0,
    top: 0,
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
    alignItems: "center",
  },
  newsList: {
    padding: "12px",
    overflowY: "auto",
  },
  newsItem: {
    padding: "10px",
    borderBottom: "1px solid #eee",
    cursor: "pointer",
  },
  closeBtn: {
    background: "none",
    border: "none",
    fontSize: "18px",
    cursor: "pointer",
  },
  openBtn: {
    position: "absolute",
    top: "70px",
    right: "10px",
    padding: "8px 12px",
    fontSize: "18px",
    cursor: "pointer",
  },
};

export default App;

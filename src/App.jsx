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
      truth: 72,
    },
    {
      id: 2,
      title: "Political debate heats up ahead of election",
      summary:
        "Major parties clash over economic and foreign policies as the election approaches.",
      press: "Seoul Times",
      truth: 45,
    },
  ],
  USA: [
    {
      id: 3,
      title: "US tech stocks surge amid AI boom",
      summary:
        "AI-related companies lead the stock market rally, raising concerns about a potential bubble.",
      press: "New York Herald",
      truth: 63,
    },
  ],
};

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [sidebarWidth, setSidebarWidth] = useState(320);
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [showFact, setShowFact] = useState(false);

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
    setShowFact(false);
    setSidebarOpen(true);
  };

  return (
    <div style={styles.app}>
      <header style={styles.header}>
        <h1>🗺️ Newsmap</h1>
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
                    onClick={() => {
                      setSelectedArticle(news);
                      setShowFact(false);
                    }}
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
            <p style={{ color: "#666" }}>📰 {selectedArticle.press}</p>
            <p>{selectedArticle.summary}</p>

            <button
              style={styles.factBtn}
              onClick={() => setShowFact(!showFact)}
            >
              🔍 팩트체크 {showFact ? "닫기" : "보기"}
            </button>

            {showFact && (
              <div style={styles.factBox}>
                <SemiGauge value={selectedArticle.truth} />
                <p style={{ marginTop: 8 }}>
                  이 수치는 <b>다른 기사·아티클을 교차 분석</b>해
                  산출되었습니다.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

/* 반원 게이지 */
function SemiGauge({ value }) {
  return (
    <div style={styles.gaugeWrap}>
      <div style={styles.gaugeBg}>
        <div
          style={{
            ...styles.gaugeFill,
            transform: `rotate(${value * 1.8}deg)`,
          }}
        />
      </div>
      <div style={styles.gaugeText}>
        <b>{value}%</b> 진실
        <br />
        <span style={{ color: "#c00" }}>{100 - value}% 거짓</span>
      </div>
    </div>
  );
}

const styles = {
  app: { height: "100vh", display: "flex", flexDirection: "column" },
  header: {
    height: 56,
    background: "#111",
    color: "white",
    display: "flex",
    alignItems: "center",
    padding: "0 16px",
  },
  main: { flex: 1, display: "flex" },
  map: {
    flex: 1,
    background: "#f2f2f2",
    display: "flex",
    gap: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  regionBtn: { padding: "10px 14px", cursor: "pointer" },
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
    width: 6,
    height: "100%",
    cursor: "col-resize",
    background: "#e5e5e5",
  },
  sidebarHeader: {
    padding: 12,
    borderBottom: "1px solid #eee",
    display: "flex",
    justifyContent: "space-between",
  },
  newsList: { padding: 12 },
  newsItem: {
    padding: 10,
    borderBottom: "1px solid #eee",
    cursor: "pointer",
  },
  article: {
    width: 380,
    padding: 16,
    borderLeft: "1px solid #ddd",
    background: "#fafafa",
  },
  factBtn: {
    marginTop: 12,
    padding: 10,
    width: "100%",
    cursor: "pointer",
  },
  factBox: {
    marginTop: 16,
    padding: 12,
    border: "1px solid #ddd",
    borderRadius: 8,
  },
  gaugeWrap: { textAlign: "center" },
  gaugeBg: {
    width: 180,
    height: 90,
    overflow: "hidden",
    margin: "0 auto",
    background: "#eee",
    borderTopLeftRadius: 180,
    borderTopRightRadius: 180,
    position: "relative",
  },
  gaugeFill: {
    width: 180,
    height: 180,
    background: "#4caf50",
    position: "absolute",
    bottom: 0,
    left: 0,
    transformOrigin: "center bottom",
  },
  gaugeText: { marginTop: 8 },
};

export default App;

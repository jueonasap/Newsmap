import { saveBookmark } from "./utils/bookmark";
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
};

/* 신문사 분석 데이터 (가짜) */
const PRESS_DATA = {
  "Korea Daily": {
    truth: 78,
    bias: "중도",
    description:
      "최근 수년간의 기사와 외부 팩트체크 데이터를 종합해 산출되었습니다.",
  },
  "Seoul Times": {
    truth: 52,
    bias: "진보",
    description:
      "정치·사회 이슈에서 특정 관점이 자주 나타납니다.",
  },
};

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [sidebarWidth, setSidebarWidth] = useState(320);
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [showFact, setShowFact] = useState(false);
  const [selectedPress, setSelectedPress] = useState(null);

  const isResizing = useRef(false);

  const startResize = () => {
    isResizing.current = true;
    document.addEventListener("mousemove", resize);
    document.addEventListener("mouseup", stopResize);
  };

  const resize = (e) => {
    if (!isResizing.current) return;
    const newWidth = window.innerWidth - e.clientX;
    if (newWidth >= 260 && newWidth <= 600) setSidebarWidth(newWidth);
  };

  const stopResize = () => {
    isResizing.current = false;
    document.removeEventListener("mousemove", resize);
    document.removeEventListener("mouseup", stopResize);
  };

  const handleRegionClick = (region) => {
    setSelectedRegion(region);
    setSelectedArticle(null);
    setSelectedPress(null);
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
          <button
            style={styles.regionBtn}
            onClick={() => handleRegionClick("Korea")}
          >
            Korea
          </button>
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
                      setSelectedPress(null);
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

            {/* 신문사 클릭 */}
            <p
              style={styles.pressLink}
              onClick={() => setSelectedPress(selectedArticle.press)}
            >
              📰 {selectedArticle.press}
            </p>

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
                  다른 기사·아티클을 교차 분석해 산출된 수치입니다.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Press Analysis */}
        {selectedPress && (
          <div style={styles.pressPanel}>
            <h3>{selectedPress} 분석</h3>
            <SemiGauge value={PRESS_DATA[selectedPress].truth} />
            <p>
              <b>성향:</b> {PRESS_DATA[selectedPress].bias}
            </p>
            <p style={{ fontSize: 14, color: "#555" }}>
              {PRESS_DATA[selectedPress].description}
            </p>
            <button onClick={() => setSelectedPress(null)}>닫기</button>
          </div>
        )}
      </div>
    </div>
  );
}

/* 반원 게이지 */
function SemiGauge({ value }) {
  return (
    <div style={{ textAlign: "center" }}>
      <div style={styles.gaugeBg}>
        <div
          style={{
            ...styles.gaugeFill,
            transform: `rotate(${value * 1.8}deg)`,
          }}
        />
      </div>
      <p>
        <b>{value}%</b> 진실 / {100 - value}% 거짓
      </p>
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
    width: 360,
    padding: 16,
    borderLeft: "1px solid #ddd",
    background: "#fafafa",
  },
  pressLink: {
    color: "#0066cc",
    cursor: "pointer",
    textDecoration: "underline",
  },
  factBtn: { marginTop: 12, padding: 10, width: "100%" },
  factBox: {
    marginTop: 16,
    padding: 12,
    border: "1px solid #ddd",
    borderRadius: 8,
  },
  pressPanel: {
    width: 300,
    padding: 16,
    borderLeft: "1px solid #ddd",
    background: "#fff",
  },
  gaugeBg: {
    width: 160,
    height: 80,
    overflow: "hidden",
    margin: "0 auto",
    background: "#eee",
    borderTopLeftRadius: 160,
    borderTopRightRadius: 160,
    position: "relative",
  },
  gaugeFill: {
    width: 160,
    height: 160,
    background: "#4caf50",
    position: "absolute",
    bottom: 0,
    left: 0,
    transformOrigin: "center bottom",
  },
};

export default App;

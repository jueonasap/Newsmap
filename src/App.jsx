import { useState, useRef } from "react";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [sidebarWidth, setSidebarWidth] = useState(320);
  const isResizing = useRef(false);

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

  return (
    <div style={styles.app}>
      {/* Header */}
      <header style={styles.header}>
        <h1 style={{ margin: 0 }}>🗺️ Newsmap</h1>
      </header>

      {/* Main */}
      <div style={styles.main}>
        {/* Map */}
        <div style={styles.map}>
          <p style={{ color: "#888" }}>Map area (지도 자리)</p>
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
              <h3 style={{ margin: 0 }}>지역 뉴스</h3>
              <button
                style={styles.closeBtn}
                onClick={() => setSidebarOpen(false)}
              >
                ✕
              </button>
            </div>

            <div style={styles.newsList}>
              <p>🇰🇷 Korea</p>
              <p>🇺🇸 USA</p>
              <p>🇯🇵 Japan</p>
              <p>🇫🇷 France</p>
              <p style={{ color: "#999" }}>
                드래그해서 창 크기 조절 가능
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Open button */}
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

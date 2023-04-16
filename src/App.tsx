import logo from "./logo.svg";
import "./App.css";
// import MainCanvas from './components/MainCanvas';
import ThreeCanvas from "./components/ThreeCanvas";
import { createWebSocket } from "./WebClient";
import { useState } from "react";

function App() {
  const [server] = useState(() => createWebSocket());
  const [box, setBox] = useState(true);
  const [state, setState] = useState(1);

  return (
    <div className="App">
      <header className="App-header">
        {/* <div>
            см. МАРС 3D
        </div>
         */}
        <div id="box" style={{ opacity: box ? "1" : "0.3", top: "0" }}>
          {box && (
            <>
              <button
                onClick={() => {
                  setBox(!box);
                  setState(1);
                }}
              >
                Визуализатор
              </button>
              <button
                onClick={() => {
                  setBox(!box);
                  setState(0);
                }}
              >
                Редактор
              </button>
              <hr />
            </>
          )}
          <button
            style={{ backgroundColor: box ? "#b05159" : "#354f52" }}
            onClick={() => setBox(!box)}
            id="box_btn"
          >
            {box ? "Закрыть" : "Открыть"}
          </button>
        </div>
        {state ? (
          <ThreeCanvas />
        ) : (
          <iframe
            src="three-editor/editor/index.html"
            style={{ height: "100vh", width: "100vw", zIndex: "10" }}
          ></iframe>
        )}
      </header>
    </div>
  );
}

export default App;

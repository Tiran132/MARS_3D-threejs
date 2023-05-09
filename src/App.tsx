import "./App.css";
import ThreeCanvas from "./components/ThreeCanvas";
import { initSockets } from "./WebClient";
import { useEffect, useState } from "react";

function App() {
  useEffect(() => {
    initSockets();
  }, []);

  const [box, setBox] = useState(false);
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

import logo from "./logo.svg";
import "./App.css";
// import MainCanvas from './components/MainCanvas';
import ThreeCanvas from "./components/ThreeCanvas";
import { createWebSocket } from "./WebClient";
import { useState } from "react";

function App() {
  const [server] = useState(() => createWebSocket());
  const [state, setState] = useState(1);

  return (
    <div className="App">
      <header className="App-header">
        {/* <div>
            см. МАРС 3D
        </div>
         */}
        <div onClick={() => setState(1)}>Визуализатор</div>
        <div onClick={() => setState(0)}>Редактор</div>
        { state ? (
            <ThreeCanvas />        
        ) : (
            <iframe src="three-editor/editor/index.html" style={{height: "100vh", width: "100vw", zIndex: "10"}}></iframe>
        )}
      </header>
    </div>
  );
}

export default App;

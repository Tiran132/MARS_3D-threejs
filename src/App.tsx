import logo from './logo.svg';
import './App.css';
import MainCanvas from './components/MainCanvas';
import ThreeCanvas from './components/ThreeCanvas';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* <div>
            см. МАРС 3D
        </div>
         */}
        <MainCanvas />
         {/* <ThreeCanvas /> */}
      </header>
    </div>
  );
}

export default App;

import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="text-center vstack gap-3">
        <div className="hstack gap-4 justify-content-center flex-wrap">
          <a
            href="https://vitejs.dev"
            target="_blank"
            rel="noreferrer"
          >
            <img src={viteLogo} className="logo" alt="Vite logo" />
          </a>
          <a
            href="https://react.dev"
            target="_blank"
            rel="noreferrer"
          >
            <img
              src={reactLogo}
              className="logo react"
              alt="React logo"
            />
          </a>
        </div>
        <div className="display-4">Vite + React</div>
        <div>
          <button
            className="btn btn-primary btn-outset"
            onClick={() => setCount((count) => count + 1)}
          >
            count is {count}
          </button>
        </div>
        <div>
          Edit <code>src/App.jsx</code> and save to test HMR
        </div>
        <div className="read-the-docs">
          Click on the Vite and React logos to learn more
        </div>
      </div>
    </>
  );
}

export default App;

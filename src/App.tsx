import { useState } from "react";
import viteLogo from "/vite.svg";
import "./App.css";
import PWABadge from "./PWABadge";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
      </div>
      <h1>Vite v10</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <div className="">
          <PWABadge />
        </div>
      </div>
    </>
  );
}

export default App;

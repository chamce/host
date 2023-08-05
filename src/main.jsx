import ReactDOM from "react-dom/client";
import React from "react";

import BootstrapWrapper from "./BootstrapWrapper.jsx";
import App from "./App.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BootstrapWrapper>
      <App></App>
    </BootstrapWrapper>
  </React.StrictMode>,
);

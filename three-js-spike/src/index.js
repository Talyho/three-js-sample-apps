import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ConfiguratorProvider } from "./contexts/Configurator";
import "./index.css";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
     <ConfiguratorProvider>
     <App />
     </ConfiguratorProvider>
   
  </React.StrictMode>,
  rootElement
);

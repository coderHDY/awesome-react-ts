import React from "react";
import { useRoutes } from "react-router-dom";
import "./App.css";
import routerMap from "./router";

function App() {
  const elements = useRoutes(routerMap);
  return <div>{elements}</div>;
}

export default App;

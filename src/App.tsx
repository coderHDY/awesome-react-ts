import React from "react";
import "./App.css";
import routerMap from "./router";
import { useRoutes } from "react-router-dom";


function App() {
  const elements = useRoutes(routerMap);
  return <div>{elements}</div>;
}

export default App;

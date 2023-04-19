import { useState } from "react";
import Navigation from "./components/Navigation/Navigation";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import Home from "./components/Home";
import publicRoutes from "./routes/public";
import "./App.scss";

function App() {
  return (
    <Router>
      <div className="App">
        <header>
          <Navigation />
        </header>

        <div className="App-container container">
          <Routes>
            {publicRoutes.map((route, index) => (
              <Route
                key={index}
                path={route.pathname}
                element={<route.component />}
              />
            ))}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
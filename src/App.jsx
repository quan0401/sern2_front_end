import Navigation from "./components/Navigation/Navigation";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
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
            <Route path="*" element={<h1>Non-existent page</h1>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;

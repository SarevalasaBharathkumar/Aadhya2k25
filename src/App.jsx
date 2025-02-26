import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Page1 from "./pages/Page1";
import Page2 from "./pages/Page2";
import Page3 from "./pages/Page3";
import Page4 from "./pages/Page4";
import Page5 from "./pages/Page5";
import Profile from "./pages/Profile";
import Login from "./pages/Login";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setIsAuthenticated(!!token); // Convert token presence to boolean
  }, []);

  return (
    <Router>
      {isAuthenticated && <Navbar />} {/* Only show Navbar when logged in */}
      <Routes>
        <Route 
          path="/" 
          element={isAuthenticated ? <Navigate to="/page1" /> : <Login setIsAuthenticated={setIsAuthenticated} />} 
        />
        <Route 
          path="/page1" 
          element={isAuthenticated ? <Page1 /> : <Navigate to="/" />} 
        />
        <Route 
          path="/page2" 
          element={isAuthenticated ? <Page2 /> : <Navigate to="/" />} 
        />
        <Route 
          path="/page3" 
          element={isAuthenticated ? <Page3 /> : <Navigate to="/" />} 
        />
        <Route 
          path="/page4" 
          element={isAuthenticated ? <Page4 /> : <Navigate to="/" />} 
        />
        <Route 
          path="/page5" 
          element={isAuthenticated ? <Page5 /> : <Navigate to="/" />} 
        />
        <Route 
          path="/profile" 
          element={isAuthenticated ? <Profile /> : <Navigate to="/" />} 
        />
      </Routes>
    </Router>
  );
}

export default App;

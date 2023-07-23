import TabsPages from "./components/TabsPages";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import Dashboard from "./components/Dashboard";
import Profile from "./components/Pages/Profile";
import ForgotPassword from "./components/Pages/ForgotPassword";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Load the authentication status from LocalStorage on component mount
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      // If there is a token in LocalStorage, the user is considered logged in
      setIsLoggedIn(true);
    }
  }, []);

  // Function to handle successful login and save token to LocalStorage
  const handleLogin = (token) => {
    setIsLoggedIn(true);
    localStorage.setItem("token", token);
  };

  // Function to handle logout and remove token from LocalStorage
  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("token");
  };

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route
            exact
            path="/"
            element={
              isLoggedIn ? (
                <Navigate to="/dashboard" />
              ) : (
                <TabsPages
                  isLoggedIn={isLoggedIn}
                  setIsLoggedIn={setIsLoggedIn}
                  handleLogin={handleLogin}
                />
              )
            }
          />
          <Route
            exact
            path="/dashboard"
            element={isLoggedIn ? <Dashboard /> : <Navigate to="/" />}
          />
          <Route
            exact
            path="/profile"
            element={isLoggedIn ? <Profile /> : <Navigate to="/" />}
          />
          <Route exact path="/forgot-password" element={<ForgotPassword />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

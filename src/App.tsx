import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header";
import Participants from "./components/Participants/Participants";
import About from "./components/About/About";
import ParticipantDetail from "./components/Participants/feuathers/detail/ParticipantDetail";
import Login from "./components/Login/Login";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setIsLoggedIn(true);
    }
  }, [])
  const handleLogin = (status) => {
    setIsLoggedIn(status);
  };

  return (
    <>
      <div className="container">
        <Header />
        {!isLoggedIn && <Login onLogin={handleLogin} />} 
        {isLoggedIn && (
          <Routes>
            <Route path="/" element={<About />} />
            <Route path="/participants" element={<Participants />} />
            <Route path="/participants/:id" element={<ParticipantDetail />} />
          </Routes>
        )}
      </div>
    </>
  );
}

export default App;

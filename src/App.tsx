import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header";
import Participants from "./components/Participants/Participants";
import About from "./components/About/About";
import ParticipantDetail from "./components/Participants/feuathers/detail/ParticipantDetail";

function App() {
  return (
    <>
      <div className="container">
        <Header />
        <Routes>
          <Route path="/" element={<About />} />
          <Route path="/participants" element={<Participants />} />
          <Route path="/participants/:id" element={<ParticipantDetail />} />

        </Routes>
      </div>
    </>
  );
}

export default App;

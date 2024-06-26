import "./App.css";
import HomePage from "./components/HomePage";
import CreatePinPage from "./components/CreatePinPage";
import { HashRouter as Router, Routes, Route } from 'react-router-dom';function App() {
  return (
    
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/create" element={<CreatePinPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;

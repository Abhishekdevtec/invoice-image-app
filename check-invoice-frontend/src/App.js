import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Companies from "./components/Companies";
import Invoices from "./components/Invoices";
import Checks from "./components/Checks";
import CheckCapture from "./components/CheckCapture";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/companies" element={<Companies />} />
        <Route path="/invoices" element={<Invoices />} />
        <Route path="/checks" element={<Checks />} />
        <Route path="/capture" element={<CheckCapture />} />        
      </Routes>
    </Router>
  );
}

export default App;

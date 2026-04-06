import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import ResumeForm from "./components/ResumeForm.jsx";
import ResumeList from "./components/ResumeList.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />               {/* Home page */}
        <Route path="/resume-form" element={<ResumeForm />} />  {/* Form page */}
        <Route path="/resume-list" element={<ResumeList />} />  {/* List page */}
      </Routes>
    </Router>
  );
}

export default App;
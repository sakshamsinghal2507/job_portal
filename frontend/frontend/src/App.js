// Bring BrowserRouter, Routes and Route.
// These help us move from one page to another.
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Bring Login page.
import Login from "./Login";

// Bring Register page.
import Register from "./Register";

// Bring Dashboard page.
import Dashboard from "./Dashboard";

// Bring Jobs page.
import Jobs from "./Jobs";

// Bring Navbar page.
// Navbar will be shown on all pages.
import Navbar from "./Navbar";

// Bring Add Job page.
import AddJob from "./AddJob";


// Main function of our project.
// Everything starts from here.
function App() {

  // return means:
  // Show this on the screen.
  return (

    // BrowserRouter manages all pages.
    // It allows navigation without refreshing the website.
    <BrowserRouter>

      {/* Show Navbar on every page */}
      <Navbar />

      {/* Routes stores all page paths */}
      <Routes>

        {/* When URL is "/", open Login page */}
        <Route path="/" element={<Login />} />

        {/* When URL is "/register", open Register page */}
        <Route path="/register" element={<Register />} />

        {/* When URL is "/dashboard", open Dashboard page */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* When URL is "/jobs", open Jobs page */}
        <Route path="/jobs" element={<Jobs />} />

        {/* When URL is "/add-job", open Add Job page */}
        <Route path="/add-job" element={<AddJob />} />

      </Routes>

    </BrowserRouter>
  );
}

// Export App function.
// Now other files can use App.
export default App;
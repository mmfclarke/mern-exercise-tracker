import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import "./App.css";

// Import components
import HomePage from "./pages/HomePage";
import CreateExercisePage from "./pages/CreateExercisePage";
import EditExercisePage from "./pages/EditExercisePage";
import Navigation from "./components/Navigation";

function App() {
  const [exerciseToEdit, setExerciseToEdit] = useState(null);

  return (
    <Router>
      <div className="App">
        {/* Global Header */}
        <header>
          <h1>Exercise Tracker</h1>
          <p>Full Stack MERN App Demonstration</p>
        </header>

        {/* Navigation bar */}
        <Navigation />

        {/* Main page content */}
        <main>
          <Routes>
            <Route
              path="/"
              element={<HomePage setExerciseToEdit={setExerciseToEdit} />}
            />
            <Route path="/create" element={<CreateExercisePage />} />
            <Route
              path="/edit"
              element={<EditExercisePage exerciseToEdit={exerciseToEdit} />}
            />
          </Routes>
        </main>

        {/* Global Footer */}
        <footer>
          <p>&copy; 2025 Matthew Clarke</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;

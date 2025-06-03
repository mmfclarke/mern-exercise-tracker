import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateExercisePage() {
  const navigate = useNavigate();

  // State for form inputs
  const [name, setName] = useState("");
  const [reps, setReps] = useState("");
  const [weight, setWeight] = useState("");
  const [unit, setUnit] = useState("lbs");
  const [date, setDate] = useState("");

  // API base URL from environment variable
  const API_BASE = import.meta.env.VITE_API_BASE_URL;

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newExercise = {
      name,
      reps: parseInt(reps),
      weight: parseInt(weight),
      unit,
      date,
    };

    try {
      const response = await fetch(`${API_BASE}/exercises`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newExercise),
      });

      if (response.status === 201) {
        alert("Exercise created successfully!");
        navigate("/");
      } else {
        alert("Failed to create exercise. Please check your inputs.");
        navigate("/");
      }
    } catch (error) {
      console.error("Error creating exercise:", error);
      alert("Failed to create exercise. Please try again.");
      navigate("/");
    }
  };

  return (
    <div>
      <h2>Create New Exercise</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Exercise Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="reps">Reps:</label>
          <input
            type="number"
            id="reps"
            min="1"
            value={reps}
            onChange={(e) => setReps(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="weight">Weight:</label>
          <input
            type="number"
            id="weight"
            min="1"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="unit">Unit:</label>
          <select
            id="unit"
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
            required
          >
            <option value="lbs">lbs</option>
            <option value="kgs">kgs</option>
          </select>
        </div>

        <div>
          <label htmlFor="date">Date:</label>
          <input
            type="text"
            id="date"
            placeholder="MM-DD-YY"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>

        <button type="submit">Create Exercise</button>
      </form>
    </div>
  );
}

export default CreateExercisePage;
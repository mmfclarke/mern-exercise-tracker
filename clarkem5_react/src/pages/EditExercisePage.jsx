import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function EditExercisePage({ exerciseToEdit }) {
  const navigate = useNavigate();

  // State for form inputs
  const [name, setName] = useState("");
  const [reps, setReps] = useState("");
  const [weight, setWeight] = useState("");
  const [unit, setUnit] = useState("lbs");
  const [date, setDate] = useState("");

  // API base URL from environment variable
  const API_BASE = import.meta.env.VITE_API_BASE_URL;

  // When exerciseToEdit changes, pre-populate form
  useEffect(() => {
    if (exerciseToEdit) {
      setName(exerciseToEdit.name);
      setReps(exerciseToEdit.reps.toString());
      setWeight(exerciseToEdit.weight.toString());
      setUnit(exerciseToEdit.unit);
      setDate(exerciseToEdit.date);
    }
  }, [exerciseToEdit]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!exerciseToEdit) {
      alert("No exercise selected for editing");
      navigate("/");
      return;
    }

    const updatedExercise = {
      name,
      reps: parseInt(reps),
      weight: parseInt(weight),
      unit,
      date,
    };

    try {
      const response = await fetch(`${API_BASE}/exercises/${exerciseToEdit._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedExercise),
      });

      if (response.status === 200) {
        alert("Exercise updated successfully!");
        navigate("/");
      } else {
        alert("Failed to update exercise. Please check your input.");
        navigate("/");
      }
    } catch (error) {
      console.error("Error updating exercise:", error);
      alert("Failed to update exercise. Please try again.");
      navigate("/");
    }
  };

  // No exercise to edit - redirect to home
  if (!exerciseToEdit) {
    return (
      <div>
        <p>No exercise selected for editing.</p>
        <button onClick={() => navigate("/")}>Go to Home</button>
      </div>
    );
  }

  return (
    <div>
      <h2>Edit Exercise</h2>
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

        <button type="submit">Save Exercise</button>
      </form>
    </div>
  );
}

export default EditExercisePage;
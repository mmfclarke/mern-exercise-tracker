import { useState, useEffect } from "react";
import ExerciseTable from "../components/ExerciseTable";

function HomePage({ setExerciseToEdit }) {
  const [exercises, setExercises] = useState([]);

  // Load exercises from the REST API
  const loadExercises = async () => {
    try {
      // Call GET /exercises endpoint
      const response = await fetch("/exercises");
      if (response.ok) {
        const exercisesData = await response.json();
        setExercises(exercisesData);
      } else {
        console.error("Failed to fetch exercises");
      }
    } catch (error) {
      console.error("Error loading exercises:", error);
    }
  };

  // Delete an exercise
  const deleteExercise = async (exerciseId) => {
    try {
      // Call DELETE /exercises/:id endpoint
      const response = await fetch(`/exercises/${exerciseId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        loadExercises();
      } else {
        console.error("Failed to delete exercise");
      }
    } catch (error) {
      console.error("Error deleting exercise:", error);
    }
  };

  // Load exercises when component mounts
  useEffect(() => {
    loadExercises();
  }, []);

  return (
    <div>
      <h2>Exercise List</h2>
      <ExerciseTable
        exercises={exercises}
        deleteExercise={deleteExercise}
        setExerciseToEdit={setExerciseToEdit}
      />
    </div>
  );
}

export default HomePage;

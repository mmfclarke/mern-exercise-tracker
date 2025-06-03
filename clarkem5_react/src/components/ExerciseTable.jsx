import ExerciseRow from "./ExerciseRow";

function ExerciseTable({ exercises, deleteExercise, setExerciseToEdit }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Reps</th>
          <th>Weight</th>
          <th>Unit</th>
          <th>Date</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {exercises.map((exercise) => (
          <ExerciseRow
            key={exercise._id}
            exercise={exercise}
            deleteExercise={deleteExercise}
            setExerciseToEdit={setExerciseToEdit}
          />
        ))}
      </tbody>
    </table>
  );
}

export default ExerciseTable;

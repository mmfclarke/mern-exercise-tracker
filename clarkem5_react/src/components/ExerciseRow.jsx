import { useNavigate } from "react-router-dom";
import { MdDelete, MdEdit } from "react-icons/md";

function ExerciseRow({ exercise, deleteExercise, setExerciseToEdit }) {
  const navigate = useNavigate();

  // Handle edit button click
  const handleEdit = () => {
    setExerciseToEdit(exercise);
    navigate("/edit");
  };

  // Handle delete button click
  const handleDelete = () => {
    deleteExercise(exercise._id);
  };

  return (
    <tr>
      <td>{exercise.name}</td>
      <td>{exercise.reps}</td>
      <td>{exercise.weight}</td>
      <td>{exercise.unit}</td>
      <td>{exercise.date}</td>
      <td>
        {/* Edit icon button */}
        <MdEdit
          onClick={handleEdit}
          style={{ cursor: "pointer", marginRight: "10px" }}
          title="Edit Exercise"
        />
        {/* Delete icon button */}
        <MdDelete
          onClick={handleDelete}
          style={{ cursor: "pointer" }}
          title="Delete Exercise"
        />
      </td>
    </tr>
  );
}

export default ExerciseRow;

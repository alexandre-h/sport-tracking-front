import { useState } from "react";
import SeanceTemplate from '../../types/seance_template.type';
import { Exercise } from '../../types/seance_template.type';
import { saveTemplate } from '../../services/seance_template.service';
import { useNavigate } from "react-router-dom";

const SeanceTemplateForm: React.FC = () => {
  const [templateName, setTemplateName] = useState('');
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [exerciseName, setExerciseName] = useState('');
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editExerciseName, setEditExerciseName] = useState('');
  const navigate = useNavigate();
  const handleTemplateNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTemplateName(event.target.value);
  }

  const handleExerciseNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setExerciseName(event.target.value);
  }

  const addExercise = () => {
    if (exerciseName !== '') {
      const newExercise: Exercise = { name: exerciseName };
      setExercises([...exercises, newExercise]);
      setExerciseName('');
    }
  };

  const handleEditExerciseNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditExerciseName(event.target.value);
  };

  const editExercise = (index: number) => {
    setEditingIndex(index);
    setEditExerciseName(exercises[index].name);
  };

  const saveEditExercise = () => {
    if (editingIndex !== null) {
      const updatedExercises = exercises.map((exercise, index) =>
        index === editingIndex ? { ...exercise, name: editExerciseName } : exercise
      );
      setExercises(updatedExercises);
      setEditingIndex(null);
      setEditExerciseName('');
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const template: SeanceTemplate = { name: templateName, exercice: exercises };
      saveTemplate(template);
      navigate('/seance');
    } catch (error: any) {
      console.log("Error submit seance form: ", error.message);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <h2 className="col-lg-4 offset-lg-4 text-center">Créer votre séance</h2>
        <hr className="col-lg-6 offset-lg-3" />
  
        <form onSubmit={handleSubmit} className="col-lg-12">
          {/* Seance Name Input */}
          <div className="row justify-content-center">
            <div className="form-floating mb-3 col-lg-6">
              <input
                type="text"
                className="form-control input-form"
                id="templateName"
                value={templateName}
                onChange={handleTemplateNameChange}
                placeholder="template name"
                required
              />
              <label htmlFor="templateName">Seance Name</label>
            </div>
          </div>
  
          {/* Exercises List */}
          <ul className="list-unstyled">
            {exercises.map((exercise, index) => (
              <li key={index} className="row justify-content-center align-items-center mb-3">
                {editingIndex === index ? (
                  <div className="col-lg-6 ps-0 d-flex">
                    <div className="form-floating flex-grow-1">
                      <input
                        type="text"
                        value={editExerciseName}
                        onChange={handleEditExerciseNameChange}
                        className="form-control input-form"
                        placeholder="Edit exercise name"
                      />
                      <label>Edit Exercise Name</label>
                    </div>
                    <button type="button" className="btn btn-primary ms-2" onClick={saveEditExercise}>
                      Save
                    </button>
                  </div>
                ) : (
                  <div className="col-lg-6 d-flex justify-content-between align-items-center">
                    <div className="fw-bold text-capitalize fs-5">{exercise.name}</div>
                    <button type="button" className="btn btn-secondary" onClick={() => editExercise(index)}>
                      Edit
                    </button>
                  </div>
                )}
              </li>
            ))}
          </ul>
  
          {/* Add Exercise Section */}
          <div className="row justify-content-center align-items-center mb-3">
            <div className="form-floating col-lg-4 d-flex">
              <input
                type="text"
                className="form-control input-form"
                id="name"
                value={exerciseName}
                onChange={handleExerciseNameChange}
                placeholder="exercise name"
              />
              <label htmlFor="name">Nom de l'exercice</label>
            </div>
            <div className="col-lg-2">
              <button type="button" className="btn btn-secondary w-100" onClick={addExercise}>
                Add Exercise
              </button>
            </div>
          </div>
  
          {/* Submit Button */}
          <div className="row justify-content-center">
            <button type="submit" className="btn btn-primary col-lg-4">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
  
};

export default SeanceTemplateForm;

// import { useState } from "react";
// import SeanceTemplate from '../../types/seance_template.type';
// import { Exercise } from '../../types/seance_template.type';

// const SeanceTemplateForm: React.FC = () => {
//   const [templateName, setTemplateName] = useState('');
//   const [exercises, setExercises] = useState<Exercise[]>([]);
//   const [exerciseName, setExerciseName] = useState('');

//   const handleTemplateNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setTemplateName(event.target.value);
//   }

//   const handleExerciseNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setExerciseName(event.target.value);
//   }

//   const addExercise = () => {
//     if (exerciseName !== '') {
//       const newExercise: Exercise = { name: exerciseName };
//       setExercises([...exercises, newExercise]);
//       setExerciseName('');
//     }
//   };

//   const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     try {
//       console.log('exercises ::: ', exercises);
//     } catch (error: any) {
//       console.log("Error submut seance form : ", error.message);
//     }
//   };

//   return (
//     <div className="container">
//       <div className="row">
//         <h2 className="col-lg-4 offset-lg-4 text-center">Créer votre séance</h2>
//         <hr className="col-lg-6 offset-lg-3"></hr>

//         <form onSubmit={handleSubmit} className="col-lg-12">
//           <div className="form-floating mb-3 col-lg-4">
//             <input type="text" className="form-control input-form" id="templateName" value={templateName} onChange={handleTemplateNameChange} placeholder="template name" required />
//             <label htmlFor="seanceName" className="">Seance Name</label>
//           </div>
//           <ul>
//             {exercises.map((exercise, index) => (
//               <li key={index} className="row col-lg-12 align-items-center">
//                 <div className="col-lg-2 fw-bold text-capitalize fs-5">
//                   {exercise.name}
//                 </div>
//               </li>
//             ))}
//           </ul>
//           <div>
//             <div className="container row p-0 align-items-center">
//               <div className="form-floating mb-3 col-lg-3">
//                 <input type="text" className="form-control input-form" id="name" value={exerciseName} onChange={handleExerciseNameChange} placeholder="exercise name" />
//                 <label htmlFor="name" className="ps-4">Nom de l'exercice</label>
//               </div>
//               <div className="col-lg-2 p-0">
//                 <button type="button" className="btn btn-secondary h-25 " onClick={addExercise}>Add Exercise</button>
//               </div>
//             </div>
//           </div>
//           <button type="submit" className="btn btn-primary mt-3">Submit</button>
//         </form>
//       </div>
//     </div>
//   );
// };
// export default SeanceTemplateForm;

import { useState } from "react";
import SeanceTemplate from '../../types/seance_template.type';
import { Exercise } from '../../types/seance_template.type';
import { saveTemplate } from '../../services/seance_template.service';

const SeanceTemplateForm: React.FC = () => {
  const [templateName, setTemplateName] = useState('');
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [exerciseName, setExerciseName] = useState('');
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editExerciseName, setEditExerciseName] = useState('');

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
      const template: SeanceTemplate = { name: templateName, exercice: exercises }
      console.log('exercises ::: ', template);
      saveTemplate(template);
    } catch (error: any) {
      console.log("Error submit seance form: ", error.message);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <h2 className="col-lg-4 offset-lg-4 text-center">Créer votre séance</h2>
        <hr className="col-lg-6 offset-lg-3"></hr>

        <form onSubmit={handleSubmit} className="col-lg-12">
          <div className="form-floating mb-3 col-lg-4">
            <input type="text" className="form-control input-form" id="templateName" value={templateName} onChange={handleTemplateNameChange} placeholder="template name" required />
            <label htmlFor="templateName" className="">Seance Name</label>
          </div>
          <ul>
            {exercises.map((exercise, index) => (
              <li key={index} className="row col-lg-12 align-items-center">
                {editingIndex === index ? (
                  <div className="col-lg-12 d-flex align-items-center">
                    <input type="text" value={editExerciseName} onChange={handleEditExerciseNameChange} className="form-control input-form col-lg-6" />
                    <button type="button" className="btn btn-primary col-lg-2 ms-2" onClick={saveEditExercise}>Save</button>
                  </div>
                ) : (
                  <>
                    <div className="col-lg-6 fw-bold text-capitalize fs-5">
                      {exercise.name}
                    </div>
                    <button type="button" className="btn btn-secondary col-lg-2" onClick={() => editExercise(index)}>Edit</button>
                  </>
                )}
              </li>
            ))}
          </ul>
          <div>
            <div className="container row p-0 align-items-center">
              <div className="form-floating mb-3 col-lg-3">
                <input type="text" className="form-control input-form" id="name" value={exerciseName} onChange={handleExerciseNameChange} placeholder="exercise name" />
                <label htmlFor="name" className="ps-4">Nom de l'exercice</label>
              </div>
              <div className="col-lg-2 p-0">
                <button type="button" className="btn btn-secondary h-25" onClick={addExercise}>Add Exercise</button>
              </div>
            </div>
          </div>
          <button type="submit" className="btn btn-primary mt-3">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default SeanceTemplateForm;

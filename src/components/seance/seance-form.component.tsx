import React, { useState } from 'react';
import SeanceService from '../../services/seance.service';
import { Exercise } from '../../types/seance.type';
import './seance.css';

const SeanceForm: React.FC = () => {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [name, setName] = useState('');
  // const [repetition, setRepetition] = useState<number | ''>('');
  const [seanceName, setSeanceName] = useState<string>('');

  const handleSeanceNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSeanceName(event.target.value);
  }

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleRepetitionChange = (event: React.ChangeEvent<HTMLInputElement>, index: number, repetitionIndex: number) => {
    const newExercises = [...exercises];
    const repValue = Number(event.target.value);
    newExercises[index].repetitions[repetitionIndex] = repValue;
    setExercises(newExercises);
  };

  const addExercise = () => {
    if (name !== '') {
      const newExercise: Exercise = { name, repetitions: [0] };
      setExercises([...exercises, newExercise]);
      setName('');
    }
  };

  const addRepetitionField = (index: number) => {
    const newExercises = [...exercises];
    newExercises[index].repetitions.push(0);
    setExercises(newExercises);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const convertedExercices = SeanceService.convertRepetitionData(exercises);
      const seanceData = { name: seanceName, exercices_attributes: convertedExercices }
      SeanceService.saveSeance(seanceData);
    } catch (error: any) {
      console.log("Error submut seance form : ", error.message);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <h2 className="col-lg-4 offset-lg-4 text-center">Créer votre séance</h2>
        <hr className="col-lg-6 offset-lg-3"></hr>

        <form onSubmit={handleSubmit} className="col-lg-12">
          <div className="form-floating mb-3 col-lg-4">
            <input type="text" className="form-control input-form" id="seanceName" value={seanceName} onChange={handleSeanceNameChange} placeholder="seance name" required />
            <label htmlFor="seanceName" className="">Seance Name</label>
          </div>
          <ul>
            {exercises.map((exercise, index) => (
              <li key={index} className="row col-lg-12 align-items-center">
                <div className="col-lg-2 fw-bold text-capitalize fs-5">
                  {exercise.name} :
                </div>
                {exercise.repetitions.map((repetitionValue, repetitionIndex) => (
                  <div className="form-floating col-lg-2">
                    <input key={repetitionIndex} type="number" className="form-control input-form" id="repetitionValue" value={repetitionValue} onChange={(e) => handleRepetitionChange(e, index, repetitionIndex)} placeholder="repétition" required />
                    <label htmlFor="repetitionValue" className="">répétition</label>
                  </div>
                ))}
                <button type="button" className="btn btn-secondary ms-3 h-25 col-lg-2" onClick={() => addRepetitionField(index)}>Add Repetition</button>
              </li>
            ))}
          </ul>
          <div>
            <div className="container row p-0 align-items-center">
              <div className="form-floating mb-3 col-lg-3">
                <input type="text" className="form-control input-form" id="name" value={name} onChange={handleNameChange} placeholder="name" />
                <label htmlFor="name" className="ps-4">Nom de l'exercice</label>
              </div>
              <div className="col-lg-2 p-0">
                <button type="button" className="btn btn-secondary h-25 " onClick={addExercise}>Add Exercise</button>
              </div>
            </div>
          </div>
          <button type="submit" className="btn btn-primary mt-3">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default SeanceForm;

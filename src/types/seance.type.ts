export default interface SeanceData {
    name: string,
    exercices_attributes: exercices_attribute[]
}


export interface exercices_attribute {
    name: string
    repetition: number
}

export interface default_seance {
    name: string,
    exercices_attributes: object
}

export interface Exercise {
    name: string;
    repetitions: number[];
  }
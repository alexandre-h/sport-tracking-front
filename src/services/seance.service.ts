import axios from "axios";
import SeanceData from "../types/seance.type";
import authHeader from "./auth-header";

const SEANCE_URL = "http://localhost:3000/seances";

class SeanceService {

    async saveSeance(seance: SeanceData) {
        return axios
            .post(SEANCE_URL, seance, { headers: authHeader() })
            .then(response => {
                return response
            }).catch((error: any) => {
                console.log("Error on save seance : ", error)
            });;
    }


    convertRepetitionData(data: any) {
        return data.flatMap((item: any) => item.repetitions.map((rep: any) => ({ name: item.name, repetition: rep })));
    }
}

export default new SeanceService();

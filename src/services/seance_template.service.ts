import axios from "axios";
import SeanceTemplate from "../types/seance_template.type";
import authHeader from "./auth-header";

const SEANCE_TEMPLATE_URL = "http://localhost:3000/seance_templates";

// class SeanceTemplateService {

//   async getSeanceTemplate() {
//     return axios.get<SeanceTemplate[]>(SEANCE_TEMPLATE_URL, { headers: authHeader() })
//       .then(response => {
//         return response;
//       }).catch((error: any) => {
//         console.log("Error when trying to fetch seance template : ", error);
//       });
//   }
// }
// export default new SeanceTemplateService();


export const getSeanceTemplate = async (): Promise<SeanceTemplate[]> => {
  const response = await axios.get<SeanceTemplate[]>(SEANCE_TEMPLATE_URL, { headers: authHeader() })
  return response.data;
}


export const saveTemplate = async (template: SeanceTemplate): Promise<any> => {
  return axios
    .post(SEANCE_TEMPLATE_URL, template, { headers: authHeader() })
    .then(response => {
      return response
    }).catch((error: any) => {
      console.log("Error on save seance : ", error)
    });
}

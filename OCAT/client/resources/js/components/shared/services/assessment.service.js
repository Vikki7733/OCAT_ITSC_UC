import axios from "axios";
export class AssessmentService {
  static async submit(assessment) {

    try {
      console.log(assessment)
      await axios.post('http://localhost:3000/assessment/submit', assessment);
    }
    catch (err) {
      throw new Error(`${err.response.statusText} - ${err.response.data.message}`);
    }
  }
}
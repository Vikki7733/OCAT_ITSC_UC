const { AssessmentService } = require(`../../microservices`);
const { ResponseHandler } = require(`../../utils`);

const BASE_URL = `/assessment`;

module.exports = server => {

  server.post(
    `${BASE_URL}/submit`,
    async (req, res, next) => {
      //calculating score and risklevel and passing the data to microservices
      try {

        const assessment = req.params;
        let score = 0;
        score += +assessment.question1
        score += +assessment.question2;
        score += +assessment.question3;
        score += +assessment.question4;
        score += +assessment.question5;
        let value = score;

        let riskLevel = "Low";
        if (value > 1) {
          riskLevel = "Medium";
        }

        if (value > 3) {
          riskLevel = "high";
        }
        const newAssessment = await AssessmentService.submit(assessment, value, riskLevel);

        ResponseHandler(
          res,
          '',
          newAssessment,
          next
        );
      } catch (err) {
        console.log(`err: `, err)
        next(err);
      }
    }
  );

  server.get(
    `${ BASE_URL }/retrieve`,
    async (req, res, next) => {
      try {
        const assessmentList = await AssessmentService.retrieve();

        ResponseHandler(
          res,
          'Retrieved Assessments successfully',
          assessmentList,
          next
        );
      } catch (err) {
        console.log(err)
        next(err);
      }
    }
  );
};

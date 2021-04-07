const router = require(`express`).Router();
const { AssessmentService } = require(`../../libs`);
const { ErrorHandler } = require(`../../utils`);
const { AssessmentSubmitRoute } = require(`../../utils`);

router.post(`/submit`, (req, res) => {
    AssessmentService.submit(req.body);
});
router.get(`/retrieve`, (req, res) => {
    AssessmentService.retrieve().then((response) => {
         res.send(response.body.data)        
      });
});

exports.router = router;
exports.path = `/api/assessment`; 
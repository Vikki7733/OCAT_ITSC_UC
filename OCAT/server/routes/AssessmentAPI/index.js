const router = require(`express`).Router();
const { AssessmentService } = require(`../../libs`);
const { ErrorHandler } = require(`../../utils`);
const { AssessmentSubmitRoute } = require(`../../utils`);

router.post(`/submit`, (req, res) => {
    AssessmentService.submit(req.body);
});

exports.router = router;
exports.path = `/api/assessment`; 
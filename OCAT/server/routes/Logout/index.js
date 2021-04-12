const router = require(`express`).Router();
const { LogoutRoute } = require(`../../utils`);

router.get(`/logout/index.js`, LogoutRoute);

exports.router = router;
exports.path = `/api/logout`;
const router = require(`express`).Router();
const { UserService } = require(`../../libs`);

router.post(`/submit`, (req, res) => {

    const sess = req.session;

    UserService.submit(req.body).then((response) => {
        sess.isLoggedIn = response.body.data.isLoggedIn;
        sess.isSupervisor = response.body.data.is_supervisor;
        sess.username = response.body.data.username;
        sess.first_name=response.body.data.first_name;

        res.send({isLoggedIn: response.body.data.isLoggedIn, isSupervisor: response.body.data.is_supervisor,});
    });
});

router.post(`/signUp`, (req, res) => {
    UserService.signUp(req.body).then((response) => {
        res.send(response.body.data);
    });
});

exports.router = router;
exports.path = `/api/login`;
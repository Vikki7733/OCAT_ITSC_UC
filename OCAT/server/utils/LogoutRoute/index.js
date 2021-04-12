module.exports = async function(req, res) {
    req.session.destroy(err => {
        if (err) {
            return console.log(err);
        }

        res.redirect("/")
    });
   
};
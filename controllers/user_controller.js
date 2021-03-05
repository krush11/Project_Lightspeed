const Country = require('../models/country');

module.exports.profile = async function (req, res) {
    await Country.findById(req.user._id, function(err, user){
        // console.log(user);
        return res.render('profile', {
            profile_user: user
        });
    });
};
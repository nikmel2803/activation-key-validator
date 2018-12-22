const uuid = require('uuid/v4');

const {UserModel, TokenModel} = require('./models');


function register(req, res) {
    const tokenValue = uuid();
    new TokenModel({
        value: tokenValue,
        type: req.path.substring(1),
        email: req.query.email

    }).save();
    console.log('Follow this link to complete registration: http://localhost:3000/api/register/validate/' + tokenValue);
    res.send('OK');
}

function validateRegistration(req, res) {
    const tokenValue = req.params.token;
    TokenModel.findOne({value: tokenValue}, function (err, obj) {
        new UserModel({
            email: obj.email,
            id: uuid(),
            type: obj.type === 'register-user' ? 'user' : 'developer',
            recoveryCode: uuid()
        }).save();
        TokenModel.deleteOne({value: tokenValue}, function (err, obj) {
            // console.log(err)
        });
    });
    res.send('OK');
}

module.exports = {
    register,
    validateRegistration
};
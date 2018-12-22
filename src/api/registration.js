const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const uuid = require('uuid/v4');

const path = require('path');
const env = require('dotenv').config({path: path.resolve(__dirname, '../.env')}).parsed;

mongoose.connect(env.PATH_TO_MONGODB, {useNewUrlParser: true});

const tokenSchema = new Schema({
    value: String,
    type: String,
    email: String

});
const TokenModel = mongoose.model('Tokens', tokenSchema);

const userSchema = new Schema({
    email: String,
    UUID: String,
    ref_id: String
});

const UserModel = mongoose.model('Users', userSchema);

function register(req, res) {
    const tokenValue = uuid();
    new TokenModel({
        value: tokenValue,
        type: 'register',
        email: req.query.email

    }).save();
    console.log('Follow this link to complete registration: http://localhost:3000/api/register/token/' + tokenValue);
    res.send('OK');
}

function validateRegistration(req, res) {
    const tokenValue = req.params.token;
    TokenModel.findOne({value: tokenValue}, function (err, obj) {
        new UserModel({
            email: obj.email,
            uuid: uuid(),
            ref_id: null
        }).save();
        TokenModel.deleteOne({value: tokenValue}, function (err, obj) {
            console.log(err)
        });
    });
    res.send('OK');
}

module.exports = {
    register,
    validateRegistration
};
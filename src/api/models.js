const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
    id: String,
    type: String,
    recoveryCode: String,
    ref_id: String
});

const UserModel = mongoose.model('Users', userSchema);

module.exports = {UserModel, TokenModel};
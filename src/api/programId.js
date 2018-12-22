const {UserModel} = require('./models');
const hug = require('../hug');
const uuid = require('uuid/v4');

// User actions

function check(req, res) {

}

function buy(req, res) {

}

// Developer actions

function registerProgram(req, res) {
    const {email, price, purse} = req.query;
    UserModel.findOne({email}, function (err, user) {
        const programId = uuid();
        const data = {
            purse,
            price,
            program_id: programId,
        };
        hug.add(user.id, user.recoveryCode, data);
        res.send(programId);
    });
}

function setPrice(req, res) {

}

function setPurse(req, res) {

}

module.exports = {
    check,
    buy,
    registerProgram,
    setPrice,
    setPurse
};
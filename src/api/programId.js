const {UserModel} = require('./models');
const hug = require('../hug');
const uuid = require('uuid/v4');

// User actions

function check(req, res) {
    const {email, programId} = req.query;
    UserModel.findOne({email}, async function (err, user) {
        if (user.type === 'developer') {
            res.status(400).end('Only users account can validate keys');
            return;
        }
        const query = {
            program_id: programId,
        };
        const result = await hug.get(user.id, query);
        if (result)
            res.status(200).end();
        else res.status(400).end();
    })
}

function buy(req, res) {
    const {email, programId, customerPurse} = req.query;
    UserModel.findOne({email}, function (err, user) {
        if (user.type === 'developer') {
            res.status(400).end('Only users account can buy programs');
            return;
        }
        const data = {
            program_id: programId,
        };
        hug.add(user.id, user.recoveryCode, data)
            .then(() => res.status(200).end())
            .catch(() => res.status(400).end())

    });
}

// Developer actions

function registerProgram(req, res) {
    const {email, price, purse} = req.query;
    UserModel.findOne({email}, function (err, user) {
        if (user.type === 'user') {
            res.status(400).end('Only developer account can register programs');
            return;
        }
        const programId = uuid();
        const data = {
            purse,
            price,
            program_id: programId,
        };

        hug.add(user.id, user.recoveryCode, data)
            .then(() => res.send(programId))
            .catch(() => res.status(400).end())

    });
}

function setPaymentSettings(req, res) {
    const {email, newPrice, programId} = req.query;
    UserModel.findOne({email}, function (err, user) {
        if (user.type === 'user') {
            res.status(400).end('Only developer account can register programs');
            return;
        }
        const data = {
            purse,
            price,
            program_id: programId,
        };
        hug.add(user.id, user.recoveryCode, data)
            .then(() => res.send(programId))
            .catch(() => res.status(400).end())

    });
}

module.exports = {
    check,
    buy,
    registerProgram,
    setPaymentSettings,
};
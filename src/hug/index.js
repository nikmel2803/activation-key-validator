const mongoose = require('mongoose');
const axios = require('axios');
const Schema = mongoose.Schema;

const path = require('path');
const env = require('dotenv').config({path: path.resolve(__dirname, '../.env')}).parsed;

const blockSchema = new Schema({
    id: String,
    recoveryCode: String,
    data: Array
});
const BlockModel = mongoose.model('Blocks', blockSchema);

class Hug {
    constructor() {
        this.PATH_TO_MONGODB = env.PATH_TO_MONGODB;
        this.STAX_API_ENDPOINT = env.STAX_API_ENDPOINT;
    }

    add(id, recoveryCode, data) {
        return Promise.all(
            this.saveToMongo(id, recoveryCode, data),
            this.saveToBlockchain(id, recoveryCode, data)
        )
    }

    saveToMongo(id, recoveryCode, data) {
        BlockModel.findOne({id}, function (err, block) {
            let dataArray = [];
            dataArray.push(data);

            if (!block) {
                new BlockModel({id, recoveryCode, dataArray}).save();
                return;
            }
            dataArray = dataArray.concat(block.data);
            block.data = dataArray;
            block.save();
        });
    }

    saveToBlockchain(id, recoveryCode, data) {

    }
}

module.exports = new Hug();
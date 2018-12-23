const mongoose = require('mongoose');
const axios = require('axios');
const Schema = mongoose.Schema;

const crypto = require('crypto');

const path = require('path');
const env = require('dotenv').config({path: path.resolve(__dirname, '../.env')}).parsed;

const blockSchema = new Schema({
    id: String,
    recoveryCode: String,
    data: Array,
    ref_id: String, // reference for the last record of the user
});
const BlockModel = mongoose.model('Blocks', blockSchema);

class Hug {
    constructor() {
        this.PATH_TO_MONGODB = env.PATH_TO_MONGODB;
        this.STAX_API_ENDPOINT = env.STAX_API_ENDPOINT;
        this.staxAccountId = undefined;
    }

    add(id, recoveryCode, data) {
        return new Promise((resolve, reject) => {
            BlockModel.findOne({id}, async (err, block) => {
                const hashedRecoveryCode = crypto.createHmac('sha256', '')
                    .update(recoveryCode)
                    .digest('hex');
                if (err) reject(err);
                let dataArray = [];
                dataArray.push(data);
                if (!block) { // First block
                    const refId = await this.saveToBlockchain(id, hashedRecoveryCode, data, '');

                    // console.log(block)

                    new BlockModel({id, recoveryCode:hashedRecoveryCode, data: dataArray, ref_id: refId}).save();
                    resolve();
                    return;
                }
                const currentRefId = block.ref_id;

                dataArray = dataArray.concat(block.data);
                block.ref_id = await this.saveToBlockchain(id, hashedRecoveryCode, data, currentRefId);
                block.data = dataArray;
                block.save();
                resolve();
            });
        })

    }

    async saveToBlockchain(id, recoveryCode, data, ref_id) {
        this.staxAccountId || await this.auth();
        const dataToSave = {
            id, recoveryCode, data, ref_id
        };
        try {
            const response = await axios.post(env.STAX_API_ENDPOINT + '/storage', dataToSave, {
                headers: {
                    'originator-ref': this.staxAccountId
                }
            });
            return response.data.ref_id;
        } catch (e) {
            console.log(e);
        }
    }

    async auth() {
        //TODO: обработать ошибку, в случае если нету аккаунтов...
        try {
            const response = await axios.get(env.STAX_API_ENDPOINT + '/account');
            this.staxAccountId = response.data[0];
        } catch (e) {
            console.log(e);
        }

    }

    get(id, query) {
        return new Promise((resolve, reject) => {
            BlockModel.findOne({
                id,
                data: {$elemMatch: query}
            }, function (err, res) {
                resolve(res);
            })
        });
    }
}

module.exports = new Hug();
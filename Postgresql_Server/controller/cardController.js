const { Card, History } = require('../models')
const bcrypt = require('bcrypt');
const { emptyQuery } = require('pg-protocol/dist/messages');
class cardController {
    static getCard(req, res) {
        Card.findAll()
            .then(result => {
                return res.status(200).json({
                    msg: 'Get Card Success',
                    data: result
                })
            })
    }

    static addCard = async (req, res) => {
        const dataQuery = {
            cardNumber: 'None',
            CVV: 'None',
            cardName: 'None',
            Username: 'None',
            cardType: 'Master',
            cardExpDate: 'None'
        };
        if (!req.body.cardNumber) return res.status(400).json({ msg: "Please Insert Card Number!!" });
        if (!req.body.CVV) return res.status(400).json({ msg: "Please Insert CVV!!" });
        if (!req.body.cardName) return res.status(400).json({ msg: "Please Insert Card Name!!" });
        if (!req.body.Username) return res.status(400).json({ msg: "Please Insert Username!!" });
        switch (req.body.cardType) {
            case 'Master':
                dataQuery.cardType = req.body.cardType

                break;
            case 'Visa':
                dataQuery.cardType = req.body.cardType

                break;
            default:
                return res.status(400).json({
                    msg: 'Please Select Either Master / Visa!!'
                })
        }
        if (!req.body.cardExpDate) return res.status(400).json({ msg: "Please Insert Card Expiry Date!!" });
        const salt = process.env.SALT;
        dataQuery.cardNumber = await bcrypt.hash(req.body.cardNumber, Number(salt))
        dataQuery.CVV = await bcrypt.hash(req.body.CVV, Number(salt))
        dataQuery.cardName = await bcrypt.hash(req.body.cardName, Number(salt))

        if (req.body.Username) dataQuery.Username = req.body.Username;
        if (req.body.cardExpDate) dataQuery.cardExpDate = req.body.cardExpDate;
        Card.create(dataQuery)
            .then(result => {
                return res.status(201).json({
                    msg: "Create Card Success",
                    data: result
                });
            })
            .catch(err => {
                return res.status(400).json({
                    msg: 'Create Card Failed',
                    data: err
                })
            })
    };
    static updateCard = async (req, res) => {
        const salt = process.env.SALT
        Card.findOne({
            where: {
                id: req.params.id
            }
        })
            .then(async (result) => {
                let data = result.dataValues
                if (req.body.cardNumber) data.cardNumber = await bcrypt.hash(req.body.cardNumber, Number(salt));
                if (req.body.CVV) data.CVV = await bcrypt.hash(req.body.CVV, Number(salt));
                if (req.body.cardName) data.cardName = await bcrypt.hash(req.body.cardName, Number(salt));
                if(req.body.Username) data.Username = req.body.Username;
                if(req.body.cardType) data.cardType = req.body.cardType;
                if(req.body.cardExpDate) data.cardExpDate = req.body.cardExpDate;
                await console.log(data)
                return Card.update(data, {where: {
                    id: req.params.id
                }})
            })
            .then(result1 => {
                return res.status(200).json({ msg: 'update success'})
            })
            .catch(err => {
                console.log(err)
                return res.status(400).json({
                    message: "Card Id Does Not Exist",
                    err: err
                })
            })
    }

    static deleteCard = async (req, res) => {
        Card.findOne({where: {
            id: req.params.id
        }})
        .then(result => {
            return Card.destroy({where: {
                id: result.dataValues.id
            }})
        })
        .then(result1 => {
            return res.status(200).json({
                message: "Delete Card Success!!"
            })
        }) 
        .catch(err => {
            return res.status(400).json({
                message: "Card Id Does Not Exist",
            })
        }) 
    }

}
module.exports = cardController
const { History } = require('../models')
const moment = require('moment')
class HistoryController {
    static getHistory(req, res) {
        History.findAll()
            .then(result => {
                return res.status(200).json({
                    msg: 'Get History Success',
                    data: result
                })
            })
    }
    static getCardHistory(req, res) {
        History.findAll({
            where: {
                cardId: req.params.id
            }
        })
            .then(result => {
                return res.status(200).json({ msg: 'Get Card History Success!', data: result })
            })
    }
    static addHistory = (req, res) => {
        const dataQuery = {
            userID: "None",
            Id: "None",
            cardId: "None",
            Merchant: "None,",
            Success: false,
            createdDate: moment(new Date).format('DD/MM/YYYY : HH:mm')
        }
        if (!req.body.userID) return res.status(400).json({ msg: "Please Insert UserID!!" });
        if (!req.body.Id) return res.status(400).json({ msg: 'Please Insert Id!!' });
        if (!req.body.cardId) return res.status(400).json({ msg: 'Please Insert cardId!!' });
        if (!req.body.Merchant) return res.status(400).json({ msg: "Please Insert Merchant!!" });
        if (!req.body.createdDate) return res.status(400).json({ msg: "Please Insert Created Date" })
        switch (req.body.Success) {
            case true:
                dataQuery.Success = req.body.Success
                break;
            case false:
                dataQuery.Success = req.body.Success
                break;
            default:
                return res.status(400).json({ msg: 'Please Choose Either true / false for Success!!' })
        }
        if (req.body.userID) dataQuery.userID = req.body.userID;
        if (req.body.Id) dataQuery.Id = req.body.Id;
        if (req.body.cardId) dataQuery.id = req.body.cardId;
        if (req.body.Merchant) dataQuery.Merchant = req.body.Merchant;
        History.create(dataQuery)
            .then(result => {
                return res.status(201).json({
                    msg: 'Create History Success!!',
                    data: result
                })
            })
            .catch(err => {
                return res.status(400).json({
                    msg: 'Create History Failed',
                    err: err
                })
            })
    };
    static updateHistory = async (req, res) => {
        History.findOne({
            where: {
                id: req.params.id
            }
        })
            .then(async (result) => {
                let data = result.dataValues;
                if (req.body.userID) data.userID = req.body.userID;
                if (req.body.Id) data.Id = req.body.Id;
                if (req.body.cardId) data.cardId = req.body.Id;
                if (req.body.Merchant) data.Merchant = req.body.Merchant;
                if (req.body.Success) data.Success = req.body.Success;
                return History.update(data, {
                    where: {
                        id: req.params.id
                    }
                })
            })
            .then(result1 => {
                return res.status(200).json({
                    msg: 'Update History Success!!'
                })
            })
            .catch(err => {
                return res.status(400).json({
                    msg: 'Update History Failed!!',
                    err: err
                })
            })
    }
    static deleteHistory = async (req, res) => {
        history.findOne({
            where: {
                id: req.params.id
            }
        })
            .then(result => {
                return History.destroy({
                    where: {
                        id: result.dataValues.id
                    }
                })
            })
            .then(result1 => {
                return res.status(200).json({
                    msg: 'Delete History Success!'
                })
            })
            .catch(err => {
                return res.status(400).json({
                    msg: 'History Id Does Not Exist'
                })
            })
    }

}
module.exports = HistoryController
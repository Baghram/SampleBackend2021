const UserModel = require('../models/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const moment = require('moment')

class userController {
    static async Register(req, res) {
        try {
            if (!req.body.Email) throw new Error('Please Include Email')
            let userExist = await UserModel.findUser(req.body.Email)
            console.log(userExist)
            if (userExist) throw new Error('User Already Registered!!')
            if (!req.body.Password) throw new Error('Please Insert Password')
            const salt = process.env.SALT;
            const query = {
                Nama: 'None',
                Email: 'None',
                Alamat: { Lengkap: "None", Nomor: 0, RTRW: "None" },
                Password: 'None',
                userId: 'None',
                appPin: 'None',
                Device: { deviceType: "None", deviceModel: "None", deviceVersion: "None" },
                Card: [],
                RegisteredDate: moment(new Date).format('DD/MM/YYYY:HH/mm'),
                History: [],
                Token: []
            }
            if (req.body.Nama) query.Nama = req.body.Nama;
            if (req.body.Email) query.Email = req.body.Email;
            if (req.body.AlamatLengkap) query.Alamat.Lengkap = req.body.AlamatLengkap;
            if (req.body.AlamatNomor) query.Alamat.Nomor = req.body.AlamatNomor;
            if (req.body.AlamatRTRW) query.Alamat.RTRW = req.body.AlamatRTRW;
            if (req.body.Password) {
                console.log(req.body.Password)
                let newPass = await bcrypt.hash(req.body.Password, Number(salt))
                console.log(newPass)
                query.Password = newPass;
            }
            if (req.body.userId) query.userId = req.body.userId;
            if (req.body.appPin) query.appPin = req.body.appPin;
            if (req.body.deviceType) query.Device.deviceType = req.body.deviceType;
            if (req.body.deviceModel) query.Device.deviceModel = req.body.deviceModel;
            if (req.body.deviceVersion) query.Device.deviceVersion;
            if (req.body.Card) query.Card;
            if (req.body.History) query.History;
            if (req.body.Token) query.Token;
            const result = await UserModel.create(query);
            return res.status(200).json({ msg: 'Register Success', data: result });

        } catch (error) {
            return res.status(400).json({
                msg: 'Register Failed',
                err: error.message
            });
        }
    }
    static async Login(req, res) {
        try {
            let isExist = await UserModel.findUser(req.body.Email);
            if (!isExist) throw new Error('Wrong Username And Password');
            let CheckLogin = await bcrypt.compare(req.body.Password, isExist.Password);
            if (!CheckLogin) throw new Error('Wrong Username And Password');
            let secret = process.env.SECRET;
            let payload = jwt.sign({
                Nama: isExist.Nama,
                Email: isExist.Email,
                Token: isExist.Token
            }, secret, { expiresIn: '2h' })
            return res.status(200).json({
                msg: 'Login Success',
                token: payload
            });
        } catch (error) {
            return res.status(400).json({
                msg: 'Login Failed',
                err: error.message
            });

        }
    }
    static async findAll(req, res) {
        try {
            const userDatas = await UserModel.findAllUser();
            let datas = [];
            await userDatas.map(userData => {
                delete userData.Password;
                datas.push(userData)
            });
            return res.status(200).json({
                msg: 'Find All User Success',
                data: datas
            });

        } catch (error) {
            return res.status(400).json({
                msg: 'Find All User Failed',
                err: error.message
            });
        }
    }
}

module.exports = userController
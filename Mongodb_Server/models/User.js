const { getDatabase } = require('../config/mongo')
const db = getDatabase()
const User = db.collection('User')
const { objectId, ObjectId } = require('mongodb')

class UserModel {
    static findUser(Email) {
        return User.findOne({ Email: Email});
    }
    static findAllUser() {
        return User.find().toArray()
    }
    static findbyId(id) {
        return User.findOne({ _id: objectId(id) })
    }
    static create(data) {
        return User.insertOne(data)
    }
    static update(id, data) {
        return User.updateOne({
            _id: ObjectId(id)
        }, {
            $set: data,
        }
        )
    }
    static delete(id) {
        return User.deleteOne({ _id: objectId(id) })
    }
}

module.exports = UserModel
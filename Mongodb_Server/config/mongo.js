const { MongoClient } = require("mongodb");
const url = "mongodb://localhost:27017";
const dbName = "TestKozii";
const client = new MongoClient(url, { useUnifiedTopology: true });

var db;

function connect(callback) {
	client.connect(function (err) {
		if (err) {
			console.log(`Connection Failed`, err);
		} else {
			console.log(`Connection Success`);
			db = client.db(dbName);
		}
		callback(err);
	});
}

function getDatabase() {
	return db;
}

module.exports = {
	connect,
	getDatabase,
};

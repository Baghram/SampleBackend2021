require('dotenv').config({
    path: process.cwd() + '/.env'
})
const express = require('express');
const app = express()
const port = process.env.PORT || 3000;
const cors = require('cors')
const mongo = require('./config/mongo')
mongo.connect(function(err) {
	if (!err) {

		app.use(cors());
		const router = require("./routes");
		app.use(express.json());
		app.use(express.urlencoded({ extended: false }));
		app.use("/", router);
		app.listen(port, () => console.log(`Listening on port: ${port}!`));
	}
});
const env = process.env.NODE_ENV || 'development'

switch (env) {
    case 'test':
        require('dotenv').config({
            path: process.cwd() + './.env.test'
        })
        break;

    default:
        require('dotenv').config({
            path: process.cwd() + '/.env'
        })
        break;
}
console.log(env)
const app = require('../app')
const http = require('http').createServer(app)
http.listen(process.env.PORT, () => {
    console.log(`listening to port ${process.env.PORT}`)
})
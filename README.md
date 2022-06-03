# rubezhka
{
  "name": "shop-server",
  "version": "1.0.0",
  "description": "Интернет магазин
  ",
  "main": "index.js",
  "type": "module",
  "scripts": {
    "start": "node index.js",
    "start-dev": "nodemon index.js"
  },
  "keywords": [
    "Backend",
    "JavaScript",
    "Node.js",
    "Express.js"
  ],
  "author": "Жургунов Омар",
  "license": "ISC",
  "devDependencies": {
    "nodemon": "^2.0.15"
  },
  "dependencies": {
    "cors": "^2.8.5",
    "dotenv": "^10.0.0",
    "express": "^4.17.1",
    "pg": "^8.7.1",
    "pg-hstore": "^2.3.4",
    "sequelize": "^6.9.0"
  }
}
import express from 'express'

const PORT = 7000

const app = express()

app.listen(PORT, () => console.log('Сервер запущен на порту', PORT))
> npm run start-dev
[nodemon] 2.0.15
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,json
[nodemon] starting `node index.js`

PORT=7000Копировать

import config from 'dotenv/config'
import express from 'express'

const PORT = process.env.PORT || 5000

const app = express()

app.listen(PORT, () => console.log('Сервер запущен на порту', PORT))Копировать



import {Sequelize} from 'sequelize'

export default new Sequelize(
    process.env.DB_NAME, 
    process.env.DB_USER, 
    process.env.DB_PASS, 
    {
        dialect: 'postgres',
        host: process.env.DB_HOST,
        port: process.env.DB_PORT
    }
)Копировать
PORT=7000
DB_HOST=localhost
DB_NAME=online_store
DB_USER=postgres
DB_PASS=qwerty
DB_PORT=5432Копировать


import config from 'dotenv/config'
import express from 'express'
import sequelize from './sequelize.js'

const PORT = process.env.PORT || 5000

const app = express()

const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => console.log('Сервер запущен на порту', PORT))
    } catch(e) {
        console.log(e)
    }
}

start()

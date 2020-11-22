import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import mongoose from 'mongoose'
import morgan from 'morgan'
import pelajarRouter from './controllers/pelajarController.js'
import pengajarRouter from './controllers/pengajarController.js'
import kelasRouter from './controllers/kelasController.js'
import memberRouter from './controllers/membersController.js'

import verifytoken from './auth/validate-token.js'
import cors from 'cors'

const app = express()

//connect to db
mongoose.connect(process.env.MONGODB_URI,
    {useNewUrlParser: true, useUnifiedTopology: true,}
).then(() => {
    console.log('Connect to DB success')
}).catch(err => {
    console.log('Connect to DB failed ' + err)
})

// Middlewares
app.use(express.json())
app.use(morgan('dev'))
app.use(cors());

//routes
app.get('/', (req, res, next) => {
  res.json({
    message: 'success',
  })
})

// app.use('/api', router)
app.use('/api/pelajar', pelajarRouter)
app.use('/api/pengajar', pengajarRouter)
app.use('/api/kelas', verifytoken, kelasRouter)

app.use('/api/account', memberRouter)

var port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`App listens to port ${port}`);
})

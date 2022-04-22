import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import router from './route/route.js'
import path from 'path'
import multer from 'multer'

const upload = multer({ storage: multer.memoryStorage() })

var app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(router)
app.use(express.urlencoded())
app.use(express.json())

app.get('/', (req, res)=>{
    res.send('<h1>Express & Firestore</h1>')
})

app.listen(3210, () => {
    console.log('Server aktif @port 3210');
})

export default app
//config inicial
require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const app = express();



// forma de ler JSON / middlewares
app.use(
    express.urlencoded({
        extended: true
    })
)

app.use(express.json());

// rotas da API
const personRoutes = require('./routes/personRoutes')

app.use('/person', personRoutes)

//rota inicial / endpoint
app.get('/', (req, res) => {
    res.json({
        message: 'Oi Express!'
    })
})

//entregar uma porta

const DB_USER = process.env.DB_USER
const DB_PASS = encodeURIComponent(process.env.DB_PASS)

mongoose
    .connect(`mongodb+srv://${DB_USER}:${DB_PASS}@apicluster.rxkwhip.mongodb.net/bancodaapi?retryWrites=true&w=majority`)
    .then(() => {
        console.log('MongoDB conectado...')
    })
    .catch(err => console.log(err))
app.listen(3000)


//aHRFIEcvXuXez4Rg
// mongodb+srv://allanLobato:<password>@apicluster.rxkwhip.mongodb.net/bancodaapi?retryWrites=true&w=majority
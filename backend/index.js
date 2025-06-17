const express = require('express')
const mongoose = require('mongoose');
const session=require('express-session')
const bodyParser = require('body-parser')
const app = express()
const routes=require('./routes')
const cors=require('cors')
app.use(cors())
app.use(bodyParser.json())
app.use(session({secret:'thisissecret'}))
app.use('/',routes)

mongoose.connect('mongodb://localhost:27017/eventeasy', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("MONGO CONNECTION OPEN!!!")
    })
    .catch(err => {
        console.log("OH NO MONGO CONNECTION ERROR!!!!")
        console.log(err)
    })

app.listen(process.env.PORT || 5001, () => {
  console.log(
    `Server is ready at http://localhost:${process.env.PORT || 5001}`
  );
});
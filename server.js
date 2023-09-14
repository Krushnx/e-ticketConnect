const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
mongoose.connect(process.env.DB)
const app = express();
const cors = require('cors'); 

app.use(cors());



const db = mongoose.connection;

db.on('error' , (error)=>{console.log(error);});

db.once('open' , ()=>{console.log('Connection Successful');});

app.use(express.json());

const ticketroute = require('./routes/tickets');
app.use('/ticket' , ticketroute);

app.listen(8000, ()=>{
    console.log(`App listed on port http://localhost:8000`);
});

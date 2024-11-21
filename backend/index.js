const express = require("express")
const cors = require("cors");
//const UserModel = require('./models/adminSchema')
const UserModel = require('./models/adminSchema')
require('dotenv').config();
const mongoose = require('mongoose')

const dotenv = require("dotenv")
// const bodyParser = require("body-parser")
const app = express()
const Routes = require("./routes/route.js")



dotenv.config();

const PORT = process.env.PORT || 3000
const DATABASE_URL = process.env.DATABASE_URL || "mongodb+srv://tdharanidharan340:dharani6385372905@cluster1.bbev7.mongodb.net/?retryWrites=true&w=majority&appName=cluster1";
//const DATABASE_URL = process.env.DATABASE_URL || "mongodb://localhost:27017/";
console.log('Database URL:', process.env.DATABASE_URL);
// console.log('Database URL:', process.env.DATABASE_URL);
//app.use(bodyParser.json({ limit: '10mb', extended: true }))
//app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }))

app.use(express.json())
app.use(cors());
app.get("/getUsers", (req, res) => {
    UserModel.find({})
        .then(users => {
            console.log("Fetched users:", users);
            res.json(users);
        })
        .catch(err => {
            console.error("Error fetching users:", err);
            res.status(500).json({ error: err.message });
        });
});



//async function main () {
 //   await mongoose.connect('mongodb://127.0.0.1:27017/admin');
    
//}




mongoose.connect("mongodb://localhost:27017/admin")

//DATABA BASE CONNECTIO
// mongoose
//     .connect(DATABASE_URL,{
//         useNewUrlParser: true,
//         useUnifiedTopology: true
//     })
//     //(//process.env.DATABASE_URL, {
//         //useNewUrlParser: true,
//         //useUnifiedTcd opology: true
//     //}
//     .then(() => console.log("Connected to MongoDB"))
//     .catch((err) => console.log("NOT CONNECTED TO NETWORK", err))

app.use('/', Routes);
app.post('/AdminReg',(req, res) =>{
    const { name, email, password,collegeName,role } = req.body;
    if(!name || !email || !password || !collegeName) {
        return res.status(400).json({ message: 'Missing required fields' });
    }
    res.status(201).json({ message: 'Admin registered successfully', collegeName });
    //.then(users => res.json(users))
    //.catch(err => res.status(500).json({error: err.message}));
    });//.catch(function(err){
       // res.json(err)
    


app.listen(PORT, () => {
    console.log(`Server started at port no. ${PORT}`);
    console.log('Connected Sucessfully.');
})
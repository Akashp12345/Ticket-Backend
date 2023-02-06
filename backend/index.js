const mongoose = require('mongoose')
const bodyparser = require('body-parser')
const express = require('express')
const dotenv = require('dotenv').config()
const app = express()
const moviesModel = require("./model/moviesModel")
const userModel = require("./model/userModel")
app.use(express.json())
app.use(bodyparser.json())


mongoose.connect(process.env.MONGO_PATH)
    .then(() => console.log("Connected to database"))
    .catch(err => console.log(err))

app.post("/save", (req, res) => {
    let movies = new moviesModel({
        MovieName: req.body.MovieName,
        MovieRating: req.body.MovieRating,
        Poster: req.body.Poster,
        languages: req.body.languages,
        Desc: req.body.Desc,
        Seats: req.body.Seats
    })
    movies.save()
        .then(() => res.json({ message: "Inserted SuccessFully" }))
        .catch(() => console.log("err"))
})



app.post("/", async (req, res) => {

    try {
       
            let movies = await moviesModel.find({}, { _id: 0 })
            if (movies) {
                res.json({ Movies: movies })
            }
    }
    catch (err) {
        res.json({ message: "Error Occured" })
    }
})

app.post("/mybooking",async(req,res)=>{
    try{
let userfind=await userModel.findOne({username:req.body.username},{_id:0})
if(userfind){
    res.json({mybooking:userfind.mybooking})
}
else{
    console.log("user not found")
}

    }
    catch(err){
        console.log("error")
    }
})
app.post("/seats/:name", async (req, res) => {
    let seats = await moviesModel.findOne({ MovieName: req.params.name }, { _id: 0 })
    if (seats) {
        res.json({ Seat: seats.Seats })
    }
    else {
        res.json({ message: "Movies detail not found!" })
    }
})
app.post("/Checkout/:name", async (req, res) => {
    let username = req.body.username
    let mybook = req.body.mybooking
    let user = new userModel({
        username: username,
        mybooking: mybook
    })
    let userfind = await userModel.findOne({ username: username })
    if (userfind) {
        let obj = [
            ...userfind.mybooking,
            mybook
        ]
        let updatebooking = await userModel.updateOne({ username: username }, { mybooking: obj })
        if (updatebooking) {
            console.log("Updated")
        }
        else {
            console.log("Error")
        }
    }
    else {
        user.save()
            .then(res => console.log("user saved"))
            .catch(err => console.log(err))
    }

    let seatupdate = await moviesModel.updateOne({ MovieName: req.params.name }, { Seats: req.body.Seats })
    if (seatupdate) {
        res.json({ message: "Updated successfully" })
    }
    else {
        console.log("Error occured")
    }
})

app.listen(5090, () => {
    console.log("Connected to Server")
})
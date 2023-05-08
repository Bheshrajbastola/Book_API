require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const books_routes = require ('./routes/book-routes')
const user_routes = require ('./routes/user-routes')
 const { verifyUser } = require('./middleware/auth')


// reading .env file
const port =process.env.PORT


mongoose.connect('mongodb+srv://swikarbaastola:h5mEXRkt6AwB3A0V@cluster0.hxzvnhr.mongodb.net/?retryWrites=true&w=majority')
.then(()=>{
    console.log("Database Connected")
})
.catch((err)=> console.log(err))


const app = express()

app.use(express.json())


app.get('/',(req,res)=>{
    console.log(req)
    res.send("hellow world")

})

 app.use('/users',  user_routes)
// app.use (verifyUser)

app.use('/books', verifyUser,  books_routes)

//error handling 
app.use ((err,req,res,next)=>{
    console.error(err)
    if(err.name === 'ValidationError')res.status(400)
    else if(err.name === 'Cast Error')res.status(400)
    console.log(err.message)
    res.json({error :err.message })
})

//Unknown Path
app.use((req,res)=>{
    res.status(404).json({error : "path not found"})

})

app.listen(port,()=>{
    console.log(`server is runing at port  ${port}`)
})


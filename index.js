require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const books_routes = require ('./routes/book-routes')

const user = require('./data/user')

// reading .env file
const port =process.env.PORT

mongoose.connect('mongodb+srv://swikarbaastola:yYUPXkcPs6pF2Zmo@cluster0.gjyirme.mongodb.net/?retryWrites=true&w=majority')
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


app.use('/books',books_routes)
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


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


app.use('/api/books',books_routes)




app.listen(port,()=>{
    console.log(`server is runing at port  ${port}`)
})


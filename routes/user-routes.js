const express = require ('express')
const router = express.Router()
const User = require ('../model/user')
// const user = require('../model/user')
const bcrypt = require('bcrypt')
// const { hash } = require('bcrypt')

router.post('/register',(req,res,next)=>{
    const {username,password, fullname,email}=req.body
    User.findOne({username: req.body.username})
    .then((user)=>{
        if(user) return res.status(400).json({error:'duplicate username'})
        bcrypt.hash (password,10,(err,hash)=>{
            if(err) return res.status(500).json ({err: err.message})
            User.create({username, password:hash,fullname,email})
            .then ((user)=>{
                res.status(201).json(user)
            }).catch(next)
        })


    }).catch(next)
})

module.exports=router
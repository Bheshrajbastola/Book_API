const express = require('express')
const router = express.Router()
const User = require('../model/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');


// Get user by username
// router.get('/:username', (req, res, next) => {
//   User.findOne({ username: req.params.username })
//     .then((user) => {
//       if (!user) {
//         return res.status(404).json({ error: 'User not found' })
//       }
//       res.json(user)
//     })
//     .catch(next)
// })

// // // Get all users
router.get('/', (req, res, next) => {
  User.find()
    .then((users) => {
      res.json(users)
    })
    .catch(next)
})

// Create a new user
router.post('/register', (req, res, next) => {
  const { username, password, fullname, email } = req.body
  User.findOne({ username: req.body.username })
    .then((user) => {
      if (user) return res.status(400).json({ error: 'Duplicate username' })
      bcrypt.hash(password, 10, (err, hash) => {
        if (err) return res.status(500).json({ error: err.message })
        User.create({ username, password: hash, fullname, email })
          .then((user) => {
            res.status(201).json(user)
          })
          .catch(next)
      })
    })
    .catch(next)
})



// // Update user by username
// router.put('/:username', (req, res, next) => {
//     const { fullname, email, password } = req.body
//     bcrypt.hash(password, 10, (err, hash) => {
//       if (err) return res.status(500).json({ error: err.message })
//       User.findOneAndUpdate(
//         { username: req.params.username },
//         { fullname, email, password: hash },
//         { new: true }
//       )
//         .then((user) => {
//           if (!user) {
//             return res.status(404).json({ error: 'User not found' })
//           }
//           res.json(user)
//         })
//         .catch(next)
//     })
//   })

// // // Delete user by username
// router.delete('/:username', (req, res, next) => {
//   User.findOneAndDelete({ username: req.params.username })
//     .then((user) => {
//       if (!user) {
//         return res.status(404).json({ error: 'User not found' })
//       }
//       res.json(user)
//     }).catch(next)




    //login 

    router.post ('/login',(req,res,next)=>{
      User.findOne ({username:req.body.username})
      .then((user)=>{
        if(!user) return res.status (400).json({error:'user is not register'})
        bcrypt.compare(req.body.password, user.password,(err,sucess)=>{
          if(err) return res.status (500).json({error:err.message})
          if(!sucess) return res.status (400).json({error:'password doesnt match'}) 

          const payload ={
            id:user.id,
            username:user.username
          }

          jwt.sign(payload,process.env.SECRET,
            {expiresIn:'60d'},

            (err,token) =>{
              if(err) return res.status(500).json ({error:err.message})
              res.json({status:'sucess',token:token})

            })


        })


      }).catch(next)
    })
  




module.exports = router



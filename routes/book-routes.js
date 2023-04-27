// const express = require('express')
// const router = express .Router()
// const Book = require('../model/book');





// // this is main route for /api/books
// router.route('/')

//     // get all books 
//     .get((req, res , next) => {
//         Book.find()
//         .then(books => res.json(books))
//         .catch(next)


//         // try {
//         //     const books = await Book.find()
//         //     res.json(books)


            
//         // } catch (error) {
//         //     console.log(err)
            
//         // }

    
//     })








//     // add a book in the books list

//     .post((req, res , next) => {
//         Book.create (req.body)
//         .then((book)=> res.status(201).json(book))
//         .catch(next)

     
//     })

//     .put((req, res) => {
//         res.status(405).json({ "error": "PUT request is not allowed" });
//     })

//     .delete((req, res) => {
//         Book.deleteMany()
//         .then(reply => res.json(reply))
//         .catch(next)

//     });


// // path for /api/books/:book_id


// router.route('/:book_id')
// .get ((req,res)=>{
//     Book.findById(req.params.book_id)
//     .then((bool)=>{
//         if(!book){
//             res.status(404).json({error:'book not found'})
//         }
//     })
//     .catch(next)
// })



// .post((req,res)=>{
//     res.status(405).json({error:'Post request not allowed'})
// })
   
    
//     // update particular book
//     .put((req, res) => {
//         Book.findByIdAndUpdate(
//             req.params.book_id,
//             {$set:req.body},
//             {new : true}
//         ).then(updated => res.json(updated))
//         .catch(next)

//     })
    
//     // delete particular book
//     .delete((req, res) => {
//         Book.findByIdAndDelete(
//             req.params.book_id
//         )
//         .then(reply=>res.json(reply))
//         .catch(next)
//     })
   



// // export it to use in other file
// module.exports = router;

















// // app.get('/api/books' , (req,res)=>{
// //     res.json(books)
// // }) 




// //user fetching

// // app.get('/api/user',(req,res)=>{
// //     res.json(user)
// // })




// // //post book
// // app.post('/api/books' ,(req,res)=>{

// //     if (!req.body.title) {
// //         return res.status(400).json({erro:'title is missing'})
        
// //     }

// //     const id = books.length +1
// //     const book ={
// //         id: books.length +1,
// //         title:req.body.title,
// //         author:req.body.author || 'Anonymous'
// //     }

// //     books.push(book)
// //     res.json(book)

// // })


// // app.put('/api/books/:book_id',(req,res)=>{
// //     const updated_books = books.map((b)=>{
// //         if (b.id==req.params.book_id) {
// //             b.title =req.body.title,
// //             b.author=req.body.author
            
// //         }
// //         return b
// //     })

// //     res.json(updated_books)
    

// // })


// // app.delete('/api/books/:book_id',(req,res)=>{
// //     const updated_books = books.filter((b)=>{
// //         if (b.id == req.params.book_id) return b

        
// //     })
// //     res.json(updated_books)
// // })


// // //dynmic route

// // app.get('/api/books/:id',(req,res)=>{
// //     // console.log(req.params)
// //     const id= Number (req.params.id) 
// //     const book=books.find((b)=> b.id == id )
// //     res.json(book)

// // })

// // //user route
// // app.get('/api/user/:id',(req,res)=>{
// //     const id = Number (req.params.id)
// //     const users = user.find((u)=>u.id == id)
// //     res.json(users)
// // })





const express = require('express')
const router = express .Router()
const Book = require('../model/book');



// this is main route for /api/books
router.route('/')

    // get all books 
    .get((req, res , next) => {
        Book.find()
        .then(books => res.json(books))
        .catch(next)

        // method 2 - using asyn/await 

        // try {
        //     const books = await Book.find();
        //     res.json(books);
        // }
        // catch (error) {
        //     console.log(error);
        // }

    })

    // add a book in the books list

    .post((req, res, next) => {
        Book.create(req.body)
            .then(book => res.status(201).json(book))
            .catch(next);
    })

    .put((req, res, next) => {
        res.status(405).json({ "error": "PUT request is not allowed" });
    })
    .delete((req, res) => {
        Book.deleteMany()
            .then(() => res.status(201).json({ "message": "Deleted all successfully" }))
            .catch(next);
    });


// path for /api/books/:book_id
router.route('/:book_id')

    // get only specific book
    .get((req, res, next) => {
        Book.findById(req.params.book_id)
            .then(book => {
                // send this error handling if the book is not found
                if(!book){
                    res.status(404).json({error: "Book not found"});
                }
                res.json(book);
            })
            .catch(next);
    })

    // update particular book
    .put((req, res, next) => {
        Book.findByIdAndUpdate(
            req.params.book_id,  // find this id book
            { $set: req.body },  // update the changed data
            { new: true }  // return updated data not old one
        )
            .then(updatedBook => res.status(200).json(updatedBook))
            .catch(next)
    })

    // delete particular book
    .delete((req, res, next) => {
        Book.findByIdAndDelete(
            req.params.book_id
        )
            .then(() => res.status(204).end())
            .catch(err => {
                console.log(err);
                next(err);
            })
    })
    .post((req, res) => {
        res.status(405).json({ "error": "POST method is not allowed here" });
    });


// export it to use in other file
module.exports = router;
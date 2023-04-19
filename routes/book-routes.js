const express = require('express')
const books = require('../data/books')
const router = express .Router()





// this is main route for /api/books
router.route('/')

    // get all books 
    .get((req, res) => {
        // convert JSON code to string for readable to the network
        res.json(books);

    })

    // add a book in the books list

    .post((req, res) => {

        // send 400 status if the user send bad request or invalid data
        if (!req.body.title) {
            return res.status(400).json({ error: 'title is missing' });
        }

        // create id for that book according 
        const book_id = books.length + 1;

        const book = {
            id: book_id,
            title: req.body.title,
            author: req.body.author || 'Anonymous'  // if req.body.author is null, then add 'Anonymous'
        }

        // add book in the books list
        books.push(book);

        // send response with 201 status code ---> sth is created in the server side
        res.status(201).json(book);
    })

    .put((req, res) => {
        res.status(405).json({ "error": "PUT request is not allowed" });
    })
    .delete((req, res) => {
        res.json({});
    });


// path for /api/books/:book_id
router.route('/:book_id')

    // get only specific book
    .get((req, res) => {
        // convert String bookId into int because data type of id is int in books list 
        const bookId = Number(req.params.book_id);
        const bookDetail = books.find((singleBook) => singleBook.id === bookId);
        res.send(bookDetail);
        // res.json(req.params);
    })

    // update particular book
    .put((req, res) => {
        // convert String id into number id
        const bookId = Number(req.params.book_id);

        // const book = books.find(singleBook => );
        const updated_book = books.map(singleBook => {
            if (singleBook.id === bookId) {
                singleBook.title = req.body.title || singleBook.title;
                singleBook.author = req.body.author || singleBook.author;

            };
            return singleBook;
        });
        // console.log(book);
        res.status(201).json(updated_book);
    })

    // delete particular book
    .delete((req, res) => {
        const newBookList = books.filter(singleBook => {
            if (singleBook.id != req.params.book_id) return singleBook;
        });
        res.json(newBookList);
    })
    .post((req, res) => {
        res.status(405).json({ "error": "POST method is not allowed here" });
    });


// export it to use in other file
module.exports = router;

















// app.get('/api/books' , (req,res)=>{
//     res.json(books)
// }) 




//user fetching

// app.get('/api/user',(req,res)=>{
//     res.json(user)
// })




// //post book
// app.post('/api/books' ,(req,res)=>{

//     if (!req.body.title) {
//         return res.status(400).json({erro:'title is missing'})
        
//     }

//     const id = books.length +1
//     const book ={
//         id: books.length +1,
//         title:req.body.title,
//         author:req.body.author || 'Anonymous'
//     }

//     books.push(book)
//     res.json(book)

// })


// app.put('/api/books/:book_id',(req,res)=>{
//     const updated_books = books.map((b)=>{
//         if (b.id==req.params.book_id) {
//             b.title =req.body.title,
//             b.author=req.body.author
            
//         }
//         return b
//     })

//     res.json(updated_books)
    

// })


// app.delete('/api/books/:book_id',(req,res)=>{
//     const updated_books = books.filter((b)=>{
//         if (b.id == req.params.book_id) return b

        
//     })
//     res.json(updated_books)
// })


// //dynmic route

// app.get('/api/books/:id',(req,res)=>{
//     // console.log(req.params)
//     const id= Number (req.params.id) 
//     const book=books.find((b)=> b.id == id )
//     res.json(book)

// })

// //user route
// app.get('/api/user/:id',(req,res)=>{
//     const id = Number (req.params.id)
//     const users = user.find((u)=>u.id == id)
//     res.json(users)
// })

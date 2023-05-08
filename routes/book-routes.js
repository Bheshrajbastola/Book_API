
const express = require('express')
const router = express .Router()
const Book = require ('../model/book')


const bookController = require ('../controllers/book-contoller')
const reviewController = require ('../controllers/review-controller')

// this is main route for /api/books
router.route('/')

    // get all books 
    .get(bookController.getAllBooks)


        // method 2 - using asyn/await 

        // try {
        //     const books = await Book.find();
        //     res.json(books);
        // }
        // catch (error) {
        //     console.log(error);
        // }

    

    // add a book in the books list

    .post(bookController.createBooks)

    .put((req, res, next) => {
        res.status(405).json({ "error": "PUT request is not allowed" });
    })


    .delete(bookController.deleteAllBooks)


// path for /api/books/:book_id
router.route('/:book_id')

    // get only specific book
    .get(bookController.getBookbyId)

    // update particular book
    .put(bookController.updateBookbyId)

    // delete particular book
    .delete(bookController.deleteBookbyId)

    .post((req, res) => {
        res.status(405).json({ "error": "POST method is not allowed here" });
    });


    //book by reviewa

    router.route('/:book_id/reviews')
    
    .get(reviewController.getAllReview)

    


    .post(reviewController .createReview)

    .put((req, res, next) => {
        res.status(405).json({ "error": "PUT request is not allowed" });
    })

    .delete(reviewController.deleteAllReview)


    router.route('/:book_id/reviews/:review_id')


    .get(reviewController.getReviewById)

.put(reviewController.updateReviewById)


.delete(reviewController.deleteReviewById)

.post ((req,res)=>{
    res.status(405).json({error:"Post request is not allowed "})
})


// export it to use in other file
module.exports = router;
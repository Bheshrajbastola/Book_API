const Book = require ('../model/book')


const getAllBooks = (req, res , next) => {
    Book.find()
    .then(books => res.json(books))
    .catch(next)
}


const createBooks = (req,res,next)=>{
    Book.create()
    .then(books => res.json(books))
    .catch (next)
}

const deleteAllBooks = (req,res,next)=>{
    Book.deleteMany()
    .then(reply => res.json(reply))
    .catch (next)
}

//by id controller

const getBookbyId = (req, res, next) => {
    Book.findById(req.params.book_id)
        .then(book => {
            // send this error handling if the book is not found
            if(!book){
                res.status(404).json({error: "Book not found"});
            }
            res.json(book);
        })
        .catch(next);
}

const updateBookbyId =(req, res, next) => {
    Book.findByIdAndUpdate(
        req.params.book_id,  // find this id book
        { $set: req.body },  // update the changed data
        { new: true }  // return updated data not old one
    )
        .then(updatedBook => res.status(200).json(updatedBook))
        .catch(next)
}


const deleteBookbyId =(req, res, next) => {
    Book.findByIdAndDelete(
        req.params.book_id
    )
        .then(() => res.status(204).end())
        .catch(err => {
            console.log(err);
            next(err);
        })
}



module.exports ={
    getAllBooks,
    createBooks,
    deleteAllBooks,
    getBookbyId,
    updateBookbyId,
    deleteBookbyId
    
}
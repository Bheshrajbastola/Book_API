const Book = require ('../model/book')


const getAllReview = (req,res,next)=>{
    Book.findById(req.params.book_id)
    .then((book)=>{
        if(!book) return res.status (404).json({error:"book not found"})
        res.json(book.reviews)
    }).catch(next)
}


const createReview = (req,res,next)=>{
    Book.findById(req.params.book_id)
    .then((book)=>{
        if(!book) return res.status (404).json({error:"book not found"})
        const reviews={
            text:req.body.text
        }
        book.reviews.push(req.body)
        book.save()
        .then((book)=> res.status(201).json(book.reviews[book.reviews.length -1 ]))
        .catch(next)

    }).catch(next)


}


const deleteAllReview = (req,res,next)=>{
    Book.findById(req.params.book_id)
    .then((book)=>{
        if(!book) return res.status (404).json({error:"book not found"})
        book.reviews=[]
        book.save()
        .then((book)=> res.status(204).end())
        .catch(next)


    }).catch(next)
}


const getReviewById = (req,res,next)=>{
    Book.findById(req.params.book_id)
    .then(book=>{
        if(!book) return res.status (404).json({error:"book not found"})
        const reviews = book.reviews.id(req.params.review_id)
        if(!reviews) return res.status(404).json({error:'review not found'})
        res.json(review)


    }).catch(next)

}

const updateReviewById = (req,res,next)=>{
    Book.findById(req.params.book_id)
    .then(book=>{
        if(!book) return res.status (404).json({error:"book not found"})
        book.reviews=book.reviews.map((r)=>{
            if(r.id === req.params.review_id){
                r.text=req.body.text
            }
            return r
        })
        book.save()
        .then(book=>{
            res.json(book.reviews.id(req.params.review_id))
        }).catch(next)

    }).catch(next)
}

const deleteReviewById = (req,res,next)=>{
    Book.findById(req.params.book_id)
    .then(book=>{
        if(!book)
        return res.status(404).json({error:'book not found'})
        book.reviews = book.reviews.filter((r)=>{
            return r.id !== req.params.review_id
        })
        book.save()
        .then(book => res.status(204).end())
        .catch(next)
    }).catch(next)

}


module.exports ={
    getAllReview,
    createReview,
    deleteAllReview,
    getReviewById,
    updateReviewById,
    deleteReviewById






}
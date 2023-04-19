const user =[
    {
        id:1,
        Name:"Bhesh Raj",
        Address:"Balkot"
    },

    {
        id:2,
        Name:"Anjal khadka",
        Address:"Balkot"

    }
]

module.exports=user



// const app = express()

// app.use(express.json())

// router.route('/')
// .get((req,res)=>{
//     res.json(books)

// })

// .post((req,res)=>{




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
//     res.status(201).json(book)

// })

// .put ((req,res)=>{
//     res.status(405).json({erro:"put us not alloed"})
// })

// .delete((req,res)=>{
//     res.json({})
// })


// router.route('/:book_id')



// //get this book

// app.get('/api/books' , (req,res)=>{
//     res.json(books)
// }) 



// .get(
//     app.post('/api/books' ,(req,res)=>{

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

// )


// .post ((req,res)=>{

    

    
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
// })



// module.exports = router

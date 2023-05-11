const mongoose = require ('mongoose')

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required : true,
        minlength : 6,
        unique : true
    },
    password :{
        type : String,
        required: true
    },

    fullname:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },

    role:{
        type : String,
        enum : ['user','admin'],
        default :'user'
    },

    
    

})

//set tojson method to not to return hashed password

userSchema.set('toJSON'),{
    transfrom:(document,returnDocunment)=>{

        returnDocunment.id = document._id .toString()
        delete returnDocunment._id
        delete returnDocunment.password
    }
}


module.exports = new mongoose.model('User', userSchema)
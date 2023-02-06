const mongoose=require('mongoose')
const movieSchema=new mongoose.Schema({
    MovieName:{
        type:String
    },
    MovieRating:{
        type:String
    },
    Poster:{
        type:String
    },
    Desc:{
        type:String
    },
    languages:{
        type:Array
    },
    Seats:{
        type:Array,
        items:{
            type:Array,
            items:[
                {type:Object},
                {type:Array}
            ]
        }
    }
})
const moviesModel=mongoose.model("Movislist",movieSchema)
module.exports=moviesModel
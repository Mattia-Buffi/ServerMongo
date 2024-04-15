import { Schema , model } from "mongoose";
 const PostScheme= new Schema(
    { 
    category: {
        type:String,
        required: true,
    },
    title: {
        type:String,
        required: true,
    },
    cover: {
        type:String,
        required: true,
    },
    readTime: {
        value:{
            type:Number,
            required:false,
            },
        unit:{
            type:String,
            required:false,
            },
    },
    author: {
        nome: {
            type:String,
            required: true,
        },
        avatar: {
            type:String,
            required: true,
        },
    },
    content: {
        type:String,
        required: true,
    },
    },{
        collection:"posts"
    }
 );
 export default model("BlogPost",PostScheme);
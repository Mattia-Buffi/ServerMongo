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
        type: Schema.Types.ObjectId,
        ref:"Author",
    },
    content: {
        type:String,
        required: true,
    },
    comments: [{
        type: Schema.Types.ObjectId,
        ref:"Comment",
    }],
    likes: [{
        type: Schema.Types.ObjectId,
        ref:"Author",
    }],
    },{
        collection:"posts",
        timestamps:true,
    }
 );
 export default model("BlogPost",PostScheme);
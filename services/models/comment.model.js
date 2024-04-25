import { Schema , model } from "mongoose";

const CommentScheme=new Schema(
    { 
    author:{
        type: Schema.Types.ObjectId,
        ref:"Author"        
        },
    content:{
        type:String,
        require:true,
    },
    },{
        collection:"comments",
        timestamps:true
    }
)
export default model("Comment",CommentScheme);
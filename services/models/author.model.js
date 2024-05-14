import { Schema, model } from "mongoose";

//creo il modello di dato

const authorScheme = new Schema(
    {
        nome: {
            type:String,
            required: true,
        },
        cognome: {
            type:String,
            required: true,
        },
        email:{
            type:String,
            required: true,
        },
        googleId:{
            type:String,
            required:false
        },
        password:{
            type:String,
            required: false,
            select: false,
        },
        dataNascita: {
            type:String,
            required: false,
        },
        description: {
            type:String,
            required: false,
        },
        avatar: {
            type:String,
            required: false,
        },
        posts: [
            {type: Schema.Types.ObjectId,
            ref:"BlogPosts"}
        ],
        comments: [
            {type: Schema.Types.ObjectId,
            ref:"Comment"}
        ],
    },
    {
        collection:"authors"
    }
);
export default model("Author",authorScheme);
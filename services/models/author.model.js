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
        dataNascita: {
            type:String,
            required: true,
        },
        avatar: {
            type:String,
            required: true,
        },
    },
    {
        collection:"authors"
    }
);
export default model("Author",authorScheme);
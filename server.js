import express from "express";
import { config } from "dotenv";
import mongoose from "mongoose";
import cors from "cors"
import { authorRoute } from "./services/routes/author.routes.js";
import { postRoute } from "./services/routes/post.routes.js"
import { commentRoute } from "./services/routes/comment.routes.js";
import { authorizRoute } from "./services/routes/authoriz.routes.js";

//inizilizzare file .env
config();
//creazione del server e utilizzo dati json
const app=express();
app.use(express.json());
//cors
app.use(cors());

//importare le route
app.use("/sign",authorizRoute);

app.use("/authors",authorRoute);
app.use("/blogPosts",postRoute);
app.use("/comments",commentRoute);


//inizializzare server
const initServer= async ()=>{
    try{
        //mongo url da metter in file env per non publicizzare
        await mongoose.connect(process.env.MONGO_URL)
        console.log('Connesso al database')
        //abilito il server
        app.listen(process.env.PORT || 3001,()=>{
            console.log('Il server ascolta alla porta 3001');
        });
    }
    catch(err) {
        console.error('Connessione al database fallita!!', err);
    }
};
//invochiamo l'inizializzazione
initServer();

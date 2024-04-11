import express from "express";
import { config } from "dotenv";
import mongoose from "mongoose";
import { apiRoute } from "./services/routes/api.routes.js";

//inizilizzare file .env
config();
//creazione del server e utilizzo dati json
const app=express();
app.use(express.json());


//importare le route
app.use("/author",apiRoute);

//inizializzare server
const initServer= async ()=>{
    try{
        //mongo url da metter in file env per non publicizzare
        await mongoose.connect(process.env.MONGO_URL)
        console.log('Connesso al database')
        //abilito il server
        app.listen(process.env.PORT,()=>{
            console.log('Il server ascolta alla porta 3001');
        });
    }
    catch(err) {
        console.error('Connessione al database fallita!!', err);
    }
};
//invochiamo l'inizializzazione
initServer();

import { Router } from "express";
import Author from "../models/author.model.js";

//creo ed aposto il router
export const apiRoute= Router();

//definisco i comportmenti api
//lista completa autori
apiRoute.get("/", async (req,res,next)=>{
 try{
    let authors= await Author.find();
    res.send(authors)
 }catch(err){
    next(err)
 }
})
//autore specifico
apiRoute.get("/:id", async (req,res,next)=>{
    try{
       let author= await Author.findById(req.params.id);
       res.send(author)
    }catch(err){
       next(err)
    }
   })
//nuovo autore
apiRoute.post("/", async (req,res,next)=>{
    try{
        let author= await Author.create(req.body);
        res.send(author).status(400);
    }catch(err){
        next(err)
    }
    })
//modifica autore
apiRoute.put("/:id", async (req,res,next)=>{
    try{
        let author= await Author.findByIdAndUpdate(req.param.id,req.body,{ new:true});
        res.send(author).status(400);
    }catch(err){
        next(err)
    }
    })
    //elimino autore
    apiRoute.delete("/:id", async (req,res,next)=>{
        try{
            await Author.deleteOne({_id:req.params.id,});
            res.send("L'utente è stato eliminato correttamente").status(204);
        }catch(err){
            next(err)
        }
        })
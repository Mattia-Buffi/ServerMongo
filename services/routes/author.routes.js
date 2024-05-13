import { Router } from "express";
import Author from "../models/author.model.js";

import BlogPost  from "../models/blogpost.model.js"
import { authMiddleware } from "../authorization/index.js";

//creo ed aposto il router
export const authorRoute= Router();

//definisco i comportmenti api
//lista completa autori
authorRoute.get("/",authMiddleware, async (req,res,next)=>{
 try{
    let authors= await Author.find();
    res.send(authors)
 }catch(err){
    next(err)
 }
})
//autore specifico
authorRoute.get("/:id", async (req,res,next)=>{
    try{
       let author= await Author.findById(req.params.id).populate('posts');
       res.send(author)
    }catch(err){
       next(err)
    }
   })
// blogpost per utente specifico
authorRoute.get("/:id/blogPosts", async (req,res,next)=>{
    try{
       let author= await Author.findById(req.params.id).populate('posts');

    //    let blogs= await BlogPost.find({author:{name : author.nome}})
    // elimita poiche creato il referencinsg nel database
       res.send(author.posts)
    }catch(err){
       next(err)
    }
   })

//nuovo autore <-- SPOSTATA IN ROUTE SENZA AUTORIZZAZIONE
// authorRoute.post("/new",cloudinaryMiddleware, async (req,res,next)=>{  
//     try{
//         console.log(req.body.data)
//         let data= JSON.parse(req.body.data)
//         // let author= await Author.create({...data});
//         let author= await Author.create({...data, avatar: req.file.path});

//         res.send(author).status(201);
//         //registrare anche l'avatar
//     }catch(err){
//         next(err)
//     }
//     })
//modifica autore da sostituire con patch
authorRoute.put("/:id", async (req,res,next)=>{
    try{
        let author= await Author.findByIdAndUpdate(req.param.id,req.body,{ new:true});
        res.send(author).status(200);
    }catch(err){
        next(err)
    }
    })
//elimino autore 
authorRoute.delete("/:id", async (req,res,next)=>{
    try{
        await Author.deleteOne({_id:req.params.id,});
        res.send("L'utente è stato eliminato correttamente").status(204);
    }catch(err){
        next(err)
    }
    })

    //modifica dell'avatar OK Funziona
    authorRoute.patch("/:id/avatar",async(req,res,next)=>{
        try {
        let authorUP= await Author.findByIdAndUpdate(
            req.params.id,
            {avatar: req.file.path},
            {new:true}
        );
        res.send(authorUP)
        }catch(err){
            next(err)
        }
    })
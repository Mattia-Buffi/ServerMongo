import { Router } from "express";
import BlogPost  from "../models/blogpost.model.js"
import Author from "../models/author.model.js";

export const postRoute=Router();

//lista dei post
postRoute.get("/", async (req,res,next)=>{
    try{
       let posts= await BlogPost.find();
       res.send(posts)
    }catch(err){
       next(err)
    }
   });
//post specifico 
postRoute.get("/:id", async (req,res,next)=>{
    try{
       let post= await BlogPost.findOne({_id:req.params.id})
       res.send(post)
    }catch(err){
       next(err)
    }
   });
//inserimento nuovo post
postRoute.post("/:id", async (req,res,next)=>{
    try{
       let author= await Author.findById(req.params.id) 
       let post= await BlogPost.create({...req.body, author: author})
        author.posts.push(post._id)
        await author.save();
       res.send(post)
    }catch(err){
       next(err)
    }
   });
//modifica di un post esistente
postRoute.put("/:id", async (req,res,next)=>{
    try{
        let post= await BlogPost.findByIdAndUpdate(req.param.id,req.body,{ new:true});
        res.send(post).status(400);
    }catch(err){
        next(err)
    }
    });
//cancellazione di un articolo
postRoute.delete("/:id", async (res,req,next)=>{
    try{
        await BlogPost.findByIdAndDelete(req.params.id);
        res.send('Post cancellato').status(204)
    }catch(err){
        next(err)
    }
});
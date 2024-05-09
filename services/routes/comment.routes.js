import { Router } from "express";
import Author from "../models/author.model.js";
import Comment from "../models/comment.model.js"
import BlogPost  from "../models/blogpost.model.js"

//creo la route per gestire i commenti
export const commentRoute=Router();
//commento singolo
commentRoute.get('/:id',async (res,req,next)=>{
    try{
        let comment= await Comment.findById(req.params.id);
        res.send(comment).status(200);
    }catch(err){
        next(err)
    }
})
//tutti i commmenti relativi ad un post aspecifico 
commentRoute.get('/post/:id',async (res,req,next)=>{
    try{
        let comments= await Comment.find({postID:req.params.id});
        res.send(comments).status(200);
    }catch(err){
        next(err)
    }
})
//inserimento commento al post
commentRoute.post('/post/:id/new', async (req,res,next)=>{
    try{
        //id post nella route
        //author dal middleware con token
        let comment = await Comment.create({...req.body,postID:req.params.id});
        // author.comments.push(comment._id)
        res.send(comment).status(201);
    }catch(err){
        next(err)
    }
})

import { Router } from "express";
import Author from "../models/author.model.js";
import Comment from "../models/comment.model.js"
import BlogPost  from "../models/blogpost.model.js"
import { authMiddleware } from "../authorization/index.js";

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
commentRoute.post('/post/:id/new',authMiddleware, async (req,res,next)=>{
    try{
        //id post nella route
        //author dal middleware con token
        let author= await Author.findById(req.user._id)
        let post= await BlogPost.findById(req.params.id)
        let comment = await Comment.create({...req.body,postID:req.params.id,author:author});
        author.comments.push(comment._id)
        post.comments.push(comment._id)
        await author.save();
        await post.save();
        //ritorno lista completa di commenti
        let newComments= await BlogPost.findById(req.params.id).populate('comments').populate({ path:'comments',populate:{path:'author'}})
        res.send(newComments.comments).status(201);
    }catch(err){
        next(err)
    }
})
commentRoute.delete('/:id',authMiddleware,async(req,res,next)=>{
    try {
        let comment=await Comment.findById(req.params.id)
        let post = await BlogPost.findById(comment.postID)
        let author= await Author.findById(comment.author._id)
        author.comments = author.comments.filter(e=>e!==req.params.id)
        await author.save()
        post.comments = post.comments.filter(e=>e!==req.params.id)
        await post.save()
        
        await Comment.deleteOne({_id:req.params.id})
        //ritorno lista completa di commenti
        let newComments= await BlogPost.findById(post.id).populate('comments').populate({ path:'comments',populate:{path:'author'}})
        res.send(newComments.comments).status(201);
    } catch (err) {
        next(err)
    }
})

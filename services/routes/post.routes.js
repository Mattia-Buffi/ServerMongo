import { Router } from "express";
import BlogPost  from "../models/blogpost.model.js"
import Author from "../models/author.model.js";
import { authMiddleware } from "../authorization/index.js";
import upImage from "../middleware/multer.js";
export const postRoute=Router();

//lista dei post
postRoute.get("/home",authMiddleware, async (req,res,next)=>{
    try{
        //trovo tutti i post - popolo oggetto author con le voci di interesse
       let posts= await BlogPost.find().populate({ path: 'author', select: 'nome cognome avatar' })
       res.send(posts)
    }catch(err){
       next(err)
    }
   });
//post specifico 
postRoute.get("/:id",authMiddleware, async (req,res,next)=>{
    try{
       let post= await BlogPost.findOne({_id:req.params.id}).populate({ path: 'author', select: 'nome cognome avatar'})
                                                            .populate('comments')
                                                            .populate({ path:'comments',populate:{path:'author'}})
       res.send(post)
    }catch(err){
       next(err)
    }
   });
//inserimento nuovo post con id autore
postRoute.post("/new",authMiddleware,upImage.single('cover'),async (req,res,next)=>{
    try{
        let data= await JSON.parse(req.body.data)
        let author= await Author.findById(req.user._id) 
        let post= await BlogPost.create({...data, 
                                        author: author,
                                        cover: req.file.path})
        author.posts.push(post._id)
        await author.save();
       res.send(post)
    }catch(err){
       next(err)
    }
   });
//inserisco o tolgo il like
postRoute.post("/:id/liked",authMiddleware, async (req,res,next)=>{
    try{
        let postUP= await BlogPost.findById(req.params.id)
        if(postUP.likes.includes(req.user._id)) postUP.likes=postUP.likes.filter(e=>e!==req.user._id)
        else postUP.likes.push(req.user_id)
        await postUP.save()
        res.send(postUP.likes).status(200);
    }catch(err){next(err)}
})
//modifica di un post esistente
postRoute.put("/:id",authMiddleware, async (req,res,next)=>{
    try{
        let post= await BlogPost.findByIdAndUpdate(req.param.id,req.body,{ new:true});
        res.send(post).status(400);
    }catch(err){
        next(err)
    }
    });
//cancellazione di un articolo
postRoute.delete("/:id",authMiddleware, async (res,req,next)=>{
    try{
        await BlogPost.findByIdAndDelete(req.params.id);
        res.send('Post cancellato').status(204)
    }catch(err){
        next(err)
    }
});
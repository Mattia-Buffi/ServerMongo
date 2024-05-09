import { Router } from "express";
import Author from "../models/author.model.js";
import BlogPost from "../models/blogpost.model.js";
import cloudinaryMiddleware from "../middleware/multer.js"
import bcrypt from 'bcryptjs'
import { generateJWT } from "../authorization/index.js";

export const authorizRoute=Router();

//anteprima ultimi 3 post di accesso al blog
authorizRoute.get("/home", async (req,res,next)=>{
    try{
        //trovo tutti i post - popolo oggetto author con le voci di interesse
        //ordino per caricamento e limito a 3 per la home senza accesso
       let posts= await BlogPost.find().populate({ path: 'author', select: 'nome cognome avatar' })
                                // .sort({updatedAt:1})
                                // .limit(3);
       res.send(posts)
    }catch(err){
       next(err)
    }
   });
//rotte per accedere alla password di verifica e loging tramite token

//registrazione nuovo utente
authorizRoute.post("/new",cloudinaryMiddleware, async (req,res,next)=>{   
    try{
        let data= JSON.parse(req.body.data)
        let author= await Author.create({...data, 
                avatar: req.file.path,
                "password": await bcrypt.hash(data.password, 10),
            });
        res.send(author).status(201);
    }catch(err){
        next(err)
    }
    })

//rotta di log in per generazione del token
authorizRoute.post('/login',async (req,res,next)=>{
    try {
        //cerco lutente
        let user = await Author.findOne({email: req.body.email}).select('password nome cognome avatar')
        if(user){
            //verifico la pw comparando con la criptata
            let correctPW= await bcrypt.compare(req.body.password,user.password)
            if(correctPW){
                //corretta allora genero il token
                const token= await generateJWT({_id:user._id})
                //restituisco id e token
                res.status(202).send({author:user, token})
            }else{
                res.status(400).send('Password utente non cerretta')
            }

        }else{
            res.status(400).send('Utente non trovato')
        }

    } catch (error) {
        next(error)
    }
})
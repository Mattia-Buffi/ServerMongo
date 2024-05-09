import jwt from 'jsonwebtoken'
import Author from '../models/author.model.js'

//generazione del token 
export const generateJWT = (payload)=>{
    return new Promise ((resolve,reject)=>{
        jwt.sign(
            payload,process.env.JWT_SECRET,{expiresIn:"1d"},
            (err,token)=>{
                if(err){
                    reject(err);
                } else {
                    resolve(token)
                }
            }
        )
    })
}
//verifica del token con frase segreta
export const verifyJWT = (token)=>{
    return new Promise((resolve,reject)=>{
    jwt.verify(token,process.env.JWT_SECRET,
        (err,decoded)=>{
            if (err){
                reject(err)
            } else {
                resolve(decoded);
            }
        })
    })
}
//con questo middleware
export const authMiddleware=async (req,res,next)=>{
    //verifico ci sia il token
    if(!req.headers.authorization){
        res.status(400).send("Effettua il login");
    } else {
        try{
            //token presente 
            const decoded = await verifyJWT(req.headers.authorization.replace("Bearer ", ""))
            // Il token esiste? Verificamo attraverso la sua proprietà exp e le elimino 
            if(decoded.exp){
                delete decoded.iat;
                delete decoded.exp;
            // Andiamo a trovare l'utente con i dati del payload utilizzo _id
            const authorLog = await Author.findOne({...decoded})
            if(authorLog){
                //in questo modo ottengo tutti i dati utente alla route autenticate
                req.user=authorLog;
                next();
            }else{
                res.status(401).send("Utente non trovato");
            }
            }else{
                res.status(401).send("Rieffettua il login");
            }
        }catch(err){
            next(err)
        }
    }
}
import GoogleStrategy from 'passport-google-oauth20'
import { config } from "dotenv"
import Author from '../models/author.model.js'
import { generateJWT } from './index.js'

config();

const googleStrategy= new GoogleStrategy(
        {clientID:process.env.CLIENTID,
        clientSecret:process.env.CLIENTSECRET,
        callbackURL:process.env.CALLBACKURL},
    async (accessToken,refreshToken,profile,passportNext)=>{
        try {
            const { email, given_name, family_name, sub } = profile._json
            const user = await Author.findOne({ email })
            if (user) {
              const accessToken = await createAccessToken({
                _id: user._id
              })
              passportNext(null, { accessToken })
            } else {
              const newUser = new Author({
                nomee: given_name,
                cognome: family_name,
                email,
                googleId: sub,
              })
              await newUser.save()
              const accessToken = await generateJWT({
                _id: user._id
                })
              passportNext(null, { accessToken })
            }
          } catch (error) {
            passportNext(error)
          }
    }
)
export default googleStrategy
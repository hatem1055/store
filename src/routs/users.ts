import express,{Request,Response  } from "express";
import bodyParser from 'body-parser'
import {UsersModel,User} from  '../models/users'
import {auth} from  './middleware'

import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
const router = express.Router()
const store = new UsersModel()
dotenv.config()
router.use(bodyParser.json())
router.post('/user',async (req : Request,res : Response)=>{
    try{
        const {username,password} = req.body
        const userObj = {
            username,password_hash : password
        }
        const user = await store.create(userObj)
        const token = jwt.sign({user : user[0]},process.env.TOKEN_SECRET as string)
        res.send(token)
    }catch(err : any){
        res.status(500).send(err)
    }
})
router.post('/user/auth',async (req : Request,res : Response)=>{
    try{
        const {username,password} = req.body
        const token = await store.authinticate(username,password)
        res.send(token)
    }catch(err : any){
        res.status(500).send(err)
    }
})
router.get('/user',auth,async (req : Request,res : Response)=>{
    try{
        const {username,password} = req.body
        const users = await store.index()
        res.send(users)
    }catch(err : any){
        res.status(500).send(err)
    }
})
router.get('/user/:id',auth,async (req : Request,res : Response)=>{
    try{
        const user_id = parseInt(req.params.id)
        const users = await store.get_user(user_id)
        res.send(users)
    }catch(err : any){
        res.status(500).send(err)
    }
})
export default router
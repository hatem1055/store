import client from "../db";
import dotenv from 'dotenv'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import express,{Request,Response,NextFunction  } from "express";

dotenv.config()

export const auth = (req : Request,res : Response,next : NextFunction) =>{
    try{
        const auth = req.headers.authorization ? req.headers.authorization : ''
        const token = auth.split(' ')[1]
        jwt.verify(token, process.env.TOKEN_SECRET as string)
        console.log(jwt.decode(token))
        next()
    }catch(err){
        res.status(401)
        res.json('Access denied, invalid token')
        return
    }
}
import client from "../db";
import dotenv from 'dotenv'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
dotenv.config()
const {SALT_ROUNDS,BCRYPT_PASSWIRD,TOKEN_SECRET} = process.env
export type User  = {
    id? : Number;
    username : string;
    password_hash : string;
}


export class UsersModel{
    async authinticate(username : string,password : string):Promise<null | string>{
        try{
            const conn = await client.connect()
            const sql = 'SELECT password_hash,id,username FROM users WHERE username=($1);'
            const result = await conn.query(sql,[username])
            if (result.rowCount){
                const user = result.rows[0]
                if (bcrypt.compareSync(password + BCRYPT_PASSWIRD,user.password_hash)){
                    const token = jwt.sign({user_id : user.id}, TOKEN_SECRET as string,);
                    return token
                }
            }
        }catch(err){
            console.log(err)
            throw new Error('err')
        }

        return null
    }
    async index() : Promise<User[]>{
        try{
            const conn = await client.connect()
            const sql = 'SELECT * FROM users;'
            const result = await conn.query(sql)
            conn.release()
            return result.rows;
        }catch(err){
            throw new Error('err')
        }
    }
    async get_user(user_id : number) : Promise<User[]>{
        try{
            const conn = await client.connect()
            const sql = 'SELECT * FROM users WHERE id = $1;'
            const result = await conn.query(sql,[user_id])
            conn.release()
            return result.rows;
        }catch(err){
            throw new Error('err')
        }
    }
    async create(u : User) : Promise<string>{
        try{
            const conn = await client.connect()
            const sql = 'INSERT INTO users (username,password_hash) VALUES ($1,$2) RETURNING *;'
            const hash = bcrypt.hashSync(
                u.password_hash + BCRYPT_PASSWIRD, 
                parseInt(SALT_ROUNDS as string)
            );
            const result = await conn.query(sql,[u.username,hash])
            conn.release()
            const token = jwt.sign({user_id : result.rows[0].id}, TOKEN_SECRET as string);
            return token
        }catch(err :any){
            console.log(err)
            throw new Error(err)
        }
    }
}
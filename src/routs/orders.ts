import express,{Request,Response  } from "express";
import {OrdersStore,Order} from  '../models/orders'
import {auth} from  './middleware'
import jwt from 'jsonwebtoken'
const router = express.Router()
const store = new OrdersStore()
type TokenObj  = {
    user_id : number;
}

router.post('/order',auth,async (req : Request,res : Response)=>{
    try{
        const auth = req.headers.authorization ? req.headers.authorization : ''
        const token = auth.split(' ')[1]
        const token_obj = jwt.decode(token) as TokenObj
        const user_id = token_obj.user_id
        const {status} = req.body
        const lines = req.body.lines ? req.body.lines : []
        const orderObj = {
            status,user_id
        }
        const order = await store.create(orderObj,lines)
        res.send(order)
    }catch(err : any){
        res.status(500).send(err)
    }
})
router.post('/order/:id/products',auth,async (req : Request,res : Response)=>{
    try{
        const order_id = parseInt(req.params.id)
        const {product_id,quantity} = req.body
        const order = await store.addProduct(product_id,order_id,quantity)
        res.send(order)
    }catch(err : any){
        res.status(500).send(err)
    }
})
router.get('/user_orders',auth,async (req : Request,res : Response)=>{
    try{
        const auth = req.headers.authorization ? req.headers.authorization : ''
        const token = auth.split(' ')[1]
        const token_obj = jwt.decode(token) as TokenObj
        const user_id = token_obj.user_id
        const order = await store.get_product_by_user(user_id)
        res.send(order)
    }catch(err : any){
        res.status(500).send(err)
    }
})
export default router
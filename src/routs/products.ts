import express,{Request,Response  } from "express";
import {ProductStore,Product} from  '../models/products'
import {auth} from  './middleware'

const router = express.Router()
const store = new ProductStore()

router.post('/product',auth,async (req : Request,res : Response)=>{
    try{
        const {name,price} = req.body
        const productObj = {
            name,price
        }
        const product = await store.create(productObj)
        res.send(product)
    }catch(err : any){
        res.status(500).send(err)
    }
})
router.get('/product',async (req : Request,res : Response)=>{
    try{
        const product = await store.index()
        res.send(product)
    }catch(err : any){
        res.status(500).send(err)
    }
})
router.get('/product/:id',async (req : Request,res : Response)=>{
    try{
        const product_id = parseInt(req.params.id)
        const product = await store.get_product(product_id)
        res.send(product)
    }catch(err : any){
        res.status(500).send(err)
    }
})
export default router
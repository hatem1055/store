import express from "express";
import bodyParser from "body-parser";
import usersRouter from  './routs/users'
import productsRouter from  './routs/products'
import ordersRouter from  './routs/orders'

const app : express.Application = express()
usersRouter.use(bodyParser.json())
productsRouter.use(bodyParser.json())
ordersRouter.use(bodyParser.json())
app.use(usersRouter)
app.use(productsRouter)
app.use(ordersRouter)
app.listen(3000,()=>{
    console.log('done')
})
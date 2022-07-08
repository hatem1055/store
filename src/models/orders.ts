import client from "../db";

export type Order  = {
    id? : Number;
    status : string;
    user_id : Number;
}
export type OrderLine  = {
    product_id : number;
    quantity : number;
}
export type CompleteOrder = {
    order_status : string;
    user_id : Number;
    lines : OrderLine[];
}
export class OrdersStore{
    async index() : Promise<Order[]>{
        try{
            const conn = await client.connect()
            const sql = 'SELECT * FROM orders;'
            const result = await conn.query(sql)
            conn.release()
            return result.rows;
        }catch(err){
            throw new Error('err')
        }
    }
    async create(o:Order,lines : OrderLine[] = []) : Promise<Order[]>{
        try{
            const conn = await client.connect()
            let sql = `INSERT INTO orders (status,user_id) VALUES ($1,$2) RETURNING *;`
            const result = await conn.query(sql,[o.status,o.user_id])
            const order = result.rows[0] as Order
            for(const line of lines){
                await this.addProduct(line.product_id,order.id ? order.id : 0,line.quantity)
            }
            conn.release()
            return result.rows;
        }catch(err : any){
            throw new Error(err)
        }
    }
    async addProduct(product_id : number,order_id : Number,quantity : number) : Promise<Order[]>{
        try{
            const conn = await client.connect()
            let sql = `INSERT INTO orders_products (product_id,order_id,quantity) VALUES ($1,$2,$3);`
            const result = await conn.query(sql,[product_id,order_id,quantity])
            conn.release()
            return result.rows;
        }catch(err : any){
            throw new Error(err)
        }
    }
    async get_product_by_user(user_id : number) : Promise<CompleteOrder[]>{
        try{
            const conn = await client.connect()
            let sql = `SELECT * FROM orders WHERE user_id = ($1);`
            const result = await conn.query(sql,[user_id])
            const orders = result.rows
            let orders_to_return : CompleteOrder[] = []
            for (const order  of orders){
                let sql_for_line = 'SELECT * FROM products INNER JOIN orders_products ON products.id = orders_products.id WHERE order_id = ($1);'
                const result_for_line = await conn.query(sql_for_line,[order.id])
                let lines : OrderLine[]= []
                for (const row of result_for_line.rows){
                    lines.push({
                        product_id : row.product_id,
                        quantity : row.quantity
                    })
                }
                orders_to_return.push({
                    order_status : order.status,
                    user_id,
                    lines
                })
            }
            return orders_to_return;
        }catch(err : any){
            throw new Error(err)
        }

    }
}
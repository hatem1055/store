import client from "../db";
export type Product  = {
    id? : Number;
    name : string;
    price : number;
}
export class ProductStore{
    async index() : Promise<Product[]>{
        try{
            const conn = await client.connect()
            const sql = 'SELECT * FROM products;'
            const result = await conn.query(sql)
            conn.release()
            return result.rows;
        }catch(err){
            throw new Error('err')
        }
    }
    async get_product(product_id : number) : Promise<Product[]>{
        try{
            const conn = await client.connect()
            const sql = 'SELECT * FROM products WHERE id = $1;'
            const result = await conn.query(sql,[product_id])
            conn.release()
            return result.rows;
        }catch(err){
            throw new Error('err')
        }
    }
    async create(p:Product) : Promise<Product[]>{
        try{
            const conn = await client.connect()
            let sql = `INSERT INTO products (name,price) VALUES ($1,$2);`
            const result = await conn.query(sql,[p.name,p.price])
            conn.release()
            return result.rows;
        }catch(err : any){
            throw new Error(err)
        }
    }
}
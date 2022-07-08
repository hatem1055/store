import{OrdersStore,Order} from '../orders';
import{UsersModel,User} from '../users';
import{ProductStore,Product} from '../products';

import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
dotenv.config()
const store=new OrdersStore()
const users_store=new UsersModel()
const prducts_store=new ProductStore()

type TokenObj  = {
    user_id : number;
}
 async function create_order() : Promise<[Order[],Number]>{
    const token = await users_store.create({username : 'test',password_hash : 'test'});
    const token_obj = jwt.decode(token) as TokenObj
    const user_id = token_obj.user_id
    const result = await store.create({status : 'active',user_id})
    return [result,user_id]
}
describe("Orders Model",()=>{
 it('should have an index method',()=>{
   expect(store.index).toBeDefined();
 }),
 it('should have an get user method',()=>{
  expect(store.get_product_by_user).toBeDefined();
}),
 it('should have an create method',()=>{
  expect(store.create).toBeDefined();
}),
it('should have an auth method',()=>{
    expect(store.addProduct).toBeDefined();
  }),
it('create method should return order',async()=>{
  const result = await create_order()
  const  user_id = result[1] ? result[1]  : 0
  expect(result[0][0].status).toEqual('active');
}),
it('add product should return empty array',async()=>{
    await prducts_store.create({name : 'test',price : 10}); // to insure there is a product
    const order = await create_order()
    const result = await store.addProduct(1,order[0][0].id ? order[0][0].id : 0,10);
    expect(result).toEqual([]);
})});
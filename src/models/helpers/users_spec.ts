import{UsersModel,User} from '../users';
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
dotenv.config()
const store=new UsersModel()
type TokenObj  = {
    user_id : number;
}

describe("Users Model",()=>{
 it('should have an index method',()=>{
   expect(store.index).toBeDefined();
 }),
 it('should have an get user method',()=>{
  expect(store.get_user).toBeDefined();
}),
 it('should have an create method',()=>{
  expect(store.create).toBeDefined();
}),
it('should have an auth method',()=>{
    expect(store.authinticate).toBeDefined();
  }),
it('create method should return valid token',async()=>{
  const token = await store.create({username : 'test',password_hash : 'test'});
  jwt.verify(token, process.env.TOKEN_SECRET as string)
  expect(typeof(token).toLowerCase()).toEqual('string') // not authorized;
}),
it('create user and test geting it',async()=>{
    const token = await store.create({username : 'test',password_hash : 'test'});
    const token_obj = jwt.decode(token) as TokenObj
    const user_id = token_obj.user_id
    const result = await store.get_user(user_id);
    expect(result[0].username).toEqual('test');
})});
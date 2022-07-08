import{Product,ProductStore} from '../products';
const store=new ProductStore()
describe("Products Model",()=>{
 it('should have an index method',()=>{
   expect(store.index).toBeDefined();
 }),
 it('should have an get product method',()=>{
  expect(store.get_product).toBeDefined();
}),
 it('should have an create method',()=>{
  expect(store.create).toBeDefined();
}),
it('create method should return empty array and create record in the db',async()=>{
  const result=await store.create({
    'name' : 'test',
    'price' : 10
  });
  expect(result).toEqual([]);
}),
it('creta product and test geting it',async()=>{
  await store.create({
    'name' : 'test',
    'price' : 10
  });
  const result = await store.get_product(1);
  expect(result).toEqual([ { name: 'test', price: 10, id: 1 } ]);
})});
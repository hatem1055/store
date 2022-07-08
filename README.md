enviroment variables:
    POSTGRES_HOST = 127.0.0.1
    POSTGRES_DB = store
    POSTGRES_DB_TEST = store_test
    POSTGRES_USER = <POSTGRES_USER>
    POSTGRES_PASSWORD =  <POSTGRES_PASSWORD>
    ENV=dev
    BCRYPT_PASSWIRD=<BCRYPT_PASSWIRD>
    SALT_ROUNDS=10
    TOKEN_SECRET=<BCRYPT_PASSWIRD>

commands : 
    migrate up : db-migrate up
    start : npm run start
    build : npm run build
    test : npm run test
Endpoints :
    note : if endpoint is token required then you have to put the token in the header "authorization : Bearer <token>"
    products :
        GET /product => array of all products
        GET /product/:id => product with this id
        [token required] POST /product :
            body : {name,price}
            returns : empty array
    Users : 
        POST /user :
            body : {username,password}
            return token
        POST /user/auth : 
            bady : {uasername,password}
            return token
        [token required] GET /user => array of users
        [token required] GET /user/id => user with this id
    Orders : 
        [token required] POST /order : 
            note : user_id is decoded from the token
            body : {status,lines? : [{product_id,quantity}]}
            returns : order info
        [token required] POST /order/:id/ :
            body : {product_id,quantity}
            returns : []
        [token required] GET /user_orders:
            note : user_id is decoded from the token
            returns : [
                {
                    order_status,user_id,lines : [
                        {product_id,quantity}
                    ]
                }
            ]
        
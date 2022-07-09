# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index (GET /product)
- Show (args: product id) (/product/:id)
- Create (args: Product)[token required] (POST /product)
- [OPTIONAL] Top 5 most popular products 
- [OPTIONAL] Products by category (args: product category)

#### Users
- Index GET[token required]  (/user/)
- Show (args: id)[token required] GET (/user/:id)
- Create (args: User) (POST /user )

#### Orders
- Current Order by user (args: user id)[token required] ( GET /user_orders)
- [OPTIONAL] Completed Orders by user (args: user id)[token required]
### database schema 
#### products
- id <primary serial key>
- name <varchar>
- price <integer>

#### users
- id <primary serial key>
- username <varchar>
- password <varchar>

#### orders
- id <primary serial key>
- user_id <refrence key>
- status of order (active or complete) <varchar>
### orders_products
- id <primary serial key>
- product_id <refrence key>
- order_id <refrence key>
- quantity <integer>


## Data Shapes
#### Product
-  id
- name
- price
- [OPTIONAL] category

#### User
- id
- firstName
- lastName
- password

#### Orders
- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (active or complete)


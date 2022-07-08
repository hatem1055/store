CREATE TABLE orders_products (
quantity integer,
order_id bigint REFERENCES orders(id),
product_id bigint REFERENCES products(id),
id SERIAL PRIMARY KEY);
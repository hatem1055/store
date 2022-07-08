CREATE TABLE orders (
status VARCHAR(64) not null,user_id bigint REFERENCES users(id),
id SERIAL PRIMARY KEY);
CREATE TABLE customer (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  phone INTEGER NOT NULL,
  special_instructions TEXT
);

CREATE TABLE menu_item (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50),
  description TEXT,
  image VARCHAR(255),
  price FLOAT,
  item_quantity INTEGER
);

CREATE TABLE customer_order (
  id SERIAL PRIMARY KEY,
  customer_id INTEGER REFERENCES customer(id),
  price FLOAT NOT NULL,
  order_created_at TIMESTAMP,
  menu_id INTEGER REFERENCES menu_item(id)
);






---------------------
-- Create Database --
---------------------
CREATE DATABASE ecomm;

-------------------------
-- Connect to Database --
-------------------------
\c ecomm

-------------------
-- Create Tables --
-------------------
CREATE TABLE products(
  id SERIAL PRIMARY KEY,
  name VARCHAR,
  description VARCHAR,
  price INTEGER
);

CREATE TABLE images(
  id SERIAL PRIMARY KEY,
  uri VARCHAR UNIQUE,
  alt VARCHAR
);

CREATE TABLE products_images(
  p_id INTEGER REFERENCES products(id),
  i_id INTEGER REFERENCES images(id)
);

CREATE TABLE tags(
  id SERIAL PRIMARY KEY,
  name VARCHAR UNIQUE
);

CREATE TABLE products_tags(
  p_id INTEGER REFERENCES products(id),
  t_id INTEGER REFERENCES tags(id)
);

CREATE TABLE users(
  id SERIAL PRIMARY KEY,
  first VARCHAR,
  last VARCHAR,
  email VARCHAR,
  username VARCHAR,
  password VARCHAR
);

CREATE TABLE sessions(
  id SERIAL PRIMARY KEY,
  token VARCHAR,
  created VARCHAR,
  expires VARCHAR,
  u_id INTEGER REFERENCES users(id)
);

CREATE TABLE carts(
  id SERIAL PRIMARY KEY,
  u_id INTEGER REFERENCES users(id)
);

CREATE TABLE products_carts(
  p_id INTEGER REFERENCES products(id),
  c_id INTEGER REFERENCES carts(id)
);

CREATE TABLE purchases(
  id SERIAL PRIMARY KEY,
  u_id INTEGER REFERENCES users(id)
);

CREATE TABLE products_purchases(
  pr_id INTEGER REFERENCES products(id),
  pu_id INTEGER REFERENCES purchases(id)
);

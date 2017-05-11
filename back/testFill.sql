----------------------
-- API TESTING DATA --
----------------------

-- Products
INSERT INTO products values(default,'UNC Ceiling Roof Champion Tee','Ceiling. Roof. Champion.',30);
INSERT INTO products values(default,'National Championship Hat','National Championship Hat',28);
INSERT INTO products values(default,'National Championship Hoodie','National Championship Locker Room Hoodie',75);
INSERT INTO products values(default,'National Championship Locker Room Tee','National Championship Locker Room Tee',35);
INSERT INTO products values(default,'UNC Hoodie','UNC Hoodie',40);

-- Images
INSERT INTO images values(default,'/images/ceiling_roof.jpg','Ceiling Roof');
INSERT INTO images values(default,'/images/nat_champ_hat.jpg','National Championship Hat');
INSERT INTO images values(default,'/images/nat_champ_hood.jpg','National Championship Hoodie');
INSERT INTO images values(default,'/images/nat_champ_locker_room.jpg','National Championship Locker Room Tee');
INSERT INTO images values(default,'/images/unc_hood.jpg','UNC Hoodie');

-- Product/Image Links
INSERT INTO products_images values(1,1);
INSERT INTO products_images values(2,2);
INSERT INTO products_images values(3,3);
INSERT INTO products_images values(4,4);
INSERT INTO products_images values(5,5);

-- Tags
INSERT INTO tags values(default,'UNC');
INSERT INTO tags values(default,'National Championship');
INSERT INTO tags values(default,'Tee Shirt');
INSERT INTO tags values(default,'Hoodie');
INSERT INTO tags values(default,'Hat');

-- Product/Tag Links
INSERT INTO products_tags values(1,1);
INSERT INTO products_tags values(1,2);
INSERT INTO products_tags values(1,3);
INSERT INTO products_tags values(2,1);
INSERT INTO products_tags values(2,2);
INSERT INTO products_tags values(2,5);
INSERT INTO products_tags values(3,1);
INSERT INTO products_tags values(3,2);
INSERT INTO products_tags values(3,4);
INSERT INTO products_tags values(4,1);
INSERT INTO products_tags values(4,2);
INSERT INTO products_tags values(4,3);
INSERT INTO products_tags values(5,1);
INSERT INTO products_tags values(5,4);

-- Carts
INSERT INTO carts values(default,1);
INSERT INTO carts values(default,2);
INSERT INTO carts values(default,3);

-- Cart/Product Links
INSERT INTO products_carts values(1,1);
INSERT INTO products_carts values(2,1);
INSERT INTO products_carts values(3,1);
INSERT INTO products_carts values(4,1);
INSERT INTO products_carts values(5,1);
INSERT INTO products_carts values(3,2);
INSERT INTO products_carts values(4,2);
INSERT INTO products_carts values(5,2);
INSERT INTO products_carts values(3,3);
INSERT INTO products_carts values(4,3);
INSERT INTO products_carts values(5,3);

-- Purchases
INSERT INTO purchases values(default,1);

-- Purchase/Product Links
INSERT INTO products_purchases values(1,1);
INSERT INTO products_purchases values(3,1);
INSERT INTO products_purchases values(5,1);

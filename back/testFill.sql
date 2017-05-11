----------------------
-- API TESTING DATA --
----------------------

-- Products
INSERT INTO products values(default,'product 1','test product 1',5);
INSERT INTO products values(default,'product 2','test product 2',5);
INSERT INTO products values(default,'product 3','test product 3',5);
INSERT INTO products values(default,'product 4','test product 4',5);
INSERT INTO products values(default,'product 5','test product 5',5);
INSERT INTO products values(default,'product 6','test product 6',5);
INSERT INTO products values(default,'product 7','test product 7',5);

-- Images
INSERT INTO images values(default,'/test/i1','test image 1');
INSERT INTO images values(default,'/test/i2','test image 2');
INSERT INTO images values(default,'/test/i3','test image 3');
INSERT INTO images values(default,'/test/i4','test image 4');
INSERT INTO images values(default,'/test/i5','test image 5');
INSERT INTO images values(default,'/test/i6','test image 6');
INSERT INTO images values(default,'/test/i7','test image 7');

-- Product/Image Links
INSERT INTO products_images values(1,1);
INSERT INTO products_images values(1,2);
INSERT INTO products_images values(1,3);
INSERT INTO products_images values(1,4);
INSERT INTO products_images values(1,5);
INSERT INTO products_images values(1,6);
INSERT INTO products_images values(1,7);
INSERT INTO products_images values(2,1);
INSERT INTO products_images values(2,2);
INSERT INTO products_images values(3,3);
INSERT INTO products_images values(3,4);
INSERT INTO products_images values(4,5);
INSERT INTO products_images values(4,6);
INSERT INTO products_images values(5,7);

-- Tags
INSERT INTO tags values(default,'tag 1');
INSERT INTO tags values(default,'tag 2');
INSERT INTO tags values(default,'tag 3');
INSERT INTO tags values(default,'tag 4');
INSERT INTO tags values(default,'tag 5');

-- Product/Tag Links
INSERT INTO products_tags values(1,1);
INSERT INTO products_tags values(1,2);
INSERT INTO products_tags values(1,3);
INSERT INTO products_tags values(1,4);
INSERT INTO products_tags values(1,5);
INSERT INTO products_tags values(2,1);
INSERT INTO products_tags values(2,2);
INSERT INTO products_tags values(3,3);
INSERT INTO products_tags values(3,4);
INSERT INTO products_tags values(4,5);

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

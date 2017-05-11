const express = require('express');
const bcrypt = require('bcrypt');
const cors = require('cors');
const bodyParser = require('body-parser');
const uuid = require('uuid');
const app = express();
const pgp = require('pg-promise')();
const config = require('./config');
const db = pgp(config.db);

app.use(bodyParser.json());
app.use(cors());

// GET /api/products
// Returns all product data (including images and tags)
app.get('/api/products', (req,res,next) => {
  db.any('select * from products')
    .then((data) => {
      let result_set = data.map(full_product);
      return Promise.all(result_set);
    })
    .then((results) => {
      results = results.map((element, idx) => {
        return {
          product: element[0],
          images: element[1],
          tags: element[2]
        };
      });
      res.json(results);
    })
    .catch(next);
});

// GET /api/product/:id
// Returns data for single product (including images and tags)
app.get('/api/product/:id', (req,res,next) => {
  let product_id = req.params.id;
  db.one('select * from products where id = $1', [product_id])
    .then(full_product)
    .then((results) => {
      results =  {
        product: results[0],
        images: results[1],
        tags: results[2]
      };
      res.json(results);
    })
    .catch(next);
});

// POST /api/user/signup
// Creates new user accounts, returns standard login response
app.post('/api/user/signup', (req,res,next) => {
  let new_account = req.body.signup;
  db.none('select * from users where username = $1 or email = $2', [new_account.username,new_account.email])
    .then(() => {
      return bcrypt.hash(new_account.password, 10);
    })
    .then((hash) => {
      return Promise.all([new_account, db.one('insert into users values(default,$1,$2,$3,$4,$5) returning *', [new_account.first,new_account.last,new_account.email,new_account.username,hash])]);
    })
    .then(validate_login)
    .then((result) => {
      res.json(result);
    })
    .catch(next);
});

// POST /api/user/login
// Logs in users, returns standard login response
app.post('/api/user/login', (req,res,next) => {
  let login = req.body.login;
  Promise.all([login, db.one('select * from users where username = $1', [login.username])])
    .then(validate_login)
    .then((result) => {
      res.json(result);
    })
});

// AUTHENTICATION MIDDLEWARE
// Authenticate the token provided as part of the request
app.use(function authenticate(req,res,next) {
  db.one('select * from sessions where token=$1', [req.body.token])
    .then((data) => {
      return db.one('select id,first,last,email,username from users where id=$1', [data.u_id])
    })
    .then((data) => {
      req.user = data;
      next();
    })
    .catch((err) => {
      res.send('Unauthenticated user, please log in.');
    });
});

// POST /api/shopping_cart/add
// Adds item to shopping cart
app.post('/api/shopping_cart/add', (req,res,next) => {
  let user = req.body.user;
  let product = req.body.product;
  db.one('select * from carts where u_id = $1', [user])
    .then((data) => {
      return db.none('insert into products_carts values($1,$2)', [product,data.id]);
    })
    .then(() => {
      result = {
        success: true,
        message: `Product ${product} has been added to the Cart of User ${user}`
      };
      res.json(result);
    })
    .catch(next);
});

// POST /api/shopping_cart/all
// Returns all items in a specific shopping cart
app.post('/api/shopping_cart/all', (req,res,next) => {
  let user = req.body.user;
  db.any('select p_id as id from carts as c inner join products_carts as pc on(c.id = pc.c_id) where u_id = $1', [user])
    .then((data) => {
      let results = data.map((element) => {
        return db.one('select * from products where id = $1', [element.id]);
      });
      return Promise.all(results);
    })
    .then((data) => {
      let result_set = data.map(full_product);
      return Promise.all(result_set);
    })
    .then((results) => {
      results = results.map((element, idx) => {
        return {
          product: element[0],
          images: element[1],
          tags: element[2]
        };
      });
      res.json(results);
    })
    .catch(next);
});

// POST /api/shopping_cart/checkout
// Creates purchase record, links item in cart to purchase, and clears the shopping cart
app.post('/api/shopping_cart/checkout', (req,res,next) => {
  let user = req.body.user;
  db.one('insert into purchases values(default,$1) returning id', [user])
    .then((data) => {
      return Promise.all([data.id, db.any('select p_id as id,c.id as cart from carts as c inner join products_carts as pc on(c.id = pc.c_id) where u_id = $1', [user])]);
    })
    .then((result) => {
      let inserts = result[1].map((element) => {
        return Promise.all([element.cart, db.none('insert into products_purchases values($1,$2)', [element.id, result[0]])]);
      });
      return Promise.all(inserts);
    })
    .then((results) => {
      let drops = results.map((element) => {
        return db.none('delete from products_carts where c_id = $1', [element[0]])
      });
      return Promise.all(drops);
    })
    .then(() => {
      result = {
        success: true,
        message: `Purchase has been completed`
      };
      res.json(result);
    })
    .catch(next);
});

// Server listens on port 4040
app.listen(4040, () => {
  console.log('API running on port 4040');
});

//////////////////////
// HELPER FUNCTIONS //
//////////////////////

// Get full product record including images and tags for a specific product
function full_product(element) {
  let pic_promise = db.any('select i.uri, i.alt from products_images as pi inner join images as i on(pi.i_id = i.id) where pi.p_id = $1', [element.id]);
  let tag_promise = db.any('select t.name from products_tags as pt inner join tags as t on(pt.t_id = t.id) where pt.p_id = $1', [element.id]);
  return Promise.all([element, pic_promise, tag_promise]);
}

// Verify that login attempt is valid
function validate_login(attempted) {
  let data = attempted[1];
  let attempt = attempted[0];
  return bcrypt.compare(attempt.password, data.password)
    .then((res) => {
      if (res) {
        let x = Date.now();
        let y = x+21600000;
        return db.one('insert into sessions values(default,$1,$2,$3,$4) returning *', [uuid.v4(),x,y,data.id])
      } else {
        reject();
      }
    })
    .then((result) => {
      return {
        username: data.username,
        first: data.first,
        last: data.last,
        token: result.token
      };
    })
    .catch((err) => {throw err});
}

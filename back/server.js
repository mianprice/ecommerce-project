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
      let result_set = data.map((element,idx) => {
        let pic_promise = new Promise((resolve,reject) => {
          db.any('select i.uri, i.alt from products_images as pi inner join images as i on(pi.i_id = i.id) where pi.p_id = $1', [element.id])
            .then((data) => {
              resolve(data);
            }).catch(reject);
        });
        let tag_promise = new Promise((resolve,reject) => {
          db.any('select t.name from products_tags as pt inner join tags as t on(pt.t_id = t.id) where pt.p_id = $1', [element.id])
            .then((data) => {
              resolve(data);
            }).catch(reject);
        });
        return Promise.all([element, pic_promise, tag_promise]);
      });
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
    .then((data) => {
      let pic_promise = new Promise((resolve,reject) => {
        db.any('select i.uri, i.alt from products_images as pi inner join images as i on(pi.i_id = i.id) where pi.p_id = $1', [data.id])
          .then((data) => {
            resolve(data);
          }).catch(reject);
      });
      let tag_promise = new Promise((resolve,reject) => {
        db.any('select t.name from products_tags as pt inner join tags as t on(pt.t_id = t.id) where pt.p_id = $1', [data.id])
          .then((data) => {
            resolve(data);
          }).catch(reject);
      });
      return Promise.all([data, pic_promise, tag_promise]);
    })
    .then((results) => {
      result =  {
        product: results[0],
        images: results[1],
        tags: results[2]
      };
      res.json(results);
    })
    .catch(next);
});

app.get('/api/user/signup', (req,res,next) => {

});

app.get('/api/user/login', (req,res,next) => {

});

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

app.get('/api/shopping_cart', (req,res,next) => {

});

app.get('/api/shopping_cart', (req,res,next) => {

});

app.get('/api/shopping_cart/checkout', (req,res,next) => {

});

// Server listens on port 4040
app.listen(4040, () => {
  console.log('Server running on port 4040');
});

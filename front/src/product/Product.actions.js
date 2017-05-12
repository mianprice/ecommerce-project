import $ from 'jquery';
import {hashHistory} from 'react-router';

export const fetchPage = (id) => {
  let asyncAction = function(dispatch) {
    $.ajax({
      method: 'GET',
      url: 'http://localhost:4040/api/product/' + id.toString()
    })
    .then(data => dispatch(updatePage(data)))
    .catch(resp => dispatch(pageError(resp)))
  };
  return asyncAction;
};

export const addToCart = (login, id) => {
  if (login.token === "") {
    hashHistory.push('/login');
    return {type: 'do_nothing'};
  } else {
    let asyncAction = function(dispatch) {
      $.ajax({
        method: 'POST',
        url: `http://localhost:4040/api/shopping_cart/add`,
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify({
          user: login.id,
          token: login.token,
          product: id
        })
      })
      .then(data => dispatch(addedToCart(data)))
      .catch(resp => dispatch(pageError(resp)))
    };
    return asyncAction;
  }
};

function addedToCart(data) {
  return {
    type: 'added_to_cart',
    payload: data
  };
}

function updatePage(result) {
  return {
    type: 'show_product',
    payload: result
  };
}

function pageError(resp) {
  let error = (resp && resp.responseJSON && resp.responseJSON.message) || 'Something went wrong!';
  return {type: 'page_error', error: error};
}

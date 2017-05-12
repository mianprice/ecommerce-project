import $ from 'jquery';
import {hashHistory} from 'react-router';

export const showCart = (login) => {
  let asyncAction = function(dispatch) {
    $.ajax({
      method: 'POST',
      url: `http://localhost:4040/api/shopping_cart/all`,
      dataType: 'json',
      contentType: 'application/json',
      data: JSON.stringify({
        user: login.id,
        token: login.token
      })
    })
    .then(data => dispatch(updateCart(data)))
    .catch(resp => dispatch(pageError(resp)))
  };
  return asyncAction;
};

export const startCheckout = () => {
  return {
    type: 'start_checkout'
  };
}

export const checkout = (login, checkout) => {
  let asyncAction = function(dispatch) {
    $.ajax({
      method: 'POST',
      url: `http://localhost:4040/api/shopping_cart/checkout`,
      dataType: 'json',
      contentType: 'application/json',
      data: JSON.stringify({
        user: login.id,
        token: login.token,
        checkout: checkout
      })
    })
    .then(data => dispatch(clearCart(data)))
    .catch(resp => dispatch(pageError(resp)))
  };
  return asyncAction;
}

export const updateValue = (id,value) => {
  return {
    type: 'update_checkout',
    id,
    value
  };
};

function updateCart(data) {
  return {
    type: 'update_cart',
    payload: data
  };
}

function clearCart(data) {
  return {
    type: 'clear_cart',
    payload: data
  };
}

function pageError(resp) {
  let error = (resp && resp.responseJSON && resp.responseJSON.message) || 'Something went wrong!';
  return {type: 'page_error', error: error};
}

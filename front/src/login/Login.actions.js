import $ from 'jquery';
import {hashHistory} from 'react-router';

export const sendLogin = (login) => {
  let asyncAction = function(dispatch) {
    $.ajax({
      method: 'POST',
      url: `http://localhost:4040/api/user/login`,
      dataType: 'json',
      contentType: 'application/json',
      data: JSON.stringify({
        login: {
          username: login.username,
          password: login.password
        }
      })
    })
    .then(data => dispatch(updateToken(data)))
    .catch(resp => dispatch(pageError(resp)))
  };
  return asyncAction;
};

export const updateValue = (id,value) => {
  return {
    type: 'update_login',
    id,
    value
  };
};

function updateToken(results) {
  hashHistory.push('/');
  return {
    type: 'token_return',
    payload: results
  };
}

function pageError(resp) {
  let error = (resp && resp.responseJSON && resp.responseJSON.message) || 'Something went wrong!';
  return {type: 'page_error', error: error};
}

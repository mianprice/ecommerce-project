import $ from 'jquery';
import {hashHistory} from 'react-router';

export const sendSignup = (signup) => {
  if (signup.password === signup.password_confirm) {
    let asyncAction = function(dispatch) {
      $.ajax({
        method: 'POST',
        url: `http://localhost:4040/api/user/signup`,
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify({
          signup: {
            username: signup.username,
            password: signup.password,
            email: signup.email,
            first: signup.first,
            last: signup.last
          }
        })
      })
      .then(data => dispatch(updateToken(data)))
      .catch(resp => dispatch(pageError(resp)))
    };
    return asyncAction;
  } else {
    return {
      type: 'password_unmatch'
    };
  }
};

export const updateValue = (id,value) => {
  return {
    type: 'update_signup',
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

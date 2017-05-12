import $ from 'jquery';

export const showAll = () => {
  let asyncAction = function(dispatch) {
    $.ajax({
      method: 'GET',
      url: `http://localhost:4040/api/products`
    })
    .then(data => dispatch(updatePage(data)))
    .catch(resp => dispatch(pageError(resp)))
  };
  return asyncAction;
};

function updatePage(results) {
  return {
    type: 'show_all',
    payload: results
  };
};

function pageError(resp) {
  let error = (resp && resp.responseJSON && resp.responseJSON.message) || 'Something went wrong!';
  return {type: 'page_error', error: error};
}

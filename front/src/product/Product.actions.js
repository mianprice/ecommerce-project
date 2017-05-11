import $ from 'jquery';

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

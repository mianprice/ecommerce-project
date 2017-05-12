const INITIAL = {
  username: null,
  password: null,
  token: null,
  first: null,
  last: null
};

export default function reducer(state=INITIAL, action) {
  if (action.type === 'token_return') {
    return Object.assign({}, INITIAL, {
      token: action.payload.token,
      first: action.payload.first,
      last: action.payload.last
    });
  } else if (action.type === 'logout') {
    return INITIAL;
  } else if (action.type === 'login_error') {
    return Object.assign({}, INITIAL, {
      error: true,
      message: 'Login attempt failed.  Please try again'
    });
  }
  return state;
}

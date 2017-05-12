const INITIAL = {
  username: "",
  password: "",
  token: "",
  first: "",
  last: ""
};

export default function reducer(state=INITIAL, action) {
  if (action.type === 'token_return') {
    return Object.assign({}, state, {
      token: action.payload.token,
      first: action.payload.first,
      last: action.payload.last,
      password: ""
    });
  } else if (action.type === 'update_login') {
    let v = action.value;
    let i = action.id;
    let s = JSON.parse(JSON.stringify(state));
    s[i] = v;
    return s;
  } else if (action.type === 'logout') {
    return INITIAL;
  } else if (action.type === 'login_error') {
    return Object.assign({}, INITIAL, {
      error: true,
      message: 'Login attempt failed.  Please try again'
    });
  } else if (action.type === 'login_cookie') {
    return Object.assign({}, INITIAL, action.payload);
  }
  return state;
}

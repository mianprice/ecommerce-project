const INITIAL = {
  username: "",
  password: "",
  password_confirm: "",
  email: "",
  first: "",
  last: ""
};

export default function reducer(state=INITIAL, action) {
  if (action.type === 'update_signup') {
    let v = action.value;
    let i = action.id;
    let s = JSON.parse(JSON.stringify(state));
    s[i] = v;
    return s;
  } else if (action.type === 'password_unmatch') {
    return Object.assign({}, state, {
      message: "Passwords don't match.",
      error: true
    });
  }
  return state;
}

const INITIAL = {
  items: [],
  checkout: {
    l1: "",
    l2: "",
    l3: "",
    city: "",
    state: "",
    zip: ""
  }
};

export default function reducer(state=INITIAL, action) {
  if (action.type === 'update_cart') {
    return Object.assign({}, state, {
      items: action.payload
    });
  } else if (action.type === 'clear_cart') {
    return Object.assign({}, state, {
      checked_out: true,
      checking_out: false
    });
  } else if (action.type === 'add_to_cart') {
    return Object.assign({}, state, {
      items: [],
      success: action.payload.success,
      message: action.payload.message
    });
  } else if (action.type === 'start_checkout') {
    return Object.assign({}, state, {
      checking_out: true
    });
  } else if (action.type === 'update_checkout') {
    let v = action.value;
    let i = action.id;
    let c = JSON.parse(JSON.stringify(state.checkout));
    c[i] = v;
    return Object.assign({}, state, {
      checkout: c
    });
  } else if (action.type === 'checked_out') {
    return Object.assign({}, state, {
      checked_out: true
    });
  } else if (action.type === 'checkout_done') {
    return INITIAL;
  }
  return state;
}

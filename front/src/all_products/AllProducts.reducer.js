const INITIAL = {
  products: []
};

export default function reducer(state=INITIAL, action) {
  if (action.type === 'show_all') {
    console.log(action.payload);
    return Object.assign({}, state, {
      products: action.payload
    });
  }
  return state;
}

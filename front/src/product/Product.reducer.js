const INITIAL = {};

export default function reducer(state=INITIAL, action) {
  if (action.type === 'show_product') {
    return action.payload;
  }
  return state;
}

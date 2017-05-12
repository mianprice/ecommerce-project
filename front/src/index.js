import React from 'react';
import ReactDOM from 'react-dom';
import * as Redux from 'redux';
import * as ReactRedux from 'react-redux';
import ReduxThunk from 'redux-thunk';
import {Router, Route, hashHistory, Link, IndexRoute, IndexLink} from 'react-router';
import './index.css';
import AllProductsContainer from './all_products/AllProducts';
import AllProductsReducer from './all_products/AllProducts.reducer';
import ProductContainer from './product/Product';
import ProductReducer from './product/Product.reducer';
import SignupContainer from './signup/Signup';
import SignupReducer from './signup/Signup.reducer';
// import SignupContainer from './signup/Signup';
// import signupReducer from './signup/Signup.reducer';
// import LoginContainer from './login/Login';
// import loginReducer from './login/Login.reducer';

const reducer = Redux.combineReducers({
  all: AllProductsReducer,
  product: ProductReducer,
  signup: SignupReducer
});

const store = Redux.createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  Redux.applyMiddleware(ReduxThunk)
);

class AppLayout extends React.Component {
  render() {
    return (
      <div>
        <div className="nav">
          <div><IndexLink to="/" activeClassName="active" className="base_link">Home</IndexLink></div>
          <div><Link to="/signup" activeClassName="active" className="base_link">Sign Up</Link></div>
        </div>
        <div className="page_body">
          {this.props.children}
        </div>
      </div>
    );
  }
}

const AppLayoutContainer = ReactRedux.connect(
  state => ({state})
)(AppLayout);

ReactDOM.render(
  <ReactRedux.Provider store={store}>
    <Router history={hashHistory}>
      <Route path="/" component={AppLayoutContainer}>
        <IndexRoute component={AllProductsContainer}/>
        <Route path="/product/:id" component={ProductContainer}/>
        <Route path="/signup" component={SignupContainer}/>
      </Route>
    </Router>
  </ReactRedux.Provider>,
  document.getElementById('root')
);

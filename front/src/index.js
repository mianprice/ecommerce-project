import React from 'react';
import ReactDOM from 'react-dom';
import * as Redux from 'redux';
import * as ReactRedux from 'react-redux';
import ReduxThunk from 'redux-thunk';
import {persistStore, autoRehydrate} from 'redux-persist'
import CookieStorage from 'redux-persist-cookie-storage'
import {Router, Route, hashHistory, Link, IndexRoute, IndexLink} from 'react-router';
import './index.css';
import AllProductsContainer from './all_products/AllProducts';
import AllProductsReducer from './all_products/AllProducts.reducer';
import ProductContainer from './product/Product';
import ProductReducer from './product/Product.reducer';
import SignupContainer from './signup/Signup';
import SignupReducer from './signup/Signup.reducer';
import LoginContainer from './login/Login';
import LoginReducer from './login/Login.reducer';
import CartContainer from './cart/Cart';
import CartReducer from './cart/Cart.reducer';

const reducer = Redux.combineReducers({
  all: AllProductsReducer,
  product: ProductReducer,
  signup: SignupReducer,
  login: LoginReducer,
  cart: CartReducer
});

const store = Redux.createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  Redux.compose(Redux.applyMiddleware(ReduxThunk), autoRehydrate())
);

persistStore(store, { storage: new CookieStorage() })

class AppLayout extends React.Component {
  render() {
    let links = this.props.state.login.token ? (
      <div className="nav" onClick={(event) => {this.props.dispatch({type: 'checkout_done'})}}>
        <div><IndexLink to="/" activeClassName="active" className="base_link">Home</IndexLink></div>
        <div><div className="base_info">Hello, {this.props.state.login.first}!</div></div>
        <div><Link to="/cart" activeClassName="active" className="base_link">View Cart</Link></div>
        <div><div onClick={(event) => {this.props.dispatch({type:'logout'})}} className="base_link">Logout</div></div>
      </div>
    ) : (
      <div className="nav">
        <div><IndexLink to="/" activeClassName="active" className="base_link">Home</IndexLink></div>
        <div><Link to="/signup" activeClassName="active" className="base_link">Sign Up</Link></div>
        <div><Link to="/login" activeClassName="active" className="base_link">Log In</Link></div>
      </div>
    );
    return (
      <div>
        {links}
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
        <Route path="/login" component={LoginContainer}/>
        <Route path="/cart" component={CartContainer}/>
      </Route>
    </Router>
  </ReactRedux.Provider>,
  document.getElementById('root')
);

import React from 'react';
import * as ReactRedux from 'react-redux';
import * as actions from './Cart.actions';
import {Link} from 'react-router';

class Cart extends React.Component {
  componentDidMount() {
    this.props.showCart(this.props.login);
  }
  render() {
    let total = 0;
    let checkout = (
      <div className="checking_out">
        <div className="form_group">
          <div className="form_label">Shipping Address Line 1: </div>
          <div className="form_input">
            <input id="l1" type="text" value={this.props.cart.checkout.l1} onChange={(event) => {this.props.updateValue(event.target.id,event.target.value);}} />
          </div>
        </div>
        <div className="form_group">
          <div className="form_label">Shipping Address Line 2: </div>
          <div className="form_input">
            <input id="l2" type="text" value={this.props.cart.checkout.l2} onChange={(event) => {this.props.updateValue(event.target.id,event.target.value);}} />
          </div>
        </div>
        <div className="form_group">
          <div className="form_label">Shipping Address Line 3: </div>
          <div className="form_input">
            <input id="l3" type="text" value={this.props.cart.checkout.l3} onChange={(event) => {this.props.updateValue(event.target.id,event.target.value);}} />
          </div>
        </div>
        <div className="form_group">
          <div className="form_label">City: </div>
          <div className="form_input">
            <input id="city" type="text" value={this.props.cart.checkout.city} onChange={(event) => {this.props.updateValue(event.target.id,event.target.value);}} />
          </div>
        </div>
        <div className="form_group">
          <div className="form_label">State: </div>
          <div className="form_input">
            <input id="state" type="text" value={this.props.cart.checkout.state} onChange={(event) => {this.props.updateValue(event.target.id,event.target.value);}} />
          </div>
        </div>
        <div className="form_group">
          <div className="form_label">ZIP: </div>
          <div className="form_input">
            <input id="zip" type="text" value={this.props.cart.checkout.zip} onChange={(event) => {this.props.updateValue(event.target.id,event.target.value);}} />
          </div>
        </div>
        <div className="form_group">
          <div className="form_submit base_link" onClick={(event) => {this.props.checkout(this.props.login, this.props.cart.checkout)}}>Submit</div>
        </div>
      </div>
    );
    let thanks = (
      <div className="thanks">Your order has been placed.  Thanks for your business!</div>
    );
    let all = this.props.cart.items.map((element,idx) => {
      total += parseInt(element.product.price);
      let image = element.images.length > 0 ? (<img src={element.images[0].uri} alt={element.images[0].alt} />) : "";
      return (
        <Link to={'/product/' + element.product.id} className="product" key={idx} >
          <div className="p_name">
            {element.product.name}
          </div>
          <div className="p_image">
            {image}
          </div>
          <div className="p_desc">
            {element.product.description}
          </div>
          <div className="p_price">
            ${element.product.price}
          </div>
        </Link>
      );
    });
    return (
      <div className="cart">
        <div className="all_products">
          {this.props.cart.checking_out ? checkout : (this.props.cart.checked_out ? thanks : all)}
        </div>
        {this.props.cart.checking_out || this.props.cart.checked_out ? (
          <div></div>
        ) : (
          <div className="form_group">
            <div className="form_submit base_link">Grand Total: ${total}</div>
            <div className="form_submit base_link" onClick={(event) => {this.props.startCheckout()}}>Checkout</div>
          </div>
        )}
      </div>
    );
  }
}

const CartContainer = ReactRedux.connect(
  state => ({
    cart: state.cart,
    login: state.login
  }),
  actions
)(Cart);

export default CartContainer;

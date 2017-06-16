import React from 'react';
import * as ReactRedux from 'react-redux';
import * as actions from './AllProducts.actions';
import {Link} from 'react-router';

class AllProducts extends React.Component {
  componentDidMount() {
    this.props.showAll();
  }
  render() {
    let all = this.props.all.products.map((element) => {
      let image = element.images.length > 0 ? (<img src={element.images[0].uri} alt={element.images[0].alt} />) : "";
      return (
        <Link to={'/product/' + element.product.id} className="product" key={element.product.id} >
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
      <div className="all_products">
        {all}
      </div>
    );
  }
}

const AllProductsContainer = ReactRedux.connect(
  state => ({
    all: state.all
  }),
  actions
)(AllProducts);

export default AllProductsContainer;

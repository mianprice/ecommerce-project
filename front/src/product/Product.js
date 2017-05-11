import React from 'react';
import * as ReactRedux from 'react-redux';
import * as actions from './Product.actions';

class Product extends React.Component {
  componentDidMount() {
    this.props.fetchPage(this.props.params.id);
  }
  render() {
    if (this.props.product.product) {
      let product = this.props.product;
      let tags = product.tags.map((element, idx) => {
        return <div className="tag" key={idx}>{element.name}</div>;
      });
      let image = product.images.length > 0 ? (<img src={product.images[0].uri} alt={product.images[0].alt} />) : "";
      return (
        <div className="single_product" key={product.product.id}>
          <div className="p_name">
            {product.product.name}
          </div>
          <div className="p_image">
            {image}
          </div>
          <div className="p_desc">
            {product.product.description}
          </div>
          <div className="add_to_cart">Add To Cart</div>
          <div className="p_price">
            ${product.product.price}
          </div>
          <div className="p_tags">
            Tags:
            {tags}
          </div>
        </div>
      );
    } else {
      return null;
    }
  }
}

const ProductContainer = ReactRedux.connect(
  state => ({
    product: state.product
  }),
  actions
)(Product);

export default ProductContainer;

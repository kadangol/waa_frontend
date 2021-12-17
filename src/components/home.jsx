import React from 'react'
import { connect } from 'react-redux';
import Product from './product';
import { getProducts } from '../actions/itemActions'
import '../styling/home.css';
function Home({ fetchProduct, allProducts }) {
  React.useEffect(() => {
    fetchProduct()
  }, [])

  return (
    <div className="home">
      <img
        className="home-image"
        src="https://m.media-amazon.com/images/S/al-na-9d5791cf-3faf/f522dc9e-97ad-4add-80e0-84ef44aa63f4.jpg"
        alt=""
      />

      <div className="home-row">
        {(allProducts || []).map((product) => (
          <div className="product-container" key={product.id}>
            <Product
              id={product.id}
              title={product.name}
              price={product.pricePerUnit}
              rating={4}
              image="https://m.media-amazon.com/images/I/714bAHH6LrL._AC_UY218_.jpg"
              description={product.description}
            ></Product>
          </div>
        ))}
      </div>
    </div>
  );
}


const mapStateToProps = (state) => {
  return {
    allProducts: state.itemReducer.allProducts,
  };
};


const mapDispatchToProps = (dispatch) => {
  return {
    fetchProduct: () => dispatch(getProducts()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);

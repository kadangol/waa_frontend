import React from 'react'
import Product from './product';
import '../styling/home.css';
function Home() {
    return (
      <div className="home">
        <img
          className="home-image"
          src="https://m.media-amazon.com/images/S/al-na-9d5791cf-3faf/f522dc9e-97ad-4add-80e0-84ef44aa63f4.jpg"
          alt=""
        />

        <div className="home-row">
          <div className="product-container">
            <Product
              id="121314"
              title="Shoe"
              price={11.96}
              rating={4}
              image="https://m.media-amazon.com/images/I/714bAHH6LrL._AC_UY218_.jpg"
              description={
                "Doulove Passport and Vaccine Card Holder Combo, Passport Holder with Vaccine Card Slot, PU Leather Passport Cover Case for Women Men, Turquoise"
              }
            ></Product>
          </div>
          <div className="product-container">
            <Product
              id="121314"
              title="Shoe"
              price={11.96}
              rating={4}
              image="https://m.media-amazon.com/images/I/714bAHH6LrL._AC_UY218_.jpg"
            ></Product>
          </div>
          <div className="product-container">
            <Product
              id="121314"
              title="Shoe"
              price={11.96}
              rating={4}
              image="https://m.media-amazon.com/images/I/714bAHH6LrL._AC_UY218_.jpg"
            ></Product>
          </div>
          <div className="product-container">
            <Product
              id="121314"
              title="Shoe"
              price={11.96}
              rating={4}
              image="https://m.media-amazon.com/images/I/714bAHH6LrL._AC_UY218_.jpg"
            ></Product>
          </div>

          <div className="product-container">
            <Product
              id="121314"
              title="Shoe"
              price={11.96}
              rating={4}
              image="https://m.media-amazon.com/images/I/714bAHH6LrL._AC_UY218_.jpg"
            ></Product>
          </div>
        </div>
      </div>
    );
}

export default Home;

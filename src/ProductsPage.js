import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import productData from './productData';

const ProductsPage = () => {
  const navigate = useNavigate();

  const addToCart = (productName, price) => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingProductIndex = cart.findIndex(item => item.productName === productName);

    if (existingProductIndex !== -1) {
      cart[existingProductIndex].quantity++;
    } else {
      cart.push({ productName, price, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${productName} has been added to your cart!`);
  };

  const proceedToCheckout = () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart.length > 0) {
      navigate('/checkout');
    } else {
      alert("Your cart is empty. Add items before checking out!");
    }
  };

  const viewCart = () => {
    navigate('/cart');
  };

  return (
    <div>
      <header>
        <h1>EcoFriendly Marketplace</h1>
        <div className="header-buttons">
          <button className="cart-button" onClick={viewCart}>🛒 View Cart</button>
          <button className="checkout-button" onClick={proceedToCheckout}>💳 Checkout</button>
        </div>
      </header>

      <section className="product-section">
        <h2>Our Eco-Friendly Products</h2>
        <div className="products">
          {Object.entries(productData).map(([key, product]) => (
            <div className="product-card" key={key}>
              <a href="#" onClick={(e) => {
                e.preventDefault();
                navigate(`/product-detail?product=${key}`);
              }}>
                <img src={product.image} alt={product.name} height="290" />
                <h3>{product.name}</h3>
              </a>
              <p>₹{product.price}</p>
              <button onClick={() => addToCart(product.name, product.price)}>
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ProductsPage;
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import productData from './productData';

const ProductDetailPage = () => {
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const productKey = searchParams.get('product');
    if (productKey && productData[productKey]) {
      setProduct(productData[productKey]);
    }
  }, [location]);

  const addToCart = () => {
    if (!product) return;

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingProductIndex = cart.findIndex(item => item.productName === product.name);

    if (existingProductIndex !== -1) {
      cart[existingProductIndex].quantity++;
    } else {
      cart.push({ productName: product.name, price: product.price, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${product.name} has been added to your cart!`);
  };

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div>
      <header style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#2ecc71',
        padding: '20px',
        color: 'white'
      }}>
        <h1>EcoFriendly Marketplace</h1>
        <button 
          className="cart-button" 
          onClick={() => navigate('/cart')}
          style={{
            backgroundColor: 'transparent',
            border: 'none',
            fontSize: '24px',
            color: 'white'
          }}
        >
          🛒 View Cart
        </button>
      </header>

      <section id="product-details" style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}>
        <img 
          src={product.image} 
          alt={product.name}
          style={{
            width: '300px',
            height: 'auto',
            marginBottom: '20px'
          }}
        />
        <h2 style={{ fontSize: '24px', marginBottom: '10px' }}>{product.name}</h2>
        <p style={{ fontSize: '18px', color: '#2ecc71', marginBottom: '10px' }}>
          ₹{product.price}
        </p>
        <p style={{ fontSize: '16px', color: '#555', marginBottom: '20px' }}>
          {product.description}
        </p>
        <button 
          onClick={addToCart}
          style={{
            backgroundColor: '#2ecc71',
            color: 'white',
            padding: '10px 20px',
            border: 'none',
            cursor: 'pointer',
            fontSize: '16px',
            borderRadius: '5px'
          }}
        >
          Add to Cart
        </button>
      </section>
    </div>
  );
};

export default ProductDetailPage;
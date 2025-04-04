import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
  const [cart, setCart] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = () => {
    const cartData = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(cartData);
    calculateSubtotal(cartData);
  };

  const calculateSubtotal = (cartData) => {
    const total = cartData.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    setSubtotal(total);
  };

  const updateTotal = (index, quantity) => {
    const updatedCart = [...cart];
    updatedCart[index].quantity = parseInt(quantity);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    calculateSubtotal(updatedCart);
  };

  const removeItem = (index) => {
    const updatedCart = [...cart];
    updatedCart.splice(index, 1);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    calculateSubtotal(updatedCart);
  };

  const proceedToCheckout = () => {
    if (cart.length > 0) {
      navigate('/checkout');
    } else {
      alert("Your cart is empty. Please add some items to your cart before proceeding.");
    }
  };

  return (
    <div style={{ 
      fontFamily: 'Arial, sans-serif',
      margin: 0,
      padding: 0,
      backgroundColor: '#f4f4f4',
      minHeight: '100vh'
    }}>
      
      {/* Header with green background */}
      <header style={{
        backgroundColor: '#4CAF50',
        padding: '20px 40px',
        color: 'white',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <h1 style={{ margin: 0 }}>EcoFriendly Marketplace</h1>
        <a href="#" onClick={(e) => {
            e.preventDefault();
            navigate('/products');
          }}>Continue Shopping</a>
      </header>

      <section className="cart-section" style={{ padding: '40px', textAlign: 'center' }}>
        <h2>Your Shopping Cart</h2>

        <table className="cart-table" style={{ width: '100%', marginTop: '20px', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#ddd' }}>
              <th style={{ padding: '10px' }}>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            {cart.length === 0 ? (
              <tr>
                <td colSpan="5" style={{ padding: '20px' }}>Your cart is empty.</td>
              </tr>
            ) : (
              cart.map((item, index) => (
                <tr key={index} style={{ borderBottom: '1px solid #ccc' }}>
                  <td style={{ padding: '10px' }}>{item.productName}</td>
                  <td>₹{item.price}</td>
                  <td>
                    <input 
                      type="number" 
                      value={item.quantity} 
                      min="1" 
                      style={{ width: '60px', padding: '5px' }}
                      onChange={(e) => updateTotal(index, e.target.value)}
                    />
                  </td>
                  <td>₹{item.price * item.quantity}</td>
                  <td>
                    <button 
                      style={{ backgroundColor: '#ff4d4d', color: 'white', border: 'none', padding: '6px 10px', borderRadius: '4px', cursor: 'pointer' }}
                      onClick={() => removeItem(index)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        <div className="cart-summary" style={{ marginTop: '30px', textAlign: 'left', maxWidth: '400px', margin: '30px auto' }}>
          <div style={{ marginBottom: '10px' }}>
            <strong>Subtotal:</strong> ₹{subtotal}
          </div>
          <div style={{ marginBottom: '10px' }}>
            <strong>Shipping:</strong> Free
          </div>
          <div style={{ marginBottom: '20px' }}>
            <strong>Total:</strong> ₹{subtotal}
          </div>
          <button 
            style={{ 
              backgroundColor: '#4CAF50', 
              color: 'white', 
              border: 'none', 
              padding: '10px 20px', 
              borderRadius: '5px', 
              fontWeight: 'bold',
              cursor: 'pointer' 
            }}
            onClick={proceedToCheckout}
          >
            Proceed to Checkout
          </button>
        </div>
      </section>
    </div>
  );
};

export default CartPage;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CheckoutPage = () => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const cartData = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(cartData);
    calculateTotal(cartData);
  }, []);

  const calculateTotal = (cartData) => {
    const totalAmount = cartData.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    setTotal(totalAmount);
  };

  const removeItem = (index) => {
    const updatedCart = [...cart];
    updatedCart.splice(index, 1);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    calculateTotal(updatedCart);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (cart.length === 0) {
      alert("Your cart is empty. Add items before checking out!");
      return;
    }

    const address = document.getElementById('address').value;
    const paymentMethod = document.getElementById('payment').value;

    setConfirmationMessage(`Order Confirmed! Your items will be shipped to: ${address}. Payment method: ${paymentMethod}.`);
    setOrderConfirmed(true);
    localStorage.removeItem('cart');
    setCart([]);
    setTotal(0);
  };

  return (
    <div>
      <header>
        <h1>EcoFriendly Marketplace</h1>
        <nav>
          <a href="#" onClick={(e) => {
            e.preventDefault();
            navigate('/products');
          }}>Continue Shopping</a>
        </nav>
      </header>

      <section className="checkout-section">
        <h2>Your Cart</h2>
        <div id="cart-items">
          {cart.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            cart.map((item, index) => (
              <div className="cart-item" key={index}>
                <p>{item.productName} - ₹{item.price}</p>
                <button onClick={() => removeItem(index)}>Remove</button>
              </div>
            ))
          )}
        </div>
        
        {total > 0 && <div className="total">Total: ₹{total}</div>}

        <h3>Shipping Information</h3>
        <form id="checkout-form" onSubmit={handleSubmit}>
          <label htmlFor="address">Shipping Address</label>
          <input 
            type="text" 
            id="address" 
            name="address" 
            required 
            placeholder="Enter your shipping address"
          />

          <label htmlFor="payment">Payment Method</label>
          <select id="payment" name="payment" required>
            <option value="credit">Credit Card</option>
            <option value="paypal">UPI</option>
            <option value="COD">COD</option>
          </select>

          <button type="submit" className="btn">Complete Purchase</button>
        </form>
       
        {orderConfirmed && (
          <div className="confirmation-message" style={{ display: 'block' }}>
            {confirmationMessage}
          </div>
        )}
      </section>
    </div>
  );
};

export default CheckoutPage;
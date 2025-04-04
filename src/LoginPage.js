import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [showLogin, setShowLogin] = useState(true);
  const navigate = useNavigate();

  const toggleForm = () => {
    setShowLogin(!showLogin);
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    navigate('/products');
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    const password = document.getElementById("new-password").value;
    const confirmPassword = document.getElementById("confirm-password").value;
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    navigate('/products');
  };

  const styles = {
    page: {
      fontFamily: 'Arial, sans-serif',
      margin: 0,
      padding: 0,
      minHeight: '100vh',
      backgroundColor: '#f4f4f4',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    header: {
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between',
      padding: '20px 40px',
      boxSizing: 'border-box',
      backgroundColor: '#ffffff',
      borderBottom: '1px solid #ddd',
    },
    leftText: {
      fontSize: '24px',
      fontWeight: 'bold',
      color: '#4CAF50',
    },
    rightText: {
      fontSize: '14px',
      fontStyle: 'italic',
      color: '#333',
    },
    formContainer: {
      backgroundColor: '#fff',
      padding: '30px',
      borderRadius: '12px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
      width: '90%',
      maxWidth: '400px',
      marginTop: '60px',
    },
    inputGroup: {
      marginBottom: '15px',
    },
    label: {
      display: 'block',
      fontWeight: 'bold',
      marginBottom: '5px',
    },
    input: {
      width: '100%',
      padding: '10px',
      borderRadius: '5px',
      border: '1px solid #ccc',
    },
    button: {
      width: '100%',
      padding: '10px',
      backgroundColor: '#4CAF50',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      fontWeight: 'bold',
      cursor: 'pointer',
      marginTop: '10px',
    },
    toggleLink: {
      marginTop: '15px',
      textAlign: 'center',
      color: '#4CAF50',
      cursor: 'pointer',
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <div style={styles.leftText}>EcoFriendly Marketplace</div>
        <div style={styles.rightText}>Noel Kallingal | 23BCE0612 | L7</div>
      </div>

      <div style={styles.formContainer}>
        <h2 style={{ textAlign: 'center' }}>
          {showLogin ? "Login to Your Account" : "Create a New Account"}
        </h2>
        <form onSubmit={showLogin ? handleLoginSubmit : handleSignupSubmit}>
          {!showLogin && (
            <>
              <div style={styles.inputGroup}>
                <label htmlFor="new-username" style={styles.label}>Username</label>
                <input type="text" id="new-username" name="new-username" required placeholder="Create a username" style={styles.input} />
              </div>
              <div style={styles.inputGroup}>
                <label htmlFor="new-email" style={styles.label}>Email</label>
                <input type="email" id="new-email" name="new-email" required placeholder="Enter your email" style={styles.input} />
              </div>
            </>
          )}

          {showLogin && (
            <div style={styles.inputGroup}>
              <label htmlFor="username" style={styles.label}>Username</label>
              <input type="text" id="username" name="username" required placeholder="Enter your username" style={styles.input} />
            </div>
          )}

          <div style={styles.inputGroup}>
            <label htmlFor={showLogin ? "password" : "new-password"} style={styles.label}>Password</label>
            <input type="password" id={showLogin ? "password" : "new-password"} required placeholder="Enter your password" style={styles.input} />
          </div>

          {!showLogin && (
            <div style={styles.inputGroup}>
              <label htmlFor="confirm-password" style={styles.label}>Confirm Password</label>
              <input type="password" id="confirm-password" required placeholder="Confirm your password" style={styles.input} />
            </div>
          )}

          <button type="submit" style={styles.button}>
            {showLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        <p style={styles.toggleLink} onClick={toggleForm}>
          {showLogin ? "Don't have an account? Sign up here" : "Already have an account? Login here"}
        </p>
      </div>
    </div>
  );
};

export default LoginPage;

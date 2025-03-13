import React from 'react';
import { useNavigate } from 'react-router-dom';

function BinaryConverter() {
  const navigate = useNavigate();

  const conversionOptions = [
    { label: 'Decimal to Unsigned Int', type: 'decimalToUnsignedInt' },
    { label: 'Decimal to Ones Comp', type: 'decimalToOnesComp' },
    { label: 'Decimal to Twos Comp', type: 'decimalToTwosComp' },
    { label: 'Unsigned Int to Decimal', type: 'unsignedIntToDecimal' },
    { label: 'Ones Comp to Decimal', type: 'onesCompToDecimal' },
    { label: 'Twos Comp to Decimal', type: 'twosCompToDecimal' },
  ];

  const handleNavigation = (type) => {
    navigate(`/conversion-screen/${type}`);

  };

  return (
    <div style={styles.container}>
        <div style={styles.backButtonContainer}>
            <button style={styles.backButton}
            onClick={() => navigate('/')}
            className="back-button-link"
            >
            ← 
            </button>
            <h2 style={styles.header}>Click to Convert:</h2>
        </div>
      
      <div style={styles.buttonsContainer}>
        {conversionOptions.map((option) => (
          <button
            key={option.type}
            style={styles.button}
            onClick={() => handleNavigation(option.type)}
          >
            {option.label}
            <span style={styles.arrow}>&rarr;</span>
          </button>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '10px',
    maxWidth: '400px',
    margin: 'auto',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  header: {
    fontSize: '24px',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: '20px',
  },
  buttonsContainer: {
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
    gap: '10px',
  },
  button: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 15px',
    fontSize: '16px',
    fontWeight: 'bold',
    backgroundColor: '#e8e8e8',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
  },
  arrow: {
    fontSize: '18px',
  },
  backButton: {
    padding: '8px 16px',
    backgroundColor: '#e8e8e8',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginBottom: '20px',
    fontWeight: 'bold',
  },
  backButtonContainer: {
    display: 'flex',       
    alignItems: 'center',  
    gap: '10px',           
    width: '100%',         
  },
};

export default BinaryConverter;
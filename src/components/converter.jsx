import { useState, useEffect } from 'react';

const Converter = () => {
  const [decimalValue, setDecimalValue] = useState('0');
  const [ieeeResult, setIeeeResult] = useState({
    sign: 0,
    exponent: 0,
    mantissa: 0,
    binary: '00000000000000000000000000000000',
    hex: '00000000',
    displayExponent: -126,
    displayMantissa: 0
  });
  const [storedValue, setStoredValue] = useState('0');
  const [errorValue, setErrorValue] = useState('0');

  // -----------------------------
  // Conversion Logic (unchanged)
  // -----------------------------
  const convertToIEEE754 = (inputValue) => {
    const num = parseFloat(inputValue);
    
    if (isNaN(num)) {
      return {
        sign: 0,
        exponent: 255,
        mantissa: parseInt('1'.padEnd(23, '0'), 2),
        binary: '01111111110000000000000000000000',
        hex: '7FC00000',
        displayExponent: null,
        displayMantissa: null
      };
    }
    
    if (!isFinite(num)) {
      const sign = num < 0 ? 1 : 0;
      return {
        sign: sign,
        exponent: 255,
        mantissa: 0,
        binary: (sign ? '1' : '0') + '11111111' + '0'.repeat(23),
        hex: sign ? 'FF800000' : '7F800000',
        displayExponent: null,
        displayMantissa: null
      };
    }
    
    const floatView = new Float32Array(1);
    floatView[0] = num;
    const intView = new Uint32Array(floatView.buffer);
    const bits = intView[0];
    
    const sign = (bits >>> 31) & 0x1;
    const biasedExponent = (bits >>> 23) & 0xFF;
    const mantissaBits = bits & 0x7FFFFF;
    
    let displayExponent;
    let displayMantissa;
    
    if (biasedExponent === 0) {
      displayExponent = -126;
      displayMantissa = mantissaBits / Math.pow(2, 23);
    } else if (biasedExponent === 255) {
      displayExponent = null;
      displayMantissa = null;
    } else {
      displayExponent = biasedExponent - 127;
      displayMantissa = 1 + mantissaBits / Math.pow(2, 23);
    }
    
    const binary = bits.toString(2).padStart(32, '0');
    const hex = bits.toString(16).padStart(8, '0').toUpperCase();
    
    return {
      sign,
      exponent: biasedExponent,
      mantissa: mantissaBits,
      binary,
      hex,
      displayExponent,
      displayMantissa: displayMantissa === 1 ? 0 : displayMantissa
    };
  };

  const updateFromDecimal = () => {
    try {
      const result = convertToIEEE754(decimalValue);
      setIeeeResult(result);
      
      const inputVal = parseFloat(decimalValue);
      const floatView = new Float32Array(1);
      floatView[0] = inputVal;
      
      setStoredValue(floatView[0].toString());
      setErrorValue(
        !isNaN(inputVal) && isFinite(inputVal) 
          ? Math.abs(inputVal - floatView[0]).toString()
          : '0'
      );
    } catch (error) {
      console.error("Conversion error:", error);
    }
  };

  const handlePlusOne = () => {
    const currentValue = parseFloat(storedValue) || 0;
    setDecimalValue((currentValue + 1).toString());
  };

  const handleMinusOne = () => {
    const currentValue = parseFloat(storedValue) || 0;
    setDecimalValue((currentValue - 1).toString());
  };

  useEffect(() => {
    updateFromDecimal();
  }, [decimalValue]);
  const styles = {
    container: {
      width: '100%',
      maxWidth: '1300px',
      backgroundColor: '#f1f1f1',
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    header: {
      fontSize: '24px',
      fontWeight: 'bold',
      marginBottom: '20px',
      textAlign: 'center',
    },
    // Give exponent and mantissa more space so bits fit on one line
    gridContainer: {
      display: 'grid',
      gridTemplateColumns: '220px 1fr 2fr 4fr', // 4 columns, more width for exponent/mantissa
      rowGap: '10px',
      alignItems: 'center',
      marginBottom: '20px',
    },
    sectionLabel: {
      fontWeight: 'bold',
      marginBottom: '4px',
    },
    // We'll allow horizontal scroll and no wrapping in each column
    signSection: {
      backgroundColor: '#e0e0f0',
      textAlign: 'center',
      padding: '10px',
      display: 'flex',
      justifyContent: 'center',
      whiteSpace: 'nowrap',
      overflowX: 'auto',
    },
    exponentSection: {
      backgroundColor: '#d0f0d0',
      textAlign: 'center',
      padding: '10px',
      display: 'flex',
      justifyContent: 'center',
      whiteSpace: 'nowrap',
      overflowX: 'auto',
    },
    mantissaSection: {
      backgroundColor: '#f0e0d0',
      textAlign: 'center',
      padding: '10px',
      display: 'flex',
      justifyContent: 'center',
      whiteSpace: 'nowrap',
      overflowX: 'auto',
    },
    inputLabel: {
      textAlign: 'left',
      fontWeight: 'bold',
      padding: '5px',
    },
    valueCell: {
      textAlign: 'center',
      padding: '10px',
    },
    binaryCell: {
      border: '1px solid #ccc',
      width: '20px',
      height: '20px',
      margin: '0 1px',
      backgroundColor: 'white',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputContainer: {
      margin: '15px 0',
      display: 'flex',
      alignItems: 'center',
    },
    inputField: {
      flex: 1,
      padding: '8px',
      border: '1px solid #ddd',
      borderRadius: '4px',
    },
    buttonContainer: {
      display: 'flex',
      justifyContent: 'flex-end',
      gap: '10px',
      marginTop: '10px',
    },
    button: {
      padding: '8px 16px',
      backgroundColor: '#e8e8e8',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      fontWeight: 'bold',
    },
    numericButton: {
      width: '40px',
      height: '40px',
      fontSize: '16px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#e8e8e8',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      fontWeight: 'bold',
    },
  };
  // Renders the three groups of bits (sign, exponent, mantissa)
  const renderBinaryCells = () => {
    const bits = ieeeResult.binary;
    // children[0] => sign bits, children[1] => exponent bits, children[2] => mantissa bits
    return (
      <>
        {/* Sign bits */}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div style={styles.binaryCell}>{bits[0]}</div>
        </div>
        {/* Exponent bits */}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          {Array.from({ length: 8 }, (_, i) => (
            <div key={`e${i}`} style={styles.binaryCell}>
              {bits[i + 1]}
            </div>
          ))}
        </div>
        {/* Mantissa bits */}
        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
          {Array.from({ length: 23 }, (_, i) => (
            <div key={`m${i}`} style={styles.binaryCell}>
              {bits[i + 9]}
            </div>
          ))}
        </div>
      </>
    );
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>IEEE 754 Converter</div>
      
      <div style={styles.gridContainer}>
        <div></div>
        <div style={styles.signSection}>
          <div style={styles.sectionLabel}>Sign</div>
        </div>
        <div style={styles.exponentSection}>
          <div style={styles.sectionLabel}>Exponent</div>
        </div>
        <div style={styles.mantissaSection}>
          <div style={styles.sectionLabel}>Mantissa</div>
        </div>
        
        {/* 2) "Value" row */}
        <div style={styles.inputLabel}>Value:</div>
        <div style={{ ...styles.valueCell, ...styles.signSection }}>
          {ieeeResult.sign ? '-1' : '+1'}
        </div>
        <div style={{ ...styles.valueCell, ...styles.exponentSection }}>
          {ieeeResult.displayExponent !== null ? (
            <>
              2<sup>{ieeeResult.displayExponent !== -126 ? ieeeResult.displayExponent : -126}</sup>
            </>
          ) : (
            'N/A'
          )}
        </div>
        <div style={{ ...styles.valueCell, ...styles.mantissaSection }}>
          {ieeeResult.displayMantissa !== null
            ? ieeeResult.displayMantissa.toFixed(6)
            : 'N/A'}
        </div>

        {/* 3) "Encoded as" row */}
        <div style={styles.inputLabel}>Encoded as:</div>
        <div style={{ ...styles.valueCell, ...styles.signSection }}>
          {ieeeResult.sign}
        </div>
        <div style={{ ...styles.valueCell, ...styles.exponentSection }}>
          {ieeeResult.exponent}
        </div>
        <div style={{ ...styles.valueCell, ...styles.mantissaSection }}>
          {ieeeResult.mantissa}
        </div>

        {/* 4) Binary breakdown row */}
        <div style={styles.inputLabel}>Binary (with breakdown):</div>
        <div style={styles.signSection}>
          {renderBinaryCells().props.children[0]}
        </div>
        <div style={styles.exponentSection}>
          {renderBinaryCells().props.children[1]}
        </div>
        <div style={styles.mantissaSection}>
          {renderBinaryCells().props.children[2]}
        </div>
      </div>

     
      <div style={styles.inputContainer}>
        <div style={{ width: '220px', fontWeight: 'bold' }}>Decimal Representation</div>
        <input
          type="text"
          style={styles.inputField}
          value={decimalValue}
          onChange={(e) => setDecimalValue(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && updateFromDecimal()}
        />
      </div>

      <div style={styles.inputContainer}>
        <div style={{ width: '220px', fontWeight: 'bold' }}>Value actually stored in float:</div>
        <input
          type="text"
          style={styles.inputField}
          value={storedValue}
          readOnly
        />
        <button 
          style={styles.numericButton} 
          onClick={handlePlusOne}
        >
          +1
        </button>
      </div>

      <div style={styles.inputContainer}>
        <div style={{ width: '220px', fontWeight: 'bold' }}>Binary Representation</div>
        <input
          type="text"
          style={styles.inputField}
          value={ieeeResult.binary}
          readOnly
        />
      </div>
      
      <div style={styles.inputContainer}>
        <div style={{ width: '220px', fontWeight: 'bold' }}>Hexadecimal Representation</div>
        <input
          type="text"
          style={styles.inputField}
          value={ieeeResult.hex}
          readOnly
        />
      </div>

      <div style={styles.buttonContainer}>
        <button style={styles.button} onClick={updateFromDecimal}>
          Update
        </button>
      </div>
    </div>
  );
};

export default Converter;

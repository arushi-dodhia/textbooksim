import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function ConversionScreen() {
  const { type } = useParams();
  const [decimal, setDecimal] = useState('');
  const [steps, setSteps] = useState([]);
  const [result, setResult] = useState(null);
  const navigate = useNavigate();

  const handleConvert = () => {
    let stepsArray = [];
    let conversionResult;

    switch (type) {
      case 'decimalToUnsignedInt':
        let num = parseInt(decimal, 10);
        stepsArray.push(`Step 1: Start with ${num}.`);
        let binarySteps = [];
        
        const bitLength = 8; 
        let position = 0;
        
        while (num > 0) {
            let remainder = num % 2;
            binarySteps.push(remainder);
            stepsArray.push(`Bit ${position}: Divide ${num} by 2, Remainder is ${remainder}`);
            num = Math.floor(num / 2);
            position++;
        }
    
        binarySteps.reverse(); 
        const paddedBinary = binarySteps.join('').padStart(bitLength, '0'); 
        
        stepsArray.push(`Step 2: Pad binary to ${bitLength} bits: ${paddedBinary}.`);
        
        let paddedBinaryWithPositions = paddedBinary
            .split('')
            .map((bit, index) => `Bit ${bitLength - 1 - index}: ${bit}`)
            .join(', ');
        stepsArray.push(`Bit positions: ${paddedBinaryWithPositions}`);
        
        conversionResult = paddedBinary;
        stepsArray.push(`Final Result: Binary Unsigned Integer is ${conversionResult}`);
        break;

        case 'decimalToOnesComp':
          let num1 = parseInt(decimal, 10);
          let isNeg = num1 < 0;
          stepsArray.push(`Step 1: Start with ${num1} (Decimal).`);

          let binarySteps1 = [];
          let tempNum = Math.abs(num1);

          while (tempNum > 0) {
              binarySteps1.unshift(tempNum % 2);
              stepsArray.push(`Divide ${tempNum} by 2: Remainder is ${tempNum % 2} (Bit position ${binarySteps1.length})`);
              tempNum = Math.floor(tempNum / 2);
          }

          let paddedBinary1 = binarySteps1.join('').padStart(8, '0');
          stepsArray.push(`Step 2: Binary representation of absolute value is ${paddedBinary1}.`);

          if (isNeg) {
              const onesComplement = paddedBinary1.split('').map(bit => (bit === '0' ? '1' : '0')).join('');
              stepsArray.push(`Step 3: Flip bits to get one's complement: ${onesComplement}.`);
              conversionResult = onesComplement;
          } else {
              conversionResult = paddedBinary1;
          }

          stepsArray.push(`Final Result: One's complement binary is ${conversionResult}.`);
          break;

      case 'decimalToTwosComp':
        let num2 = parseInt(decimal, 10);
        const bitLength1 = 8; 
        stepsArray.push(`Step 1: Start with ${num2}.`);

        if (num2 >= 0) {

          let binarySteps2 = [];
          while (num2 > 0) {
            binarySteps2.push(num2 % 2);
            stepsArray.push(`Divide ${num2} by 2: Remainder is ${num2 % 2}`);
            num2 = Math.floor(num2 / 2);
          }

          binarySteps2.reverse(); 
          const binaryString2 = binarySteps2.join('').padStart(bitLength1, '0'); 
          stepsArray.push(`Step 2: Binary representation with ${bitLength1} bits is ${binaryString2}.`);

          const bitPositions = binaryString2
            .split('')
            .map((bit, index) => `Bit ${bitLength1 - 1 - index}: ${bit}`)
            .join(', ');
          stepsArray.push(`Bit positions: ${bitPositions}.`);

          conversionResult = binaryString2;
          stepsArray.push(`Final Result: Two's Complement Binary is ${conversionResult}`);
        } else {
          let absoluteValue = Math.abs(num2);
          stepsArray.push(`Step 2: Convert the absolute value ${absoluteValue} to binary.`);
          let binarySteps2 = [];
          while (absoluteValue > 0) {
            binarySteps2.push(absoluteValue % 2);
            stepsArray.push(`Divide ${absoluteValue} by 2: Remainder is ${absoluteValue % 2}`);
            absoluteValue = Math.floor(absoluteValue / 2);
          }

          binarySteps2.reverse();
          const binaryString2 = binarySteps2.join('').padStart(bitLength1, '0'); 
          stepsArray.push(`Binary representation of absolute value with ${bitLength1} bits is ${binaryString2}.`);

          let onesComp = binaryString2
            .split('')
            .map(bit => (bit === '0' ? '1' : '0'))
            .join('');
          stepsArray.push(`Step 3: Flip the bits of ${binaryString2} to get one's complement: ${onesComp}.`);

          let carry = 1;
          let twosComplement = onesComp.split('').map(Number); 
          for (let i = twosComplement.length - 1; i >= 0; i--) {
            let sum = twosComplement[i] + carry;
            twosComplement[i] = sum % 2;
            carry = Math.floor(sum / 2);
          }

          const twosComplementString = twosComplement.join('');
          stepsArray.push(`Step 4: Add 1 to get two's complement: ${twosComplementString}.`);

          const bitPositions = twosComplementString
            .split('')
            .map((bit, index) => `Bit ${bitLength1 - 1 - index}: ${bit}`)
            .join(', ');
          stepsArray.push(`Bit positions: ${bitPositions}.`);

          conversionResult = twosComplementString;
          stepsArray.push(`Final Result: Two's Complement Binary is ${conversionResult}`);
        }
        break;

      case 'unsignedIntToDecimal':
        const binaryString3 = decimal.toString();  
        const binaryArray3 = binaryString3.split('').reverse();  

        conversionResult = 0;
        stepsArray.push(`Converting binary ${binaryString3} to decimal:`);

        binaryArray3.forEach((bit, index) => {
            const powerOfTwo = Math.pow(2, index);  
            const decimalValue = parseInt(bit, 10) * powerOfTwo;  
            
            if (bit === '1') {
                stepsArray.push(`Step ${index + 1}: The bit is ${bit}. Add 2^${index} = ${powerOfTwo} to the total.`);
            } else {
                stepsArray.push(`Step ${index + 1}: The bit is ${bit}. Since it's 0, ignore`);
            }
            
            conversionResult += decimalValue;
        });

        stepsArray.push(`Final Result: The decimal value is ${conversionResult}`);
        break;

      case 'onesCompToDecimal':
        const binaryString4 = decimal.toString();
        const signBit = binaryString4[0]; 
        let convertedDecimal = 0;
        
        
        if (signBit === '0') {
          stepsArray.push(`Step 1: Sign bit is 0, so the number is positive.`);
          convertedDecimal = parseInt(binaryString4, 2);
          stepsArray.push(`Step 2: Convert binary ${binaryString4} to decimal directly.`);
        } else {
          stepsArray.push(`Step 1: Sign bit is 1, so the number is negative.`);
          
          let invertedBits = '';
          for (let i = 0; i < binaryString4.length; i++) {
            invertedBits += binaryString4[i] === '0' ? '1' : '0';
          }
          stepsArray.push(`Step 2: Invert all bits to get ${invertedBits}.`);
          
          const twoCompBinaryone = (parseInt(invertedBits, 2) + 1).toString(2);
          stepsArray.push(`Step 3: Add 1 to the inverted bits to get two's complement representation: ${twoCompBinaryone}.`);
          
          convertedDecimal = -parseInt(twoCompBinaryone, 2);
          stepsArray.push(`Step 4: Convert ${twoCompBinaryone} to decimal and apply the negative sign.`);
        }

        stepsArray.push(`Final Result: The decimal value is ${convertedDecimal}`);
        setResult(convertedDecimal);
        break;

      case 'twosCompToDecimal':
        const binaryString5 = decimal.toString();  
        const isNegative = binaryString5[0] === '1';  
        stepsArray.push(`Step 1: Checking the sign bit of ${binaryString5}.`);
        
        if (isNegative) {
            stepsArray.push(`The sign bit is 1, so the number is negative.`);
            
            let invertedBinary = '';
            for (const bit of binaryString5) {
                invertedBinary += bit === '1' ? '0' : '1';
            }
            stepsArray.push(`Step 2: Invert all bits to get ${invertedBinary}.`);

            const positiveBinaryValue = (parseInt(invertedBinary, 2) + 1).toString(2);
            stepsArray.push(`Step 3: Add 1 to ${invertedBinary} to get the positive magnitude: ${positiveBinaryValue}.`);

            conversionResult = -parseInt(positiveBinaryValue, 2);
            stepsArray.push(`Step 4: Convert ${positiveBinaryValue} to decimal and apply the negative sign.`);
        } else {
            stepsArray.push(`The sign bit is 0, so the number is positive.`);
            
            conversionResult = parseInt(binaryString5, 2);
            stepsArray.push(`Step 2: Convert binary ${binaryString5} directly to decimal.`);
        }

        stepsArray.push(`Final Result: The decimal value is ${conversionResult}`);
        break;

    default:
        stepsArray.push('Invalid conversion type');
        conversionResult = 'Error';
    }

    setSteps(stepsArray);
    setResult(conversionResult);
  };

  const capitalizeWords = (str) => {
    return str
      .replace(/([A-Z])/g, ' $1')
      .replace(/\b\w/g, (char) => char.toUpperCase()); 
  };


  return (
    <div style={styles.container}>
       <div style={styles.backButtonContainer}>
            <button style={styles.backButton}
            onClick={() => navigate(-1)}
            >
            ← 
            </button>
            <h2 style={styles.header}>Click to Convert:</h2>
        </div>
      
      <h2 style={styles.header}>{capitalizeWords(type)} Conversion:</h2>
      <div style={styles.inputContainer}>
        <input
          type="number"
          value={decimal}
          onChange={(e) => setDecimal(e.target.value)}
          style={styles.input}
          placeholder="Enter number..."
        />
        <button 
          onClick={handleConvert}
          style={styles.button}
        >
          Convert
        </button>
      </div>
      {steps.length > 0 && (
        <div style={styles.stepsContainer}>
          <h3 style={styles.stepsHeader}>Conversion Steps</h3>
          <ul style={styles.stepsList}>
            {steps.map((step, index) => (
              <li key={index} style={styles.step}>{step}</li>
            ))}
          </ul>
        </div>
      )}
      {result !== null && (
        <div style={styles.resultContainer}>
          <span style={styles.resultLabel}>Result:</span> {result}
        </div>
      )}
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
    margin: '0 auto',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
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
  header: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '20px',
  },
  inputContainer: {
    display: 'flex',
    gap: '10px',
    marginBottom: '20px',
  },
  input: {
    flex: '1',
    padding: '10px',
    fontSize: '16px',
    borderRadius: '4px',
    border: '1px solid #ddd',
  },
  convertButton: {
    padding: '10px 20px',
    backgroundColor: '#e5e5e5',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  stepsContainer: {
    marginTop: '20px',
  },
  stepsHeader: {
    fontSize: '18px',
    fontWeight: 'bold',
    marginBottom: '10px',
  },
  stepsList: {
    listStyleType: 'none',
    padding: '0',
  },
  step: {
    padding: '8px 0',
    borderBottom: '1px solid #ddd',
  },
  resultContainer: {
    marginTop: '20px',
    padding: '15px',
    backgroundColor: '#e8e8e8',
    borderRadius: '4px',
  },
  resultLabel: {
    fontWeight: 'bold',
    marginRight: '10px',
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
};

export default ConversionScreen;
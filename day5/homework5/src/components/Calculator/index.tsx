import { useState } from 'react'
// import './styles.css'

const Calculator = () => {
  const [display, setDisplay] = useState<string>('0');
  const [firstOperand, setFirstOperand] = useState<number | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [waitingForSecondOperand, setWaitingForSecondOperand] = useState<boolean>(false);

  const inputDigit = (digit: string) => {
    if (waitingForSecondOperand) {
      setDisplay(display + digit);
      setWaitingForSecondOperand(false);
    } else {
      setDisplay(display === '0' ? digit : display + digit);
    }
  };

  const inputDecimal = () => {
    if (waitingForSecondOperand) {
      setDisplay(display + '0.');
      setWaitingForSecondOperand(false);
      return;
    }
    
    const parts = display.split(/[\\+\-\\×\\÷]/);
    const lastPart = parts[parts.length - 1].trim();
    
    if (!lastPart.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const clear = () => {
    setDisplay('0');
    setFirstOperand(null);
    setOperator(null);
    setWaitingForSecondOperand(false);
  };

  const handleOperator = (nextOperator: string) => {
    const inputValue = parseFloat(display);

    if (firstOperand === null) {
      setFirstOperand(inputValue);
    } else if (operator && !waitingForSecondOperand) {
      const result = calculate(firstOperand, inputValue, operator);
      setDisplay(String(result));
      setFirstOperand(result);
    }

    setDisplay(display + ' ' + nextOperator + ' ');
    setWaitingForSecondOperand(true);
    setOperator(nextOperator);
  };

  const calculate = (firstOperand: number, secondOperand: number, operator: string): number => {
    switch (operator) {
      case '+':
        return firstOperand + secondOperand;
      case '-':
        return firstOperand - secondOperand;
      case '×':
        return firstOperand * secondOperand;
      case '÷':
        return firstOperand / secondOperand;
      default:
        return secondOperand;
    }
  };

  const handleEquals = () => {
    if (!operator || firstOperand === null) return;

    const operatorRegex = /[\\+\-\\×\\÷]/;
    const parts = display.split(operatorRegex);
    const secondOperandStr = parts[parts.length - 1].trim();
    const secondOperand = parseFloat(secondOperandStr);
    
    if (isNaN(secondOperand)) return;
    
    const result = calculate(firstOperand, secondOperand, operator);
    
    setDisplay(String(result));
    setFirstOperand(null);
    setOperator(null);
    setWaitingForSecondOperand(false);
  };

  return (
    <div className="calculator">
      <input type="text" className="display" value={display} readOnly />
      <div className="buttons">
        <button className="number" onClick={() => inputDigit('7')}>7</button>
        <button className="number" onClick={() => inputDigit('8')}>8</button>
        <button className="number" onClick={() => inputDigit('9')}>9</button>
        <button className="operator" onClick={() => handleOperator('÷')}>÷</button>
        
        <button className="number" onClick={() => inputDigit('4')}>4</button>
        <button className="number" onClick={() => inputDigit('5')}>5</button>
        <button className="number" onClick={() => inputDigit('6')}>6</button>
        <button className="operator" onClick={() => handleOperator('×')}>×</button>
        
        <button className="number" onClick={() => inputDigit('1')}>1</button>
        <button className="number" onClick={() => inputDigit('2')}>2</button>
        <button className="number" onClick={() => inputDigit('3')}>3</button>
        <button className="operator" onClick={() => handleOperator('-')}>−</button>
        
        <button className="number" onClick={() => inputDigit('0')}>0</button>
        <button id="dot" onClick={inputDecimal}>.</button>
        <button className="clear" onClick={clear}>C</button>
        <button className="operator" onClick={() => handleOperator('+')}>+</button>
        
        <button className="equals" onClick={handleEquals}>=</button>
      </div>
    </div>
  )
}

export default Calculator
  let currentInput = '';
        let firstOperand = null;
        let operator = null;
        let shouldResetInput = false;

        function appendNumber(num) {
            if (shouldResetInput) {
                currentInput = '';
                shouldResetInput = false;
            }
            if (num === '0' && currentInput === '0') return;
            currentInput += num;
            updateDisplay();
        }

        function appendDot() {
            if (shouldResetInput) {
                currentInput = '';
                shouldResetInput = false;
            }
            if (!currentInput.includes('.')) {
                if (currentInput === '') {
                    currentInput = '0.';
                } else {
                    currentInput += '.';
                }
                updateDisplay();
            }
        }

        function setOperation(op) {
            if (currentInput === '') return;
            
            if (firstOperand !== null && operator !== null && !shouldResetInput) {
                calculateResult();
            }
            
            firstOperand = parseFloat(currentInput);
            
            if (op === '×') {
                operator = '*';
            } else if (op === '÷') {
                operator = '/';
            } else {
                operator = op;
            }
            
            shouldResetInput = true;
            updateDisplay();
        }

        function calculateResult() {
            if (operator === null || shouldResetInput) return;
            
            const secondOperand = parseFloat(currentInput);
            let result;
            
            switch (operator) {
                case '+':
                    result = firstOperand + secondOperand;
                    break;
                case '-':
                    result = firstOperand - secondOperand;
                    break;
                case '*':
                    result = firstOperand * secondOperand;
                    break;
                case '/':
                    result = secondOperand === 0 ? 'Error' : firstOperand / secondOperand;
                    break;
                default:
                    return;
            }
            
            currentInput = result.toString();
            updateDisplay();
            firstOperand = null;
            operator = null;
            shouldResetInput = true;
        }

        function clearDisplay() {
            currentInput = '';
            firstOperand = null;
            operator = null;
            shouldResetInput = false;
            updateDisplay();
        }

        function updateDisplay() {
            let displayValue = currentInput || '0';
            
            if (operator && shouldResetInput) {
                let opSymbol = operator;
                if (operator === '*') opSymbol = '×';
                if (operator === '/') opSymbol = '÷';
                displayValue = firstOperand + operator + opSymbol;
            }
            
            document.getElementById('display').value = displayValue;
        }

        document.addEventListener('DOMContentLoaded', () => {
            document.querySelectorAll('.number').forEach(button => {
                button.addEventListener('click', () => {
                    appendNumber(button.getAttribute('data-number'));
                });
            });

            document.getElementById('dot').addEventListener('click', appendDot);

            document.querySelectorAll('.operator').forEach(button => {
                button.addEventListener('click', () => {
                    setOperation(button.getAttribute('data-operator'));
                });
            });

            document.getElementById('equals').addEventListener('click', calculateResult);

            document.getElementById('clear').addEventListener('click', clearDisplay);

            updateDisplay();
        });
/* eslint-disable prefer-const */

/* 1.
 * > Set up the variables you need
 * Running total
 * String to display on calculator screen
 * Last clicked math operator button (symbol)
 * Calculator screen
 */
let runningTotal = 0; // Keep running total
let calcDisplay = '0'; // Buffer
let previousOperator = null; // Last clicked operator i.e. Plus / Multiply etc

const screen = document.querySelector('#calcScreen');

/* 3.
 * > Handle button clicks
 * Rename button's innerText to be it's 'value'
 * Check whether the value is a number or a symbol
 * Run a different function for numbers vs symbols
 */
function calcBtnClick(btnEl) {
  const value = btnEl.innerText; // get the text inside the clicked button (string)

  if (!isNaN(value)) {
    // console.log('it is a number');
    handleNumber(value); // for numbers we'll use their innerText
  } else {
    // console.log('it is a symbol');
    handleSymbol(btnEl); // for symbols we'll use their id
  }

  screen.innerText = calcDisplay;
}

/* 4.
 * > Handle numbers (function inslide calcBtnClick)
 * If number was clicked update screen display with the numberString
 */
function handleNumber(numberString) {
  if (calcDisplay === '0') {
    calcDisplay = numberString;
  } else {
    calcDisplay += numberString;
  }
}

/* 5.
 * > Handle symbols (function inside calcBtnClick)
 * Take in the btn element as symbol
 * Use the symbol's ID to determine what action to take
 * (This approach is safer than innerText in case that changes in future)
 * Perform action or run external functions to handleMath handleBack
 */
function handleSymbol(symbol) {
  const operatorId = symbol.id;

  switch (operatorId) {
    case 'opClear':
      calcDisplay = '0';
      runningTotal = 0;
      break;
    case 'opEquals':
      handleEquals();
      break;
    case 'opPlus':
    case 'opMinus':
    case 'opDivide':
    case 'opMultiply':
      handleMath(operatorId);
      break;
    case 'opBack':
      handleBackBtn();
      break;
    default:
  }
}

/* 6.
 * > What to do when math operator btns are clicked
 * If no numbers beforehand, do nothing (return early)
 * If numbers entered beforehand, convert them from string to number type
 * Do the actual math (flush it)
 * Store which operator was pressed
 * Reset the display to '0' ready to take next number after the pressed operator
 */
function handleMath(operatorId) {
  if (calcDisplay === '0') {
    return;
  }

  const intCalcDisplay = parseInt(calcDisplay); // digits entered are now numbers

  if (runningTotal === 0) {
    runningTotal = intCalcDisplay;
  } else {
    flushOperation(intCalcDisplay); // do the math operation, flush it through
  }

  previousOperator = operatorId;
  calcDisplay = '0';
}

/* 7.
 * Do the math!
 * Take the numbers entered, perform the operator, update the running total
 */
function flushOperation(intCalcDisplay) {
  switch (previousOperator) {
    case 'opPlus':
      runningTotal += intCalcDisplay;
      break;
    case 'opMinus':
      runningTotal -= intCalcDisplay;
      break;
    case 'opMultiply':
      runningTotal *= intCalcDisplay;
      break;
    case 'opDivide':
      runningTotal /= intCalcDisplay;
      break;
    default:
  }
}

/* 8.
 * Handle Equals button to display the result
 */
function handleEquals() {
  if (previousOperator === null) {
    // you need 2 numbers to do math
  } else {
    // finish the math sum, reset to defaults
    flushOperation(parseInt(calcDisplay));
    previousOperator = null;
    calcDisplay = runningTotal;
    runningTotal = 0;
  }
}

/* 9.
 * Delete last digit?
 */
function handleBackBtn() {
  if (calcDisplay.length === 1) {
    calcDisplay = '0';
  } else {
    calcDisplay = calcDisplay.substring(0, calcDisplay.length - 1);
  }
}
/* 2.
 * > Set up the calculator
 * Event listen on all calculator buttons
 */
function calcInit() {
  document.querySelector('#calcBtns').addEventListener('click', function(e) {
    calcBtnClick(e.target); // output the button
  });
}

calcInit();

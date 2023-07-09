/* Toggle button */
const toggleDiv = document.querySelector('.toggle-div');
const container = document.querySelector('.container')

toggleDiv.addEventListener('click', () => {
    container.classList.toggle('active');
})
/* Selectors*/

const numButtons = document.querySelectorAll('.number');
const operatorButtons = document.querySelectorAll('.operator');
const equalsButton = document.querySelector('.equals');
const deleteButton = document.querySelector('.delete');
const clearButton = document.querySelector('.clear');
const previousNumDisplay = document.querySelector('.previous');
const currentNumDisplay = document.querySelector('.current');


/* Variables*/

let previousNum = '';
let currentNum = '';
let currentOperator = null;
let lastPressedBtn;

/* Event listeners */

clearInput();

numButtons.forEach(button => button.addEventListener('click', () => {
    let value = button.value;
    appendNum(value);
    pressedBtn(button.classList[0]);
    displayUpdate();
}))

operatorButtons.forEach(button => button.addEventListener('click', () =>{
    let value = button.value;
    selectOperator(value);
    pressedBtn(button.classList[0]);
    displayUpdate();
}))

equalsButton.addEventListener('click', (e) => {
    calculate();
    pressedBtn(e.target.classList[0]);
    displayUpdate();
})

clearButton.addEventListener('click', (e) =>{
    clearInput();
    pressedBtn(e.target.classList[0]);
    displayUpdate();
})

deleteButton.addEventListener('click', (e) => {
    deleteInput();
    pressedBtn(e.target.classList[0]);
    displayUpdate();
})


/*Keyboard events*/

window.addEventListener('keyup', e => {
    let valueStr = e.key;
    pressedBtn(valueStr);
    if(Number(valueStr) >= 0 && Number(valueStr) <= 9 || valueStr === '.') {
        appendNum(valueStr);
    } else if(valueStr === '+' || valueStr === '-' || valueStr === '/' || valueStr === '*'){
        selectOperator(valueStr)
    } else if(valueStr === 'Enter'){
        calculate();
    } else if(e.key = 'Backspace'){
        deleteInput();
    } else if(e.key === 'Delete'){
        console.log('delete pressed') // doesn't work ?????
        clearInput();
    }
    e.preventDefault();
    displayUpdate();
    
    
})

/* Functions*/

function clearInput(){
    previousNum = '';
    currentNum = '';
    currentOperator = null;
}

function deleteInput(){
    currentNum = currentNum.toString().slice(0, -1);
    
}

function appendNum(number){
    if(lastPressedBtn === 'equals' || lastPressedBtn == 'Enter'){
        clearInput();
    }
    if(number === '0' && currentNum === '0') return
    if(number === '.' && currentNum.includes('.')) return
    if(number !== '0' && currentNum === '0'){
        currentNum = number;
    } else currentNum += number;
    
    
}

function selectOperator(operator){
    if(currentNum === '' && operator === '-'){
        previousNum = 0;
        currentOperator = operator;
        calculate();
    }
    if(currentNum === '') return
    if(previousNum !== ''){
        calculate();
    }
    previousNum = currentNum;
    currentOperator = operator;
    currentNum = '';
}

function calculate(){
    let calculation;
    let prevNum = Number(previousNum);
    let currNum = Number(currentNum);

    if(previousNum === '' || currentNum === '') return;

    switch(currentOperator){
        case '+':
            calculation = prevNum + currNum;
            break;
        case '-':
            calculation = prevNum - currNum;
            break;
        case '*':
            calculation = prevNum * currNum;
            break;
        case '/':
            if(currNum !== 0)
            calculation = prevNum / currNum;
            else calculation = "can't divide by 0"
            break;
        default:
            return;
    }

    currentNum = calculation;
    currentOperator = null;
    previousNum = '';
}

function displayUpdate(){
    currentNumDisplay.textContent = currentNum;
    if(currentOperator !== null){
    previousNumDisplay.textContent = previousNum + currentOperator; 
    } else previousNumDisplay.textContent = previousNum;
}

function pressedBtn(btn){
    lastPressedBtn = btn;
    return lastPressedBtn;
}



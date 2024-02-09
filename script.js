// Equation function definitions

const add = (first, second) => {return first + second};

const subtract = (first, second) => {return first - second};

const multiply = (first, second) => {return first * second};

const divide = (first, second) => {return first / second};


// Initial variable declarations

let firstNum = NaN;

let secondNum = NaN;

let operator = '0';

// Operate function

const operate = (first, second, operator) => {
    if (operator === '+')
        return add(first, second);
    else if (operator === '-')
        return subtract(first, second);
    else if (operator === '*')
        return multiply(first, second);
    else if (operator === '/')
        return divide(first, second);
}

let calc_width = 600;
let calc_pad = 40;
let calc_height = 750;
let calculator = document.querySelector(`#calculator`);
let calc_display = document.querySelector(`#calc_display`);
let number_group = document.querySelector(`#number_group`);

// Calculator Top Display
let display = document.createElement(`div`);
display.style.width = `${calc_width - calc_pad}px`;
display.style.height = `100px`;
display.style.border = `1px solid black`;
calc_display.appendChild(display);

// Function to create operations
const buttonCreation = (outerLoop, innerLoop) => {
    if (outerLoop == 0 && innerLoop == 0)
        return '+';
    else if (outerLoop === 0 && innerLoop === 1)
        return '-';
    else if (outerLoop === 0 && innerLoop === 2)
        return '*';
    else if (outerLoop === 1 && innerLoop === 0)
        return '/';
    else if (outerLoop === 1 && innerLoop === 1)
        return '=';
    else if (outerLoop === 1 && innerLoop === 2)
        return 'c';
    else
        return ' ';

}

// Calculator Button Creation

for (let i = 0; i < 9; i +=3 )
{
    for (let j = 1; j < 4; j++)
    {
        let number = document.createElement(`button`);
        number.classList.toggle("button");
        number.style.width = `${(calc_width - calc_pad)/3}px`;
        number.style.height = `100px`;
        let number_content = i + j;
        number.textContent = number_content;
        number_group.appendChild(number);

    }  
}

// Rudimentary method to add 0 to the calculator
let number = document.createElement(`button`);
number.classList.toggle("button");
number.style.width = `${(calc_width - calc_pad)/3}px`;
number.style.height = `100px`;
let number_content = 0;
number.textContent = number_content;
number_group.appendChild(number);


for (let i = 0; i < 2; i++) // Make the button's text content change depending on what loop iteration is current (first is +, second is -, etc)
{
    for (let j = 0; j < 3; j++)
    {
        let number = document.createElement(`button`);
        number.classList.toggle("button");
        number.style.width = `${(calc_width - calc_pad)/3}px`;
        number.style.height = `100px`;
        let content = buttonCreation(i, j); 
        number.textContent = content;
        number_group.appendChild(number);
    }
}
let buttonList = document.querySelectorAll(`.button`)

// Helper function to count the number of decimal places that a number has

const countDecimal = (number) => {
    convert = number + "";
    let index = convert.indexOf(".");
    if (index != -1)
    {
        let decimals = convert.slice(index + 1, convert.length)
        return decimals.length;
    }
    return 0;
}

// Display button that's clicked on top display function
let display_value = '';
for (let i = 0; i < buttonList.length; i++)
    {
        buttonList[i].addEventListener( "click", () => {
            if (i === buttonList.length - 1)
            {
                display_value = '';
                firstNum = 0;
                secondNum = 0;
                operator = '';
            }
            else if (i === buttonList.length - 2)
            {
                if (isNaN(firstNum) || isNaN(display_value) )
                    alert("Please input at least two numbers and an operation to calculate!")
                else
                {
                    secondNum = display_value * 1;
                    display_value = operate(firstNum, secondNum, operator);
                    if (countDecimal(display_value) > 5)
                            display_value = display_value.toFixed(5);
                    firstNum = display_value;
                    operator = '0';
                }
            }
            else if (i >= 10) // use the isNaN function to check if the display value is not a number
            {

                    if (isNaN(display_value))
                    {
                        alert("Please inpute a number between operations!");
                    }
                    else if (isNaN(operator))
                    {
                        firstNum = operate(firstNum, (display_value * 1), operator);
                        operator = buttonList[i].textContent;
                        display_value = buttonList[i].textContent;
                    }
                    else
                    {
                        firstNum = display_value * 1;
                        operator = buttonList[i].textContent;
                        display_value = buttonList[i].textContent;
                    }
            }
            else if (i < 10)
            {
                if (isNaN(display_value * 1))
                    display_value = buttonList[i].textContent;
                else if (operator === '/' && display_value === '0')
                    alert("Please don't try to divide by zero man");
                else
                    display_value += buttonList[i].textContent;
            }
            display.textContent = display_value;
        })
    }



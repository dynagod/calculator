let toogleHistory = document.getElementById('toogleHistory');
let input = document.getElementById('inputField');
let buttons = document.querySelectorAll('.button');
let calculation = "0";
let operations = ["%", "+", "-", "*", "/"];

toogleHistory.innerHTML = '<i class="fa-solid fa-clock-rotate-left"></i>';

toogleHistory.addEventListener('click', () => {
    let history = document.getElementById('history');
    if(history.classList.contains('hidden')){
        history.classList.remove('hidden');
        history.classList.add('flex');
        toogleHistory.innerHTML = '<i class="fa-solid fa-calculator"></i>';
    }else{
        history.classList.add('hidden');
        history.classList.remove('flex');
        toogleHistory.innerHTML = '<i class="fa-solid fa-clock-rotate-left"></i>';
    }
});

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const buttonId = button.getAttribute("id");
        const buttonValue = button.innerHTML;

        if (buttonId === 'clear') {
            input.value = "0";
            calculation = "0";
        } else if (buttonId === 'equalsTo') {
            let list = document.getElementById('historyList');
            let cal = input.value;
            calculation = calculation.replace(/x/g, "*").replace(/÷/g, "/");
            input.value = math.evaluate(calculation);
            let ans = input.value;
            calculation = input.value;
            let newCalculation = document.createElement("li");
            newCalculation.innerHTML = `<button class="historyButton" id="${ans}"><div class="cal">${cal}</div><div class="ans">=${ans}</div></button>`;
            list.prepend(newCalculation);
            let historyButtons = document.querySelectorAll('.historyButton');
            let clearHistory = document.getElementById('clearHistory');
            
            historyButtons.forEach(historyButton => {
                historyButton.addEventListener('click', () => {
                    input.value = historyButton.getAttribute("id");
                    calculation = historyButton.getAttribute("id");
                });
            });

            clearHistory.addEventListener('click', () => {
                while (list.firstChild) {
                    list.removeChild(list.firstChild);
                }
            });
        } else if (buttonId === 'backspace') {
            if (input.value.length === 1) {
                input.value = "0";
                calculation = "0";
            } else {
                input.value = input.value.slice(0, -1);
                calculation = calculation.slice(0, -1);
            }
        } else if (buttonId === 'sign') {
            let lastChar = input.value.charAt(input.value.length - 1);
        
            // If the last character is not a closing parenthesis, handle the sign toggle
            if (lastChar !== ")") {
                let start = input.value.lastIndexOf("(");
                let end = input.value.lastIndexOf(")");
        
                // If the value contains a "(-", remove it
                if (start !== -1 && end === input.value.length - 1) {
                    input.value = input.value.substring(0, start) + input.value.substring(start + 2, end);
                    calculation = calculation.substring(0, start) + calculation.substring(start + 2, end);
                } else {
                    // If the value is not negative, add the "(-" and ")"
                    if (isNaN(input.value) || operations.includes(input.value.charAt(input.value.length - 1))) {
                        let a = true;
                        for (let i = 1; i < input.value.length; i++) {
                            if (isNaN(input.value.charAt(input.value.length - i)) && a && !operations.includes(calculation.charAt(calculation.length - 1)) && input.value.charAt(input.value.length - i) !== ".") {
                                input.value = input.value.substring(0, input.value.length - (i - 1)) + "(-" + input.value.substring(input.value.length - (i - 1)) + ")";
                                calculation = calculation.substring(0, calculation.length - (i - 1)) + "(-" + calculation.substring(calculation.length - (i - 1)) + ")";
                                a = false;
                            }
                        }
                    } else {
                        input.value = "(-" + input.value + ")";
                        calculation = "(-" + calculation + ")";
                    }
                }
            } else {
                // Remove the "(-" and ")"
                input.value = input.value.substring(2, input.value.length - 1);
                calculation = calculation.substring(2, calculation.length - 1);
            }
        } else if (operations.includes(buttonId)) {
            if (operations.includes(calculation.slice(-1))) {
                calculation = calculation.slice(0, -1);
                input.value = input.value.slice(0, -1);
            }
            calculation += buttonId;
            input.value += buttonValue;
        } else {
            if (input.value === "0") {
                input.value = buttonValue;
                calculation = buttonId;
            } else {
                input.value += buttonValue;
                calculation += buttonId;
            }
        }
    });
});
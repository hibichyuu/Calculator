const docQueries = {
    "buttons": document.querySelectorAll("button"),
    "calcScreen": document.querySelector("#calcScreen"),
};

const opVariables = {
    "num1": '',
    "num2": '',
    "operator": '',
};

const miscVariables = {
    "start": true,
};

function activateButtons(){
    docQueries["buttons"].forEach((btn) => {
            btn.addEventListener("click", updateScreen, false);
    });
}

function updateScreen(){
    let screenText = 
        Array.from(docQueries["calcScreen"].textContent); 
    let opArr = [" ", this.value, " "];

    if(this.value >= 0 && this.value <= 9){
        if(checkStart()){
            screenText = [''];
        }
        screenText.push(this.value);
        docQueries["calcScreen"].textContent = screenText.join('');
    }else{
        switch(this.value){
            case '-':
                opVariables["operator"] = '-';
                screenText = screenText.concat(opArr);
                docQueries["calcScreen"].textContent = screenText.join('');
                deActivateOperators();
                break;

            case '+':
                opVariables["operator"] = '+';
                screenText = screenText.concat(opArr);
                docQueries["calcScreen"].textContent = screenText.join('');
                deActivateOperators();
                break;

            case 'x':
                opVariables["operator"] = 'x';
                screenText = screenText.concat(opArr);
                docQueries["calcScreen"].textContent = screenText.join('');
                deActivateOperators();
                break;

            case '/':
                opVariables["operator"] = '/';
                screenText = screenText.concat(opArr);
                docQueries["calcScreen"].textContent = screenText.join('');
                deActivateOperators();
                break;

            case '=':
                let numbers = screenText.join('').split(` ${opVariables["operator"]} `);
                opVariables["num1"] = numbers[0];
                opVariables["num2"] = numbers[1];
                if(opVariables["num1"] != '' && opVariables["num2"] != ''){
                    docQueries["calcScreen"].textContent = operate(); 
                    miscVariables["start"] = true;  
                }
                break;
        }
    }
}

function deActivateOperators(){
    docQueries["buttons"].forEach((btn)=>{
        switch(btn.value){
            case '-':
                btn.removeEventListener('click', updateScreen, false);
                break;
            case '+':
                btn.removeEventListener('click', updateScreen, false);
                break;
            case 'x':
                btn.removeEventListener('click', updateScreen, false);
                break;
            case '/':
                btn.removeEventListener('click', updateScreen, false);
                break;
        }
    });
}

function reActivateOperators(){
    docQueries["buttons"].forEach((btn)=>{
        switch(btn.value){
            case '-':
                btn.addEventListener("click", updateScreen, false);
                break;
            case '+':
                btn.addEventListener("click", updateScreen, false);
                break;
            case 'x':
                btn.addEventListener("click", updateScreen, false);
                break;
            case '/':
                btn.addEventListener("click", updateScreen, false);
                break;
            case '=':
                break;
        }
    });
}

function operate(){
    num1 = parseInt(opVariables["num1"]);
    num2 = parseInt(opVariables["num2"]);
    op = opVariables["operator"];
    switch(op){
        case '-':
            return subtract(num1, num2);
        case '+':
            return add(num1, num2);
        case 'x':
            return multiply(num1, num2);
        case '/':
            return divide(num1, num2);
    }
}

function subtract(a, b){
 return a - b;
}
function add(a, b){
 return a + b;
}
function multiply(a, b){
 return a * b;
}
function divide(a, b){
 return a / b;
}
function restartScreen(){
    docQueries["calcScreen"].textContent = '';
}
function checkStart(){
    if(miscVariables["start"] == true){
        restartScreen();
        reActivateOperators();
        miscVariables["start"] = false;
        return true;
    }
    return false;
}

activateButtons();

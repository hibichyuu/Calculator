const docQueries = {
    "buttons": document.querySelectorAll("button"),
    "calcScreen": document.querySelector("#calcScreen"),
};

const opVariables = {
    "num1": '',
    "num2": '',
    "operator": '',
    "decimalsAllowed": [true,true],
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
    let numbers;

    if(this.value >= 0 && this.value <= 9){
        if(checkStart()){
            screenText = [''];
        }
        screenText.push(this.value);
        if(opVariables["operator"] != ''){
            numbers = screenText.join('').split(` ${opVariables["operator"]} `);
            opVariables["num1"] = numbers[0];
            opVariables["num2"] = numbers[1];
        }
        docQueries["calcScreen"].textContent = screenText.join('');
    }else{
        switch(this.value){
            case '-':
                if(checkOpVariables()){
                    operate();
                    resetVariables();
                    opVariables["num1"] = docQueries["calcScreen"].textContent;
                    opVariables["operator"] = '-';
                    docQueries["calcScreen"].textContent += opArr.join('');
                    opVariables["decimalsAllowed"][0] = false;
                }else if(opVariables["operator"] == '' && !miscVariables["start"]){
                opVariables["operator"] = '-';
                screenText = screenText.concat(opArr);
                docQueries["calcScreen"].textContent = screenText.join('');
                }
                break;

            case '+':
                if(checkOpVariables()){
                    operate();
                    resetVariables();
                    opVariables["num1"] = docQueries["calcScreen"].textContent;
                    opVariables["operator"] = '+';
                    docQueries["calcScreen"].textContent += opArr.join('');
                    opVariables["decimalsAllowed"][0] = false;
                }else if(opVariables["operator"] == '' && !miscVariables["start"]){
                opVariables["operator"] = '+';
                screenText = screenText.concat(opArr);
                docQueries["calcScreen"].textContent = screenText.join('');
                }
                break;

            case 'x':
                if(checkOpVariables()){
                    operate();
                    resetVariables();
                    opVariables["num1"] = docQueries["calcScreen"].textContent;
                    opVariables["operator"] = 'x';
                    docQueries["calcScreen"].textContent += opArr.join('');
                    opVariables["decimalsAllowed"][0] = false;
                }else if(opVariables["operator"] == '' && !miscVariables["start"]){
                opVariables["operator"] = 'x';
                screenText = screenText.concat(opArr);
                docQueries["calcScreen"].textContent = screenText.join('');
                }
                break;

            case '/':
                if(checkOpVariables()){
                    operate();
                    resetVariables();
                    opVariables["num1"] = docQueries["calcScreen"].textContent;
                    opVariables["operator"] = '/';
                    docQueries["calcScreen"].textContent += opArr.join('');
                    opVariables["decimalsAllowed"][0] = false;
                }else if(opVariables["operator"] == '' && !miscVariables["start"]){
                opVariables["operator"] = '/';
                screenText = screenText.concat(opArr);
                docQueries["calcScreen"].textContent = screenText.join('');
                }
                break;

            case '=':
                if(checkOpVariables()){
                    operate(); 
                    miscVariables["start"] = true;  
                    resetVariables();
                }
                break;
            case '.':
                if(opVariables["operator"] == '' && opVariables["decimalsAllowed"][0]){
                    screenText.push('.');
                    docQueries["calcScreen"].textContent = screenText.join('');
                    opVariables["decimalsAllowed"][0] = false;
                    miscVariables["start"] = false;
                }else if(opVariables["operator"] != '' && opVariables["decimalsAllowed"][1]){
                    screenText.push('.');
                    docQueries["calcScreen"].textContent = screenText.join('');
                    opVariables["decimalsAllowed"][1] = false;
                }
                if(opVariables["operator"] != ''){
                    numbers = screenText.join('').split(` ${opVariables["operator"]} `);
                    opVariables["num1"] = numbers[0];
                    opVariables["num2"] = numbers[1];
                }
                break;
            case 'back':
                if(screenText[screenText.length - 1] == " " && !miscVariables["start"]){
                    for(let i = 1; i <= 3; i++){screenText.pop();};
                    opVariables["operator"] = '';
                }else{
                    screenText.pop();
                }
                docQueries["calcScreen"].textContent = screenText.join('');
                if(opVariables["operator"] != ''){
                    numbers = screenText.join('').split(` ${opVariables["operator"]} `);
                    opVariables["num1"] = numbers[0];
                    opVariables["num2"] = numbers[1];
                }
                break;
            case 'clear':
                resetVariables();
                restartScreen();
                miscVariables["start"] = true;
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

    let num1;
    let num2;
    let op = opVariables["operator"];
    
    if(opVariables["num1"].includes('.')){
        num1 = parseFloat(opVariables["num1"])
    }else{
        num1 = parseInt(opVariables["num1"]);
    };

    if(opVariables["num2"].includes('.')){
        num2 = parseFloat(opVariables["num2"]);
    }else{
        num2 = parseInt(opVariables["num2"]); 
    }

    if(opVariables["num1"] == '.') num1 = 0;
    if(opVariables["num2"] == '.') num2 = 0;


    switch(op){
        case '-':
            docQueries["calcScreen"].textContent = subtract(num1, num2);
            break;
        case '+':
            docQueries["calcScreen"].textContent = add(num1, num2);
            break;
        case 'x':
            docQueries["calcScreen"].textContent = multiply(num1, num2);
            break;
        case '/':
            if(num2 == 0){
                docQueries["calcScreen"].textContent = "you cant divide by zero ya goofball";
                resetVariables();
                miscVariables["start"] = true;
            }else{
            docQueries["calcScreen"].textContent = divide(num1, num2);
            }
            break;
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
        miscVariables["start"] = false;
        return true;
    }
    return false;
}

function checkOpVariables(){
    if(opVariables["num1"] != '' && opVariables["num2"] != '') return true;
}

function resetVariables(){
    opVariables["num1"] = '';
    opVariables["num2"] = '';
    opVariables["operator"] = '';
    opVariables["decimalsAllowed"][0] = true;
    opVariables["decimalsAllowed"][1] = true;
}

activateButtons();

docQueries["buttons"].forEach((btn)=>{
    btn.addEventListener("mousedown", ()=>{btn.style.backgroundColor = "rgb(62, 65, 66)"});
    btn.addEventListener("mouseup",()=>{btn.style.backgroundColor = ""});
});


angular
    .module('app')
    .controller('CalculatorController', CalculatorController);

function CalculatorController() {

    var vm = this;
    vm.equation = "0";
    var enteredFirstInput = false;

    vm.handleKeyboardInput = function (value) {
        var validInputs = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "+", "-", "*", "/", ".", "(", ")", "%"];

        if (validInputs.indexOf(value.key) > -1) {
            vm.append(value.key);
        }
        else if (value.key === "Enter") {
            vm.calculate();
        }
        else if (value.key === "Backspace") {
            vm.clearAll();
        }
        console.log(value);
    };

    vm.clearAll = function () {
        vm.equation = "0";
        enteredFirstInput = false;
    };

    vm.append = function (value) {
        if (!enteredFirstInput) {
            vm.equation = "";
            enteredFirstInput = true;
        }
        if (value === "+" || value === "-" || value === "/" || value === "*") {
            if (value === "-") {
                var tokenizedEquation = vm.equation.split(" ");

                if (tokenizedEquation.slice(-2)[0] === "(" && tokenizedEquation.slice(-1)[0] === " ") {
                    vm.equation += value;
                    return;
                }
                else if (tokenizedEquation.splice(-1)[0] === "") {
                    vm.equation += value;
                    return;
                }
            }
            vm.equation += " " + value + " ";
        }
        else if (value === "(") {
            vm.equation += value + " ";
        }
        else if (value === ")") {
            vm.equation += " " + value;
        }
        else {
            vm.equation += value;
        }
    };


    vm.calculate = function () {

        function isNumber(n) {
            return !isNaN(parseFloat(n)) && isFinite(n);
        }

        function isOperator(n) {
            var operators = ["+", "-", "*", "/"];
            return operators.indexOf(n) > -1

        }

        function hasHigherPrecedence(operator1, operator2) {
            if (operator2 === "(") {
                return true;
            }
            else if (operator1 === "+" || operator1 === "-") {
                return false;
            }
            else {
                return (operator2 === "+" || operator2 === "-") ? true : false;
            }
        }

        function process(stack1, stack2) {

            var math = {
                '+': function (a, b) {
                    return a + b;
                },
                '-': function (a, b) {
                    return a - b;
                },
                '*': function (a, b) {
                    return a * b;
                },
                '/': function (a, b) {
                    return a / b;
                }
            };

            var operand1 = parseFloat(stack1.pop());
            var operand2 = parseFloat(stack1.pop());
            var operator = stack2.pop();

            var result = math[operator](operand2, operand1);
            stack1.push(result);
        }


        function shuntingYard(char) {
            if (isNumber(char)) {
                operandContainer.push(char);
            }
            else if (isOperator(char) && operatorContainer.length === 0) {
                operatorContainer.push(char);
            }
            else if (isOperator(char) && hasHigherPrecedence(char, operatorContainer.slice(-1)[0])) {
                operatorContainer.push(char);
            }
            else if (char === "(") {
                operatorContainer.push(char);
            }
            else if (char === ")") {
                while (operatorContainer.slice(-1)[0] !== "(") {
                    process(operandContainer, operatorContainer);
                }
                operatorContainer.pop();
            }
            else {
                process(operandContainer, operatorContainer);
                if (isOperator(char)) {
                    operatorContainer.push(char);
                }
            }
        }

        var tokenizedEquation = vm.equation.split(" ");
        var operandContainer = [];
        var operatorContainer = [];

        for (var i = 0; i < tokenizedEquation.length; i++) {
            try {
                shuntingYard(tokenizedEquation[i]);
            }
            catch (e) {
                console.log(e);
                vm.equation = "Syntax ERROR";
                break;
            }
        }

        while (operatorContainer.length !== 0) {
            process(operandContainer, operatorContainer);
        }

        enteredFirstInput = false;

        if (isNaN(operandContainer[0])) {
            vm.equation = "Syntax Error"
        }
        else if (!(vm.equation === "Syntax Error")) {
            vm.equation = operandContainer[0];
        }

    };
}

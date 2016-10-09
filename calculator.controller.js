angular
    .module('app')
    .controller('CalculatorController', CalculatorController);

function CalculatorController() {

    var vm = this;
    vm.equation = "0";
    var enteredFirstInput = false;

    vm.append = function (value) {
        if (!enteredFirstInput) {
            vm.equation = "";
            enteredFirstInput = true;
        }
        if (value === "+" || value === "-" || value === "/" || value === "*") {
            vm.equation += " " + value + " ";
        }
        else {
            vm.equation += value;
        }
    };

    vm.clearAll = function () {
        vm.equation = "0";
        enteredFirstInput = false;
    };

    vm.handleKeyboardInput = function (value) {
        var validInputs = ["0","1", "2", "3", "4", "5", "6", "7", "8", "9", "+", "-", "*", "/", ".", "(", ")"];

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

    vm.calculate = function () {
        var tokenizedExpression = vm.equation.split(" ");
        console.log(tokenizedExpression);

        var operators = ["+", "-", "*", "/"];

        function hasHigherPrecedence(operator1, operator2) {
            if (operator1 === "+" || operator1 === "-") {
                return false;
            }
            else {
                return (operator2 === "+" || operator2 === "-") ? true : false;
            }
        }

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

        function process(stack1, stack2) {
            var operand1 = parseFloat(stack1.pop());
            var operand2 = parseFloat(stack1.pop());
            var operator = stack2.pop();

            var result = math[operator](operand1, operand2);
            stack1.push(result);

        }

        function isNumber(n) {
            return !isNaN(parseFloat(n)) && isFinite(n);
        }

        function isOperator(n) {
            return operators.indexOf(n) > -1

        }

        var operandContainer = [];
        var operatorContainer = [];

        tokenizedExpression.forEach(function (char) {
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
        });

        while (operatorContainer.length !== 0) {
            process(operandContainer, operatorContainer);
        }

        console.log(operandContainer);
        console.log(operatorContainer);
        vm.equation = operandContainer[0];

    };
}

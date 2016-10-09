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
        var validInputs = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "+", "-", "*", "/", ".", "(", ")"];

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
        vm.equation = "42";
    };
}

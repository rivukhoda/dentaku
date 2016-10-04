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

    }

    vm.clearAll = function () {
        vm.equation = "0";
        enteredFirstInput = false;
    }

    vm.calculate = function () {

    }

}

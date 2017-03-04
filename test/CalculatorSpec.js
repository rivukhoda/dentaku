describe('CalculatorController', function() {
    beforeEach(module('app'));

    var $controller;

    beforeEach(inject(function(_$controller_){
        // The injector unwraps the underscores (_) from around the parameter names when matching
        $controller = _$controller_;
    }));

    describe('vm.changeTheme', function() {
        it('sets the defaultTheme to "false" if it is set to true', function() {

            var controller = $controller('CalculatorController', {});
            controller.changeTheme();
            expect(controller.hasDefaultTheme).toEqual(false);
        });

        //it('sets the strength to "weak" if the password length <3 chars', function() {
        //    var $scope = {};
        //    var controller = $controller('PasswordController', { $scope: $scope });
        //    $scope.password = 'a';
        //    $scope.grade();
        //    expect($scope.strength).toEqual('weak');
        //});
    });
});
var App = angular.module('drag-and-drop', ['ngDragDrop']);

App.controller('oneCtrl', function($scope, $timeout) {
    $scope.list1 = [];
    $scope.list2 = [];
    $scope.list3 = [];
    $scope.list4 = [];

    $scope.item1 = { 'title': 'Item 1', 'drag': true, box: 'Box1' }

    $scope.list5 = [
        $scope.item1,
        { 'title': 'Item 2', 'drag': true, box: 'Box1' },
        { 'title': 'Item 3', 'drag': true, box: 'Box1' },
        { 'title': 'Item 4', 'drag': true, box: 'Box1' },
        { 'title': 'Item 5', 'drag': true, box: 'Box2' },
        { 'title': 'Item 6', 'drag': true, box: 'Box2' },
        { 'title': 'Item 7', 'drag': true, box: 'Box2' },
        { 'title': 'Item 8', 'drag': true, box: 'Box2' }
    ];

    $scope.optionsList1 = {
        accept: function (dragEl) {
            if ($scope.list1.length >= 2) {
                return false;
            }  else {
                return true;
            }
        }
    };

    $scope.optionsList2 = {
        accept: function (dragEl) {
            if ($scope.list2.length >= 2) {
                return false;
            } else {
                return true;
            }
        }
    };

    // Limit items to be dropped in list1
    $scope.optionsList3 = {
        accept: function (dragEl) {
            if ($scope.list1.length >= 2) {
                return false;
            } else {
                return true;
            }
        }
    };

    // Limit items to be dropped in list1
    $scope.optionsList4 = {
        accept: function (dragEl) {
            if ($scope.list1.length >= 2) {
                return false;
            } else {
                return true;
            }
        }
    };

    $scope.onDrop = function(target, source){
        alert("dropped " + source + " on " + target);
    };
});
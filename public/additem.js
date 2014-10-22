var addItem = angular.module('addItem', []);

addItem.controller('mainAddController', function($scope, $http) {

    $scope.formData = {};
    $scope.itemData = {};
    $scope.selectedScrumId = "";

    $scope.createScrum = function() {
        $http.post('/api/scrum', $scope.formData)
            .success(function(data) {
                $scope.formData = {}; // clear the form so our user is ready to enter another
                $scope.scrumitem = data;
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
        //Reload list also
        $http.get('/api/scrum')
            .success(function(data) {
                $scope.scrumitems = data;
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };
    //init list
    $http.get('/api/scrum')
        .success(function(data) {
            $scope.scrumitems = data;
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

    $scope.getSelectedDoc = function() {
        $http.get('/api/scrum/'+$scope.selectedScrumId)
            .success(function(data) {
                $scope.selectedScrum = data;
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    $scope.addNewScrumItem = function() {
        $http.post('/api/scrum/additem/'+$scope.selectedScrumId, $scope.itemData)
            .success(function(data) {
                console.log(data);
                $scope.itemData = {};
                $scope.selectedScrum = data;
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    $scope.removeScrumItem = function (itemId) {
        $http.post('/api/scrum/removeitem/'+$scope.selectedScrumId+'/'+itemId)
            .success(function(data) {
                console.log(data);
                $scope.selectedScrum = data;
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    $scope.updateScrumItem = function (item) {
        $http.post('/api/scrum/updateitem/'+$scope.selectedScrumId, item)
            .success(function(data) {
                //no reload here just update in background
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };



});
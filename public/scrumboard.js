var scrumboard = angular.module('scrumboard', []);

function mainScrumController($scope, $http) {

    $scope.formData = {};
    $scope.selectedScrumId = "";

    // when landing on the page, get all todos and show them
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

}
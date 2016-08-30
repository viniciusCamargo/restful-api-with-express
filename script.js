'use strict'

let app = angular.module('MyApp', [])

app.controller('MainController', ['$scope', '$http', ($scope, $http) => {

  $http.get('/api/bears')
    .success((data) => {
      $scope.bears = data
      // console.log(data)
    })
    .error((err) => {
      console.log(err)
    })

    $scope.bear = {
      name: ''
    }

    $scope.saveBear = () => {
      if ($scope.bear.name === '')
        return
      
        $http.post('api/bears', $scope.bear)
        location.reload()
    }
}])

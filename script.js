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
  
  $http.get('/api/fruits')
    .success((data) => {
      $scope.fruits = data
      // console.log(data)
    })
    .error((err) => {
      console.log(err)
    })

  document.getElementById('btn-save')
    .addEventListener('click', () => {
      if ($scope.Bear.name !== '')
        location.reload()
    }
  )

  $scope.clearForm = () => {
    $scope.Bear.name = ''
    $scope.Bear.id = ''
  }

  $scope.Bear = {
    id: '',
    name: ''
  }

  $scope.saveBear = () => {
    if ($scope.Bear.name !== '' && $scope.Bear.id === '')
      // console.log('name not null and id null -> creates bear')
      $http.post('api/bears', $scope.Bear)
    if ($scope.Bear.name !== '' && $scope.Bear.id !== '')
      // console.log('name not null and id not null -> updates bear')
      $http.post('api/bears/' + $scope.Bear.id, $scope.Bear)
    else
      // console.log('all null -> return/do nothing')
      return
  }

  $scope.editBear = (id, name) => {
    $scope.Bear.id = id
    $scope.Bear.name = name
    document.getElementById('input-bear').focus();
  }

  $scope.deleteBear = (id) => {
    $http.delete('api/bears/' + id)
    location.reload()
  }

}])

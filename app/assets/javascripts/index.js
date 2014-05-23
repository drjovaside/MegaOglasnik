'use strict';

/* Controllers */


var CategoryApp = angular.module('CategoryApp',['ngRoute']);
 
CategoryApp.service('dataService', function($http) {
this.getData = function(callbackFunc) {
    $http({
        method: 'GET',
        url: 'http://oglasnik.etf.ba/sponsored_ads.json'
        }).success(function(data){
        // With the data succesfully returned, call our callback
        callbackFunc(data);
    }).error(function(){
        alert("error");
    });
 }

});




CategoryApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/registration', {
        templateUrl: 'users/new'
        //controller: 'AddOrderController'
      }).
      when('/objavi', {
        templateUrl: 'ads/new'
        //controller: 'ShowOrdersController'
      }).
      when('/home', {
        templateUrl: 'partial_views/index'
        //controller: 'ShowOrdersController'
      }).
      when('/', {
        templateUrl: 'partial_views/index'
        //controller: 'ShowOrdersController'
      }).
      when('/najnoviji', {
        templateUrl: 'partial_views/latest_ads'
        //controller: 'ShowOrdersController'
      }).
      when('/product_detail', {
        templateUrl: 'partial_views/product_detail'
        //controller: 'ShowOrdersController'
      }).
      when('/cart', {
        templateUrl: 'partial_views/cart'
      });
     
  }]);




CategoryApp.controller('CategoryAds', function($scope, $http, dataService) {
    $scope.results = null;
    $scope.items=0;

   
    
    
    
    $scope.sponsored_ads = function () {
        $http({
        method: 'GET',
        url: 'http://oglasnik.etf.ba/sponsored_ads.json'
        }).success(function(data){
        // With the data succesfully returned, call our callback
        $scope.results = data;
    }).error(function(){
        alert("error");
    });
    };
    
    $scope.vozila = function() {
   $http({
        method: 'GET',
        url: 'http://oglasnik.etf.ba/categories/1.json',
        
        }).success(function(data){
        // With the data succesfully returned, call our callback
        $scope.results = data;
    }).error(function(){
        alert("error");
    });
    };
    
    $scope.nekretnine = function() {
   $http({
        method: 'GET',
        url: 'http://oglasnik.etf.ba/categories/2.json',
        
        }).success(function(data){
        // With the data succesfully returned, call our callback
        $scope.results = data;
    }).error(function(){
        alert("error");
    });
    };
    
    $scope.mobiteli = function() {
   $http({
        method: 'GET',
        url: 'http://oglasnik.etf.ba/categories/3.json',
        
        }).success(function(data){
        // With the data succesfully returned, call our callback
        $scope.results = data;
    }).error(function(){
        alert("error");
    });
    };
    
    
    $scope.sport = function() {
   $http({
        method: 'GET',
        url: 'http://oglasnik.etf.ba/categories/4.json'
        }).success(function(data){
        // With the data succesfully returned, call our callback
        $scope.results = data;
    }).error(function(){
        alert("error");
    });
    };
    
    $scope.odjeca = function() {
   $http({
        method: 'GET',
        url: 'http://oglasnik.etf.ba/categories/5.json'
        }).success(function(data){
        // With the data succesfully returned, call our callback
        $scope.results = data;
    }).error(function(){
        alert("error");
    });
    };
    
    $scope.igrice = function() {
   $http({
        method: 'GET',
        url: 'http://oglasnik.etf.ba/categories/5.json'
        }).success(function(data){
        // With the data succesfully returned, call our callback
        $scope.results = data;
    }).error(function(){
        alert("error");
    });
    };
    
    $scope.pcigre = function() {
   $http({
        method: 'GET',
        url: 'http://oglasnik.etf.ba/categories/6.json'
        }).success(function(data){
        // With the data succesfully returned, call our callback
        $scope.results = data;
    }).error(function(){
        alert("error");
    });
    };
    
    $scope.knjige = function() {
   $http({
        method: 'GET',
        url: 'http://oglasnik.etf.ba/categories/7.json'
        }).success(function(data){
        // With the data succesfully returned, call our callback
        $scope.results = data;
    }).error(function(){
        alert("error");
    });
    };
    
    $scope.umjetnost = function() {
   $http({
        method: 'GET',
        url: 'http://oglasnik.etf.ba/categories/8.json'
        }).success(function(data){
        // With the data succesfully returned, call our callback
        $scope.results = data;
    }).error(function(){
        alert("error");
    });
    };
     
    $scope.ostalo = function() {
   $http({
        method: 'GET',
        url: 'http://oglasnik.etf.ba/categories/9.json'
        }).success(function(data){
        // With the data succesfully returned, call our callback
        $scope.results = data;
    }).error(function(){
        alert("error");
    });
    };

    $scope.latestAds = function() {
       $http({
        method: 'GET',
        url: 'http://oglasnik.etf.ba/new_ads.json'
        }).success(function(data){
        // With the data succesfully returned, call our callback
        $scope.results = data;
    }).error(function(){
        alert("error");
    });
};


  $scope.login = function(user) {
   $http.defaults.headers.post["Content-Type"] = "application/json";
   $http.defaults.headers.post["Accept"] = "application/json";
   alert(user.email);
   alert(user.password);
    $http.post('http://localhost:3000/sessions', { "email": user.email, "password": user.password })
    .success(function(data){
        alert(data.email);
        $route.reload();
    }).error(function(data){
        alert(data)});

  };

$scope.trazi = function(rijec) {

    $http.post('http://localhost:3000/search', {"search": rijec })
    .success(function(data){
        $scope.results = data;
    }).error(function(data){
        alert(data)});
    
};

$scope.go = function ( path ) {
  $location.path( path );
};



$scope.dodajukorpu = function(price){
    $scope.items = $scope.items + Number(price);
    
};

$scope.niz = 0;
$scope.total = function(total) {
    $scope.niz = total;


};

});

'use strict';

/* Controllers */


var CategoryApp = angular.module('CategoryApp',['ngRoute','ngResource','ui.bootstrap']);
var varijabla;

var RatingDemoCtrl = function ($scope) {
  $scope.rate = 7;
  $scope.max = 10;
  $scope.isReadonly = false;

  $scope.hoveringOver = function(value) {
    $scope.overStar = value;
    $scope.percent = 100 * (value / $scope.max);
  };


};


CategoryApp.controller('AdDetail', function($scope,$rootScope, $http, dataService,Proizvodi,Komentari) {
    
    
    $scope.pokreni = function() {
     varijabla = $rootScope.ad_id;
    $scope.ad = Proizvodi.get({},{'Id': varijabla});
    $scope.comments = Komentari.get({},{'Id': varijabla});
}
    
    
    $scope.posaljiKomentar = function (comment) {
    $http.defaults.headers.post["Content-Type"] = "application/json";
    $http.defaults.headers.post["Accept"] = "application/json";
  var user_id = $rootScope.user_id;
  var pomocna = $rootScope.ad_id;
  var content = comment.content;
 comment.user_id = $rootScope.user_id;   $http.post('http://localhost:3000/ads/comments', 
    { "content": comment.content, "ad_id": $rootScope.ad_id, "user_id": $rootScope.user_id })
    .success(function(data){
        alert("Usojesno objavljen komentar!");
    }).error(function(data){
        alert("nije proslo")});
        
    };
$scope.comments = Komentari.get({},{'Id': $rootScope.ad_id});

});

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

CategoryApp.factory("Proizvodi", function ($resource) {
    return $resource(
        "http://localhost:3000/ads/:Id.json",
        {Id: "@Id" },
        {
            "update": {method: "PUT"},
            "reviews": {'method': 'GET', 'params': {'reviews_only': "true"}, isArray: true},
            'query': {method: 'GET', isArray: false }
 
        }
    );
});

CategoryApp.factory("Komentari", function ($resource) {
    return $resource(
        "http://localhost:3000/ads/:Id/comments.json",
        {Id: "@Id" },
        {
            "update": {method: "PUT"},
            "reviews": {'method': 'GET', 'params': {'reviews_only': "true"}, isArray: true},
            'query': {method: 'GET', isArray: true },
            'get':    {method:'GET', isArray: true }
 
        }
    );
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
      when('/login', {
        templateUrl: 'partial_views/login'
        //controller: 'ShowOrdersController'
      }).
      when('/cart', {
        templateUrl: 'partial_views/cart'
      });
     
  }]);




CategoryApp.controller('CategoryAds', function($scope,$rootScope, $http, dataService,Proizvodi,Komentari) {
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
    $http.post('http://localhost:3000/sessions', { "email": user.email, "password": user.password })
    .success(function(data){
        $rootScope.user_id=data.id;
     
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
    
$scope.novaFunkcija = function(id) {
$rootScope.ad_id = id;


};
    

});

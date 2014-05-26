'use strict';

/* Controllers */


var CategoryApp = angular.module('CategoryApp',['ngRoute','ngResource','ui.bootstrap', 'ngStorage']);
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


CategoryApp.controller('AdDetail', function($scope,$rootScope, $http, $localStorage, dataService,Proizvodi,Komentari) {
    
    
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

angular.module('App', ['ngStorage']).controller('Ctrl', function($scope, $localStorage,$sessionStorage){

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

CategoryApp.factory("Kategorije", function ($resource) {
    return $resource(
        "http://localhost:3000/categories/:Id.json",
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
       when('/search', {
        templateUrl: 'partial_views/search'
        //controller: 'ShowOrdersController'
      }).
      when('/login', {
        templateUrl: 'partial_views/login'
        //controller: 'ShowOrdersController'
      }).
      when('/categorie_ads', {
        templateUrl: 'partial_views/categorie_ads'
        //controller: 'ShowOrdersController'
      }).
      when('/cart', {
        templateUrl: 'partial_views/cart'
      });
     
  }]);




CategoryApp.controller('CategoryAds', function($scope,$rootScope, $http, $localStorage, dataService,Proizvodi,Komentari,Kategorije) {
    $scope.results = null;
    
    kategorije();
    
    
    
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
    
    function kategorije() {
        $scope.categories = Kategorije.query();
    };
    
    $scope.oglasiIzKategorije = function () {
    $scope.results = Kategorije.get({},{'Id': $rootScope.categorieId});
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
$rootScope.slovo = rijec;
    $http.post('http://localhost:3000/search', {"search": $rootScope.slovo })
    .success(function(data){
        $scope.results = data;
    }).error(function(data){
        alert(data)});
    
};



$scope.go = function ( path ) {
  $location.path( path );
};



$scope.items=0;

$scope.dodajCijenu = function(price){
    $scope.items = $scope.items + Number(price);
};

$scope.$localStorage = $localStorage.$default({
        subjects: []

  });

$scope.subjects = $localStorage.subjects;
$scope.dodajukorpu = function (id, title, price) {

    $rootScope.AdID=id;
    $rootScope.AdTitle=title;
    $rootScope.AdPrice=price;

    $localStorage.subjects.push({ id:  $rootScope.AdID, title:  $rootScope.AdTitle, price: $rootScope.AdPrice})

};

$scope.izbrisiizkorpe = function (id, title, price){

    $rootScope.AdID=id;
    $rootScope.AdTitle=title;
    $rootScope.AdPrice=price;
     
     $localStorage.subjects.splice({ id:  id, title:  title, price: price},1);

};

//$scope.niz = 0;
$scope.ukupnaCijena = function(total) {
    $rootScope.cijena = total;


};
    
$scope.novaFunkcija = function(id) {
$rootScope.ad_id = id;
};
    
$scope.testna = function (rate) {
alert(rate);
};

$scope.kategorija = function(id) {
$rootScope.categorieId = id;

};
    
});

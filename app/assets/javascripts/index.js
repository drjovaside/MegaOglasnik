'use strict';

/* Controllers */


var CategoryApp = angular.module('CategoryApp',['ngRoute','ngResource','ui.bootstrap', 'ngStorage']);
var varijabla;

var RatingDemoCtrl = function ($scope) {
  $scope.rate = 8;
  $scope.max = 10;
  $scope.isReadonly = false;
  $scope.postaviRating = function (value) { $scope.rate = value;};
  $scope.hoveringOver = function(value) {
    $scope.overStar = value;
    $scope.percent = 100 * (value / $scope.max);
  };


};


CategoryApp.controller('AdDetail',['$scope','$rootScope', '$http', '$localStorage', 'dataService','Proizvodi','Komentari',                          
    function($scope,$rootScope, $http, $localStorage, dataService,Proizvodi,Komentari) {
    
    
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
        alert("Uspjesno objavljen komentar!");
        $scope.comments = Komentari.get({},{'Id': $rootScope.ad_id});
    }).error(function(data){
        alert("nije proslo")});
        
    };
$scope.comments = Komentari.get({},{'Id': $rootScope.ad_id});

}]);

CategoryApp.controller('Ctrl', ['$scope', '$localStorage','$sessionStorage', function($scope, $localStorage,$sessionStorage){

}]);

CategoryApp.service('dataService', function($http) {
this.getData = function(callbackFunc) {
    $http({
        method: 'GET',
        url: 'http://localhost:3000/sponsored_ads.json'
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
            "save": {method: "PUT"},
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

CategoryApp.factory("Korisnici", function ($resource) {
    return $resource(
        "http://localhost:3000/users/:Id.json",
        {Id: "@Id" },
        {
            "update": {method: "PUT"},
            "reviews": {'method': 'GET', 'params': {'reviews_only': "true"}, isArray: true},
            'query': {method: 'GET', isArray: true },
            'get':    {method:'GET', isArray: false }
 
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
        templateUrl: 'partial_views/new_ad'

        //controller: 'ShowOrdersController'
      }).
      when('/registracija', {
        templateUrl: 'partial_views/registration'
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
      when('/profile', {
        templateUrl: 'partial_views/profile'
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




CategoryApp.controller('CategoryAds',['$scope','$rootScope', '$http', '$localStorage', 'dataService','Proizvodi','Komentari','Kategorije','Korisnici', function($scope,$rootScope, $http, $localStorage, dataService,Proizvodi,Komentari,Kategorije,Korisnici) {
    $scope.results = null;
    kategorije();
    isLogged();
   
    function isLogged() {
        if ($localStorage.user_id == null) {
            $rootScope.reg_and_login_value = false;
            return false;
        }
            else {
            $rootScope.reg_and_login_value = true;
            $rootScope.username = $localStorage.username;
            return true;
            }
    
    }
    
    $scope.sponsored_ads = function () {
        
        $http({
        method: 'GET',
        url: 'http://localhost:3000/sponsored_ads.json'
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
        url: 'http://localhost:3000/new_ads.json'
        }).success(function(data){
        // With the data succesfully returned, call our callback
        $scope.results = data;
    }).error(function(){
        alert("error");
    });
};


  $scope.login = function(user) {
  $scope.user_id = $localStorage.user_id;
   $localStorage.user_id = null;
  $scope.username = $localStorage.username;
   $localStorage.username = null;
   $http.defaults.headers.post["Content-Type"] = "application/json";
   $http.defaults.headers.post["Accept"] = "application/json";
    $http.post('http://localhost:3000/sessions', { "email": user.email, "password": user.password })
    .success(function(data){
         $rootScope.user_id=data.id;
         $rootScope.reg_and_login_value = true;
        $localStorage.user_id = data.id;
        $localStorage.username = data.username;
        isLogged();
       $rootScope.login_alerts = [
    { login_type: 'success', login_msg: 'Uspješno ste se prijavili!' }
  ];
     
    }).error(function(data){
       $rootScope.login_alerts = [
    { login_type: 'danger', login_msg: 'Unijeli ste pogrešnu email adresu ili password. Pokušajte ponovo.' }
  ];
     
    });
        
  };
    
    
 $scope.profil = function () {
     
     $scope.user =  Korisnici.get({},{'Id': $localStorage.user_id });
     
 };
    
    
     $scope.logout = function(user) {
          $localStorage.user_id = null;
          $localStorage.username = null;
         
         $http.get('http://localhost:3000/logout')
    .success(function(data){
        $localStorage.user_id = null;
        $localStorage.username = null;
       $rootScope.login_alerts = [
    { login_type: 'success', login_msg: 'Uspješno ste se odjavili!' }
  ];
     isLogged();
    }).error(function(data){
       $rootScope.login_alerts = [
    { login_type: 'danger', login_msg: 'Odjava nije uspjela. Pokušajte ponovo.' }
  ];
     
    });
         
           
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


$scope.PorukaDodanoUkorpu = function(){
  alert("Item added to cart!");
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


$scope.total = function (){
  var suma=0;
  var duzina=$localStorage.subjects.lenght;
  angular.forEach($localStorage.subjects, function(subject) {
            suma += Number(subject.price); 
          })
  return suma;
};
    
$scope.novaFunkcija = function(id) {
$rootScope.ad_id = id;
};
    
$scope.dodajRating = function (rate,id) {
var oglas = Proizvodi.get({},{'Id': id}); 
var rejting = rate;

oglas.rating = rate;
oglas.$save();
};

$scope.kategorija = function(id) {
$rootScope.categorieId = id;
$scope.results = Kategorije.get({},{'Id': $rootScope.categorieId});

};
    $scope.registruj = function(user) { 
    $http.defaults.headers.post["Content-Type"] = "application/json"; 
    $http.defaults.headers.post["Accept"] = "application/json"; 
    $http.post('http://localhost:3000/users', { "username": user.username, "firstname": user.firstname, "lastname": user.lastname, "email": user.email, "password": user.password }) .success(function(data){
        $rootScope.registration_alerts = [
    { type: 'success', registration_msg: 'Uspješno ste se registrovali, molimo Vas verifikujte Vas mail.' }
  ];})
.error(function(data){ 
        $rootScope.registration_alerts = [
    { registration_type: 'danger', registration_msg: 'Registracija nije uspjela.' }
  ]; });
    };
    
    $scope.objavi = function(ad) { 
    $http.defaults.headers.post["Content-Type"] = "application/json"; 
    $http.defaults.headers.post["Accept"] = "application/json"; 
    $http.post('http://localhost:3000/ads', { "title": ad.title, "price": ad.price, "description": ad.description, "user_id" : $localStorage.user_id}) .success(function(data){
        $rootScope.ad_id = data.id;
        $rootScope.new_ad_alerts = [
    { new_ad_type: 'success', new_ad_msg: 'Uspjesno ste objavili oglas!' }
  ];})
.error(function(data){ 
    $rootScope.new_ad_alerts = [
    { new_ad_type: 'danger', new_ad_msg: 'Objava oglasa nije uspjela.' }
  ]; });
    };
    
}]);

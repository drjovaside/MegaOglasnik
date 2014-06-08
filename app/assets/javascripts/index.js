'use strict';

/* Controllers */


var CategoryApp = angular.module('CategoryApp',['ngRoute','ngResource','ui.bootstrap', 'ngStorage','angularFileUpload']);
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


CategoryApp.controller('AdDetail',['$scope','$rootScope', '$http', '$localStorage', 'dataService','Proizvodi','Komentari','Korisnici','OglasiKorisnika',                          
    function($scope,$rootScope, $http, $localStorage, dataService,Proizvodi,Komentari,Korisnici,OglasiKorisnika) {
    
    
    $scope.pokreni = function() {
    varijabla = $rootScope.ad_id;
    $scope.ad = Proizvodi.get({'Id': varijabla}, function (ad){
                $scope.id=ad.user_id;    
    $scope.korisnik =  Korisnici.get({'Id': $scope.id }, function (korisnik){
                                  $rootScope.ime = korisnik.username;
                                  $localStorage.korisnicki_id = korisnik.user_id;
                                    });
                                    });
    $scope.comments = Komentari.get({},{'Id': varijabla});
   // $rootScope.ad_id = null;
         
};
    
    
    $scope.posaljiKomentar = function (comment) {
    $http.defaults.headers.post["Content-Type"] = "application/json";
    $http.defaults.headers.post["Accept"] = "application/json";
    var user_id = $rootScope.user_id;
    var pomocna = $rootScope.ad_id;
    var content = comment.content;
    comment.user_id = $rootScope.user_id;   
    $http.post('http://localhost:3000/ads/comments', 
    { "content": comment.content, "ad_id": $rootScope.ad_id, "user_id": $rootScope.user_id })
    .success(function(data){
        alert("Uspjesno objavljen komentar!");
        $scope.comments = Komentari.get({},{'Id': $rootScope.ad_id});
    }).error(function(data){
        alert("Greska!")});
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

CategoryApp.factory("OglasiKorisnika", function ($resource) {
    return $resource(
        "http://localhost:3000/users/:Id/ads.json",
        {Id: "@Id" },
        {
            "save": {method: "PUT"},
            "reviews": {'method': 'GET', 'params': {'reviews_only': "true"}, isArray: true},
            'query': {method: 'GET', isArray: false },
            'get':    {method:'GET', isArray: true }
 
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
            "save": {method: "PUT"},
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
      when('/myprofile', {
        templateUrl: 'partial_views/myprofile'
        //controller: 'ShowOrdersController'
      }).
      when('/categorie_ads', {
        templateUrl: 'partial_views/categorie_ads'
        //controller: 'ShowOrdersController'
      }).
      when('/contact', {
        templateUrl: 'partial_views/contact'
        //controller: 'ShowOrdersController'
      }).
      when('/wish', {
        templateUrl: 'partial_views/wishList'
        //controller: 'ShowOrdersController'
      }).
      when('/editprofile', {
        templateUrl: 'partial_views/editprofile'
        //controller: 'ShowOrdersController'
      }).
      when('/profile', {
        templateUrl: 'partial_views/user_profile'
        //controller: 'ShowOrdersController'
      }).
      when('/cart', {
        templateUrl: 'partial_views/cart'
      });
     
  }]);




CategoryApp.controller('CategoryAds',['$scope','$rootScope', '$http', '$upload','$localStorage', 'dataService','Proizvodi','Komentari','Kategorije','Korisnici','OglasiKorisnika', function($scope,$rootScope,$http,$upload, $localStorage, dataService,Proizvodi,Komentari,Kategorije,Korisnici,OglasiKorisnika) {
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
    
    
    $scope.onFileSelect = function($files) {
    var user_id = $localStorage.user_id;
        
    $http.defaults.headers.post["Content-Type"] = "image/jpeg";
    $http.defaults.headers.post["Accept"] = "image/jpeg";
    //$files: an array of files selected, each file has name, size, and type.
    for (var i = 0; i < $files.length; i++) {
      var file = $files[i];
        
      $scope.upload = $upload.upload({
        url: 'http://localhost:3000/users/' + user_id + '/upload_photo', 
          //upload.php script, node.js route, or servlet url
         //method: 'POST',
        // headers: {'header-key': 'header-value'},
          
        // withCredentials: true,
        data: {user_id: $localStorage.user_id},
        file: file, // or list of files: $files for html5 only
        /* set the file formData name ('Content-Desposition'). Default is 'file' */
        //fileFormDataName: myFile, //or a list of names for multiple files (html5).
        /* customize how data is added to formData. See #40#issuecomment-28612000 for sample code */
        //formDataAppender: function(formData, key, val){}
      }).progress(function(evt) {
        console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
      }).success(function(data, status, headers, config) {
        // file is uploaded successfully
        console.log(data);
      });
      //.error(...)
      //.then(success, error, progress); 
      //.xhr(function(xhr){xhr.upload.addEventListener(...)})// access and attach any event listener to XMLHttpRequest.
    }
    /* alternative way of uploading, send the file binary with the file's content-type.
       Could be used to upload files to CouchDB, imgur, etc... html5 FileReader is needed. 
       It could also be used to monitor the progress of a normal http post/put request with large data*/
    // $scope.upload = $upload.http({...})  see 88#issuecomment-31366487 for sample code.
  };
    
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
    
    
 $scope.myProfile = function () {
     
     $scope.user =  Korisnici.get({},{'Id': $localStorage.user_id });
     $http.get('http://localhost:3000/myads')
    .success(function(data){
        $scope.results = data;
    }).error(function(data){
       alert("ne prolazi");
     
    });
     
 };
    
$scope.userProfile = function (id) {
     $rootScope.id = id;
 };

$scope.pokreniPrikazProfilaKorisnika = function () {
$scope.user =  Korisnici.get({},{'Id':  $rootScope.id });
     $scope.results = OglasiKorisnika.get({},{'Id': $rootScope.id });
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

$scope.$localStorage = $localStorage.$default({
        lists: []
        
  });

$scope.lists = $localStorage.lists;
$scope.dodajulistu = function(book, autor){
  $rootScope.book=book;
  $rootScope.autor=autor;
  $localStorage.lists.push({ book: $rootScope.book, autor: $rootScope.autor})
};

$scope.izbrisiizliste = function(book, autor){
  $rootScope.book=book;
  $rootScope.autor=autor;
 $localStorage.lists.splice({ book: book, autor: autor},1);
};

$scope.brojac = function (){
  var brojac=0;
  var duzina=$localStorage.subjects.lenght;
  angular.forEach($localStorage.subjects, function(subject) {
            brojac += 1; 
          })
  return brojac;
};

$scope.isPopupVisible = false;
$scope.showPopup = function () {
    $scope.isPopupVisible = true;
};


$scope.submitForm = function(isValid) {
  if (isValid) {
        alert('our form is amazing');
      }
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
    $http.post('http://localhost:3000/ads', { "title": ad.title, "price": ad.price, "description": ad.description, "user_id" : $localStorage.user_id, "category_id": ad.category_id}) .success(function(data){
        $rootScope.ad_id = data.id;
        $rootScope.new_ad_alerts = [
    { new_ad_type: 'success', new_ad_msg: 'Uspjesno ste objavili oglas!' }
  ];})
.error(function(data){ 
    $rootScope.new_ad_alerts = [
    { new_ad_type: 'danger', new_ad_msg: 'Objava oglasa nije uspjela.' }
  ]; });
    };
    
    
    $scope.pokreniIzmjenuProfila = function () {
         $scope.user =  Korisnici.get({},{'Id': $localStorage.user_id });
        
    };
    
    
    $scope.spasiPromjeneIzmjeneProfila = function (user) {
    var korisnik =  Korisnici.get({},{'Id': $localStorage.user_id });
    korisnik.firstname = user.firstname;
    korisnik.lastname = user.lastname;
    korisnik.email = user.email;
    korisnik.password = user.password;
    korisnik.adress = user.adress;
    korisnik.tel_num = user.tel_number;
    korisnik.city = user.city;
    korisnik.$save();
    };
    
    $scope.obrisiArtikal = function(id) {
    Proizvodi.delete({}, {'Id': 1});
    
    
    };
}]);

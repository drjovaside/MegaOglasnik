'use strict';

/* Controllers */
    var translationsEN = {
    SEARCH: 'Search', 
    LOGIN:  'Login',
    REGISTRATION: 'Registration',
    MESSAGES: 'Messages',
    LOGOUT: 'Logout',
    HOME: 'Home',
    PUBLISH: 'Publish',
    NEW: 'New!',
    TOP_RATED: 'Top rated',
    WISH_LIST: 'Wish list',
    WELCOME: 'Welcome!',
    NEW_AD: 'New Ad',
    DEPARTMENT: 'Department',    
    AUTOMATIC: 'Automatic Control and Electronics',
    ENERGETIC: 'Electric Power Engineering',
    TELECOMUNICATION: 'Telecommunication',
    INFORMATIC: 'Computer Science and Informatics',
    YEAR_OF_STUDY: 'Year of study',
    FIRST: 'First',
    SECOND: 'Second',
    THIRD: 'Third',
    FOURTH: 'Fourth',
    FIFTH: 'Fifth',
    TITLE: 'Title',
    REQUIRED: 'Required',
    PRICE: 'Price',
    AUTHOR: 'Author',
    DESCRIPTION: 'Description',    
    FOR_EXCHANGE: 'For exchange',    
    BUTTON_LANG_DE: 'Bosnian',
    BUTTON_LANG_EN: 'English',
    CHOOSE: 'Choose new picture below',    
    BOOK_NAME: 'Book name',
    NAME: 'Name',
    YES: 'Yes',
    NO: 'No',
    PUBLISHED: 'Published by',
    RESERVED: 'Reserved',
    ALL_COMMENTS: 'All comments',
    ADD_COMMENT: 'Add comment', 
    COMMENT: 'Comment',
    YEAR: 'Year',
    VIEW: 'View',
    ADD_IN_CART: 'Add in cart',
    TYPE_SOMETHING: 'Type something',
    INBOX: 'Inbox',
    SENT: 'Sent',
    FROM: 'From',
    DATE: 'Date',
    SHOW_MESSAGE: 'Show message',
    COMPOSE_MESSAGE: 'Compose message',
    WELCOME_PROFILE: 'Welcome to your profile!',
    AVATAR_CHANGE: 'To change your avatar click below',
    LAST_NAME: 'Last name',
    CITY: 'City',
    ADRESS: 'Adress',
    TEL_NUM: 'Telephone number',
    EDIT_PROFILE: 'Edit profile',
    DELETE: 'Delete',
    NAME_USER: 'Name',
    SEARCH_RESULTS: 'Search results for "'    
    };
     
    var translationsDE= {
    SEARCH: 'Trazi',     
    LOGIN:  'Prijava',
    REGISTRATION: 'Registracija',
    MESSAGES: 'Poruke',
    LOGOUT: 'Odjava',
    HOME: 'Početna',
    PUBLISH: 'Objavi',
    NEW: 'Novo!',
    TOP_RATED: 'Najbolje ocijenjene',
    WISH_LIST: 'Lista želja',
    WELCOME: 'Dobrodošli!',
    NEW_AD: 'Novi oglas',
    DEPARTMENT: 'Odsjek',    
    AUTOMATIC: 'Automatika i elektronika',
    ENERGETIC: 'Energetika',
    TELECOMUNICATION: 'Telekomunikacije',
    INFORMATIC: 'Računarstvo i informatika',
    YEAR_OF_STUDY: 'Godina studija',
    FIRST: 'Prva',
    SECOND: 'Druga',
    THIRD: 'Treća',
    FOURTH: 'Četvrta',
    FIFTH: 'Peta',
    TITLE: 'Naslov',
    REQUIRED: 'Potreban',
    PRICE: 'Cijena',
    AUTHOR: 'Autor',
    FOR_EXCHANGE: 'Za razmjenu', 
    DESCRIPTION: 'Opis',   
    BUTTON_LANG_DE: 'Bosanski',
    BUTTON_LANG_EN: 'Engleski',
    CHOOSE: 'Da izaberete sliku kliknite ispod',
    BOOK_NAME: 'Naziv knjige',
    NAME: 'Naziv',
    YES: 'Da',
    NO: 'Ne',
    PUBLISHED: 'Objavio',
    RESERVED: 'Rezervisano',
    ALL_COMMENTS: 'Svi komentari',
    ADD_COMMENT: 'Dodaj komentar', 
    COMMENT: 'Komentar',
    YEAR: 'Godina',
    VIEW: 'Pogledaj',
    ADD_IN_CART: 'Dodaj u korpu',
    TYPE_SOMETHING: 'Ukucajte nesto',
    INBOX: 'Pristigle',
    SENT: 'Poslane',
    FROM: 'Od',
    DATE: 'Datum',
    SHOW_MESSAGE: 'Prikaži poruku',
    COMPOSE_MESSAGE: 'Nova poruka',
    WELCOME_PROFILE: 'Dobrodošli na vaš profil!',
    AVATAR_CHANGE: 'Za promjenu avatara kliknite ispod',
    LAST_NAME: 'Prezime',
    CITY: 'Grad',
    ADRESS: 'Adresa',
    TEL_NUM: 'Br. tel.',
    EDIT_PROFILE: 'Uredi profil',
    DELETE: 'Izbriši',
    NAME_USER: 'Ime',
    SEARCH_RESULTS: 'Rezultati pretrage za "'     
    };


var CategoryApp = angular.module('CategoryApp',['ngRoute','ngResource','ui.bootstrap', 'ngStorage','angularFileUpload','pascalprecht.translate']);
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
                $scope.zamjena=ad.forexchange;
    $scope.korisnik =  Korisnici.get({'Id': $scope.id }, function (korisnik){
                                  $rootScope.ime = korisnik.username;
                                  $localStorage.korisnicki_id = korisnik.id;
                                  if($localStorage.user_id == korisnik.id && $localStorage.user_id != null) {
                                      $scope.isOwner = true;
                                  }
                                  else {
                                      $scope.isOwner = false;
                                  }
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







CategoryApp.config(['$routeProvider','$translateProvider',
  function($routeProvider,$translateProvider) {
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
      when('/ae', {
        templateUrl: 'partial_views/ae'
        //controller: 'ShowOrdersController'
      }).
      when('/ee', {
        templateUrl: 'partial_views/ee'
        //controller: 'ShowOrdersController'
      }).
      when('/ri', {
        templateUrl: 'partial_views/ri'
        //controller: 'ShowOrdersController'
      }).
      when('/tk', {
        templateUrl: 'partial_views/tk'
        //controller: 'ShowOrdersController'
      }).
       when('/1', {
        templateUrl: 'partial_views/prva_godina'
        //controller: 'ShowOrdersController'
      }).
       when('/2', {
        templateUrl: 'partial_views/druga_godina'
        //controller: 'ShowOrdersController'
      }).
       when('/3', {
        templateUrl: 'partial_views/treca_godina'
        //controller: 'ShowOrdersController'
      }).
       when('/4', {
        templateUrl: 'partial_views/cetvrta_godina'
        //controller: 'ShowOrdersController'
      }).
       when('/5', {
        templateUrl: 'partial_views/peta_godina'
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
    when('/new_message', {
        templateUrl: 'partial_views/new_message'
      }).
    when('/messages', {
        templateUrl: 'partial_views/messages'
      }).
    when('/show_message', {
        templateUrl: 'partial_views/show_message'
      }).
    when('/sent', {
        templateUrl: 'partial_views/sent'
      }).
      when('/cart', {
        templateUrl: 'partial_views/cart'
      });
$translateProvider.translations('en', translationsEN);
$translateProvider.translations('de', translationsDE);
$translateProvider.preferredLanguage('en');
$translateProvider.fallbackLanguage('en');
    
     
  }]);

CategoryApp.config(['$httpProvider', function($httpProvider) {
    var csrfToken = $('meta[name=csrf-token]').attr('content');
    $httpProvider.defaults.headers.post['X-CSRF-Token'] = csrfToken;
}]);

CategoryApp.controller('EmailController',['$scope','$rootScope','$http','$localStorage', function($scope,$rootScope,$http,$localStorage){
    
    $scope.sendMessage = function(message) {
        alert(message.receiver_username);
    $http.post('http://localhost:3000/create_message', {  "title": message.title, "content": message.content, "user_sender_id": $localStorage.user_id, "timestamp": message.timestamp,"sender_username": $localStorage.username,"receiver_username": message.receiver_username})
    .success(function(data){
         alert("poslata poruka");
    }).error(function(data){
        alert("nije proslo");
    });
        
    };
    
    $scope.otvoriPoruku = function(message) {
    $rootScope.message = message;
    };
    
    $scope.populateInbox = function() {
           
    $http.get('http://localhost:3000/recieved_messages')
    .success(function(data){
         
        $scope.messages=data;
    }).error(function(data){
        
    });
    };
    
    $scope.populateSent = function() {
           
    $http.get('http://localhost:3000/sent_messages')
    .success(function(data){
         
        $scope.messages=data;
    }).error(function(data){
        
    });
    };
    
    
    $scope.selectMessage = function (message) {
    
    $scope.selectedMessage = message;
};
    
    $scope.isPopupVisible = false;
            $scope.isComposePopupVisible = false;
            $scope.composeEmail = {};
            $scope.activeTab = "inbox";
            $scope.sentEmails = [];

            $scope.forward = function () {
                $scope.isPopupVisible = false;
                $scope.composeEmail = {};
                angular.copy($scope.selectedEmail, $scope.composeEmail);

                $scope.composeEmail.body =
                    "\n-------------------------------\n"
                    + "from: " + $scope.composeEmail.from + "\n"
                    + "sent: " + $scope.composeEmail.date + "\n"
                    + "to: " + $scope.composeEmail.to + "\n"
                    + "subject: " + $scope.composeEmail.subject + "\n"
                    + $scope.composeEmail.body;

                $scope.composeEmail.subject = "FW: " + $scope.composeEmail.subject;
                $scope.composeEmail.to = "";
                $scope.composeEmail.from = "me";
                $scope.isComposePopupVisible = true;
            };

            $scope.reply = function () {
                // hide the view details popup
                $scope.isPopupVisible = false;

                // create an empty composeEmail object the compose 
                // email popup is bound to
                $scope.composeEmail = {};

                // copy the data from selectedEmail into composeEmail
                angular.copy($scope.selectedEmail, $scope.composeEmail);

                // edit the body to prefix it with a line and the 
                // original email information
                $scope.composeEmail.body =
                    "\n-------------------------------\n"
                    + "from: " + $scope.composeEmail.from + "\n"
                    + "sent: " + $scope.composeEmail.date + "\n"
                    + "to: " + $scope.composeEmail.to + "\n"
                    + "subject: " + $scope.composeEmail.subject + "\n"
                    + $scope.composeEmail.body;

                // prefix the subject with “RE:”
                $scope.composeEmail.subject = "RE: " + $scope.composeEmail.subject;

                // the email is going to the person who sent it 
                // to us so populate the `to` with `from`
                $scope.composeEmail.to = $scope.composeEmail.from;

                // it’s coming from us
                $scope.composeEmail.from = "me";

                // show the compose email popup
                $scope.isComposePopupVisible = true;
            };

            $scope.sendEmail = function () {
                $http.post("/Home/SendEmail", $scope.composeEmail).then(function (response) {
                    $scope.isComposePopupVisible = false;
                    $scope.composeEmail = response.data;
                    $scope.sentEmails.splice(0, 0, $scope.composeEmail);
                });
            };

            $scope.showComposePopup = function () {
                $scope.composeEmail = {};
                $scope.isComposePopupVisible = true;
            };

            $scope.closeComposePopup = function () {
                $scope.isComposePopupVisible = false;
            };

            $scope.showPopup = function (email) {
                $scope.isPopupVisible = true;
                $scope.selectedEmail = email;
            };

            $scope.closePopup = function () {
                $scope.isPopupVisible = false;
            };

            ;
    
}]);


CategoryApp.controller('CategoryAds',['$scope','$rootScope', '$http', '$upload','$localStorage', 'dataService','Proizvodi','Komentari','Kategorije','Korisnici','OglasiKorisnika','$translate', function($scope,$rootScope,$http,$upload, $localStorage, dataService,Proizvodi,Komentari,Kategorije,Korisnici,OglasiKorisnika,$translate) {
    $scope.results = null;
    kategorije();
    isLogged();
    
     $scope.changeLanguage = function (langKey) {
$translate.use(langKey);
};
    
    function isLogged() {
        
    $http.get('http://localhost:3000/session')
    .success(function(data){
        var statusSesije = data;
       $rootScope.korisnik = data;
        //alert("status sesije id " + statusSesije.id);
        //alert("localst user id" + $localStorage.user_id);
        //if (!statusSesije.id || $localStorage.user_id == null) {
        if (!statusSesije.id ) {
            $rootScope.reg_and_login_value = false;
            $localStorage.user_id = null;
            //alert("status sesije user_id local storage" + $localStorage.user_id);
            return false;
        }
            else {
            $rootScope.reg_and_login_value = true;
            $rootScope.username = $localStorage.username;
            return true;
            }
    }).error(function(data){
       alert("Došlo je do greške!");
    });
        
        
            
    
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
        data: {user_id: $localStorage.user_id},
        file: file,
      }).progress(function(evt) {
        console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
      }).success(function(data, status, headers, config) {
        // file is uploaded successfully
        console.log(data);
        location.reload();
      });
      //.error(...)
     }
     };
    
    
    $scope.pokreniDodavanjeOglasa = function () {
 $rootScope.prikaziPodmeni = false;
    };
    
    
    
    $scope.sponsored_ads = function () {
        $rootScope.prikaziPodmeni = false;
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
    
   $scope.results = null;  
    if ($rootScope.godina == 0) {
        var url = 'http://localhost:3000/' + $rootScope.odsjek;
        $http.get(url)
    .success(function(data){
        $scope.results = data;
    }).error(function(data){
       alert("Došlo je do greške u učitavanju!");
     
    });
    
    
    }
        else {
        var url = 'http://localhost:3000/' + $rootScope.odsjek + '/' + $rootScope.godina;
          $http.get(url)
    .success(function(data){
        $scope.results = data;
        if (data == null) { $scope.nemaKnjigaUpozorenje = true; }
    }).error(function(data){
       alert("Došlo je do greške u učitavanju!");
     
    });  
        }
        
    };
    
    $scope.latestAds = function() {
        $rootScope.prikaziPodmeni = false;
 
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
          $localStorage.user_id = data.id;
         $rootScope.reg_and_login_value = true;
        $localStorage.username = data.username;
       $rootScope.login_alerts = [
    { login_type: 'success', login_msg: 'Uspješno ste se prijavili!' }
  ];
     window.location.href = "#home";
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
       alert("Došlo je do greške u učitavanju!");
     
    });
     
 };
    
$scope.ucitajOdsjekIGodinu = function (odsjek,godina) {
    $rootScope.odsjek = odsjek;
    $rootScope.godina = godina;
    $rootScope.prikaziPodmeni = true;
};
    
$scope.ucitajGodinu = function (godina) {
   $rootScope.godina = godina;
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
 $rootScope.prikaziPodmeni = true;
$rootScope.slovo = rijec;
    $http.post('http://localhost:3000/search', {"search": $rootScope.slovo })
    .success(function(data){
        $scope.results = data;
        
    }).error(function(data){
        alert(data)});
    
    
};

$scope.DodajRezervacijuNaOglas = function (add, userr, userr_name) {
  $http.post('http://localhost:3000/reservations', { "ad_id": add, "user_id": userr, "user_username": userr_name})
    .success(function(data){
        $scope.results = data;
    }).error(function(data){
        alert(data)});


  alert("Uspješno ste rezervisali knjigu!");
};

$scope.IspisiRezervacije = function (){
//$http.get('http://localhost:3000/reservations'), {"user_name"});
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
    
    $scope.toprated = function () {
        $http.get('http://localhost:3000/toprated')
    .success(function(data){
       
         
        $scope.results=data;
    }).error(function(data){
        
    });
    
    };
    
    $scope.objavi = function(ad) { 
    $http.defaults.headers.post["Content-Type"] = "application/json"; 
    $http.defaults.headers.post["Accept"] = "application/json"; 
    $http.post('http://localhost:3000/ads', { "title": ad.title, "price": ad.price, "description": ad.description, "user_id" : $localStorage.user_id, "section": ad.section, "academic_year": ad.academic_year, "author": ad.author, "forexchange": ad.forexchange }) .success(function(data){
        $rootScope.ad_id = data.id;
        window.location = "#product_detail";
        pokreni();
        $rootScope.new_ad_alerts = [
    { new_ad_type: 'success', new_ad_msg: 'Uspjesno ste objavili oglas!' }
  ];})
.error(function(data){ 
    $rootScope.new_ad_alerts = [
    { new_ad_type: 'danger', new_ad_msg: 'Objava oglasa nije uspjela.' }
  ]; });
    };
    
    $scope.uploadSlikeOglasa= function($files) { 
    $http.defaults.headers.post["Content-Type"] = "image/jpeg";
    $http.defaults.headers.post["Accept"] = "image/jpeg";
    
    //$files: an array of files selected, each file has name, size, and type.
    for (var i = 0; i < $files.length; i++) {
      var file = $files[i];        
      $scope.upload = $upload.upload({
        url: 'http://localhost:3000/ads/' + $localStorage.ad_id + '/upload_photo', 
        data: {ad_id: $localStorage.ad_id},
        file: file,
      }).progress(function(evt) {
        console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
      }).success(function(data, status, headers, config) {
        // file is uploaded successfully
        console.log(data);
        location.reload();
      });
      //.error(...)
     }
     };
    
    
    $scope.pokreniIzmjenuProfila = function () {
         $scope.user =  Korisnici.get({},{'Id': $localStorage.user_id });
        
    };
    
    $scope.pokreniSlanjePorukeKorisniku = function (username) {
    $rootScope.message = username;
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
    //Proizvodi.delete({}, {'Id': 1});
    var url_delete = 'http://localhost:3000/ads/delete/' + id;
    $http.get(url_delete)
    .success(function(data){
        alert("obrisano!");
        //$scope.user =  Korisnici.get({},{'Id': $localStorage.user_id });
        $http.get('http://localhost:3000/myads')
        .success(function(data){
        $scope.results = data;
        }).error(function(data){
        alert("Greška!");
     
    });
    }).error(function(data){
       alert("Doslo je do greške!");
     
    });
    
    };
}]);

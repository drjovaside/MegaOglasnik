angular.module('app', []);

angular.module('app').controller
  ( 'MainCtrl'
  , function($scope,$locale) {
      $scope.currentYear = new Date().getFullYear()
      $scope.currentMonth = new Date().getMonth() + 1
      $scope.months = $locale.DATETIME_FORMATS.MONTH
      $scope.ccinfo = {type:undefined}
      $scope.save = function(data){
        if ($scope.paymentForm.$valid){
          console.log(data) // valid data saving stuff here
        }
      }
    }
  )

angular.module('app').directive
  ( 'creditCardType'
  , function(){
      var directive =
        { require: 'ngModel'
        , link: function(scope, elm, attrs, ctrl){
            ctrl.$parsers.unshift(function(value){
              scope.ccinfo.type =
                (/^5[1-5]/.test(value)) ? "mastercard"
                : (/^4/.test(value)) ? "visa"
                : (/^3[47]/.test(value)) ? 'amex'
                : (/^6011|65|64[4-9]|622(1(2[6-9]|[3-9]\d)|[2-8]\d{2}|9([01]\d|2[0-5]))/.test(value)) ? 'discover'
                : undefined
              ctrl.$setValidity('invalid',!!scope.ccinfo.type)
              return value
            })
          }
        }
      return directive
      }
    )

angular.module('app').directive
  ( 'cardExpiration'
  , function(){
      var directive =
        { require: 'ngModel'
        , link: function(scope, elm, attrs, ctrl){
            scope.$watch('[ccinfo.month,ccinfo.year]',function(value){
              ctrl.$setValidity('invalid',true)
              if ( scope.ccinfo.year == scope.currentYear
                   && scope.ccinfo.month <= scope.currentMonth
                 ) {
                ctrl.$setValidity('invalid',false)
              }
              return value
            },true)
          }
        }
      return directive
      }
    )

angular.module('app').filter
  ( 'range'
  , function() {
      var filter = 
        function(arr, lower, upper) {
          for (var i = lower; i <= upper; i++) arr.push(i)
          return arr
        }
      return filter
    }
  )
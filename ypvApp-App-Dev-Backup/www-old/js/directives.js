angular.module('starter.directives', [])
 .directive('ionToggleText', function () {

  var $ = angular.element;

  return {
    restrict: 'A',
    link: function ($scope, $element, $attrs) {

      // Try to figure out what text values we're going to use

      var textOn = $attrs.ngTrueValue || 'on',
        textOff = $attrs.ngFalseValue || 'off';

      if ($attrs.ionToggleText) {
        var x = $attrs.ionToggleText.split(';');

        if (x.length === 2) {
          textOn = x[0] || textOn;
          textOff = x[1] || textOff;
        }
      }

      // Create the text elements

      var $handleTrue = $('<div class="handle-text handle-text-true">' + textOn + '</div>'),
        $handleFalse = $('<div class="handle-text handle-text-false">' + textOff + '</div>');

      var label = $element.find('label');

      if (label.length) {
        label.addClass('toggle-text');

        // Locate both the track and handle elements

        var $divs = label.find('div'),
          $track, $handle;

        angular.forEach($divs, function (div) {
          var $div = $(div);

          if ($div.hasClass('handle')) {
            $handle = $div;
          } else if ($div.hasClass('track')) {
            $track = $div;
          }
        });

        if ($handle && $track) {

          // Append the text elements

          $handle.append($handleTrue);
          $handle.append($handleFalse);

          // Grab the width of the elements

          var wTrue = $handleTrue[0].offsetWidth,
            wFalse = $handleFalse[0].offsetWidth;

          // Adjust the offset of the left element

          $handleTrue.css('left', '-' + (wTrue + 10) + 'px');

          // Ensure that the track element fits the largest text

          var wTrack = Math.max(wTrue, wFalse);
          $track.css('width', (wTrack + 60) + 'px');
        }
      }
    }
  };

})

.directive('ascii_only', function() {
  return {
    restrict: 'A',
    require: 'ngModel', //to get ngModelController
    link: function(scope, element, attrs, ngModel) {
      function nameValidator(input) {
          var regExp = "/^[\x00-\x7F]*$/";
          var validator = regExp.test(input);
          return validator;
      }
      ngModel.$validators.push(nameValidator); //should pushed to validators to validate
    }
  }
})

.directive('alphaOnly', function() {
  return {
    restrict: 'A',
    require: 'ngModel', //to get ngModelController
    link: function(scope, element, attrs, ngModel) {
      function nameValidator(input) {
          var regExp = "/^[a-zA-Z]$/";
          var validator = regExp.test(input);
          return validator;
      }
      ngModel.$validators.push(nameValidator); //should pushed to validators to validate
    }
  }
})

.directive('phoneInput', function($filter, $browser) {
    return {
        require: 'ngModel',
        link: function($scope, $element, $attrs, ngModelCtrl) {
            var listener = function() {
                var value = $element.val().replace(/[^0-9]/g, '');
                $element.val($filter('tel')(value, false));
            };

            // This runs when we update the text field
            ngModelCtrl.$parsers.push(function(viewValue) {
                return viewValue.replace(/[^0-9]/g, '').slice(0,10);
            });

            // This runs when the model gets updated on the scope directly and keeps our view in sync
            ngModelCtrl.$render = function() {
                $element.val($filter('tel')(ngModelCtrl.$viewValue, false));
            };

            $element.bind('change', listener);
            $element.bind('keydown', function(event) {
                var key = event.keyCode;
                // If the keys include the CTRL, SHIFT, ALT, or META keys, or the arrow keys, do nothing.
                // This lets us support copy and paste too
                if (key == 91 || (15 < key && key < 19) || (37 <= key && key <= 40)){
                    return;
                }
                $browser.defer(listener); // Have to do this or changes don't get picked up properly
            });

            $element.bind('paste cut', function() {
                $browser.defer(listener);
            });
        }

    };
})

.filter('tel', function () {
    return function (tel) {
        console.log(tel);
        if (!tel) { return ''; }

        var value = tel.toString().trim().replace(/^\+/, '');

        if (value.match(/[^0-9]/)) {
            return tel;
        }

        var country, city, number;

        switch (value.length) {
            case 1:
            case 2:
            case 3:
                city = value;
                break;

            default:
                city = value.slice(0, 3);
                number = value.slice(3);
        }

        if(number){
            if(number.length>3){
                number = number.slice(0, 3) + '-' + number.slice(3,7);
            }
            else{
                number = number;
            }

            return ("(" + city + ") " + number).trim();
        }
        else{
            return "(" + city;
        }

    };
})

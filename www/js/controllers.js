angular.module('starter.controllers', ['ngStorage', 'ngCordova'])

/* HIDDEN - Rob's tutorial
// Added in controllers from Rob's tutorial
.controller('LoginCtrl', function($scope, $http, $cordovaOauth, $localStorage, $location) {

    $scope.data = {};

    $scope.login = function() {

        // log in the user through the api.  Please see the example "uitSamplePassportApi" for more information
        $http.post("http://OAUTH_API_IP_OR_DOMAIN/login", { email: $scope.data.email, password: $scope.data.password }).then(function(result) {
            if (result.data.loginstatus == "success") {

                // successful login, in our example, we will just send an alert message
                alert("Congrats, you logged in with user ID "+result.data.userid);

            }
            else {

                // unsuccessful login.  In our example, we are just sending an alert message
                alert(result.data.message);
            }
        }, function(error) {
            alert("There was a problem getting your profile.  Check the logs for details.");
            console.log(error);
        });
    }

    // function to use oAuth to get a token from Facebook.  The token will then be saved in local storage
    // so that it can be re-used
    $scope.facebookLogin = function() {

        // Check local storage first by doing a check on a current access token and expiry
        // If the token isn't expired, redirect to grab Facebook Profile
        if ($localStorage.hasOwnProperty("accessToken") && parseInt($localStorage.expiry) > Math.round(new Date().getTime())) {
            $location.path("/facebookProfile");
        }
        else {

            // use cordovaOauth to connect to facebook and retrieve an access token
            // CLIENT_ID_HERE: This variable requires the App ID of your facebook app which you will use to gather information.
            // Please see http://developers.facebook.com/ for more information on setting up an example app
            $cordovaOauth.facebook("CLIENT_ID_HERE", ["email", "read_stream", "user_website", "user_location", "user_relationships"]).then(function(result) {
                
                // Save the access token and expiry in local storage
                $localStorage.accessToken = result.access_token;
                $localStorage.expiry = Math.round(new Date().getTime()) + parseInt(result.expires_in);

                // Redirect to the facebook profile page (see FacebookProfileCtrl)
                $location.path("/facebookProfile");

            }, function(error) {

                // Just displaying an alert on login issue and logging in console.log
                alert("There was a problem signing in!  See the console for logs");
                console.log(error);
            });
        }
    };
})

.controller('FacebookProfileCtrl', function($scope, $http, $localStorage, $location) {

    // init function called on load of Facebook Profile page
    $scope.init = function() {

        // if the access token is available, grab the user's profile information
        if($localStorage.hasOwnProperty("accessToken") === true) {

            //retrieve profile information
            $http.get("https://graph.facebook.com/v2.2/me", { params: { access_token: $localStorage.accessToken, fields: "id,name,gender,location,website,picture,relationship_status", format: "json" }}).then(function(result) {
                $scope.profileData = result.data;
            }, function(error) {
                alert("There was a problem getting your profile.  Check the logs for details.");
                console.log(error);
            });
        } else {
            alert("Not signed in");
            $location.path("/login");
        }
    };
}) */

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope) {})

.controller('AccountCtrl', function($scope) {});

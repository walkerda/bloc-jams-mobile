//require("./landing");
//require("./collection");
//require("./album");
//require("./profile");

function shuffle(o) {
    for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
};

angular.module('BlocJams', []).controller('Landing.controller', ['$scope', function($scope) {
    $scope.headingText = "Bloc Jams";
    $scope.headingTextClicked = function () {
        shuffle($scope.albumURLs);
    };

    $scope.subText = "Get Down, Get Funky!";
    $scope.subTextClicked = function() {
        $scope.subText += '!';
    };

    $scope.albumURLs = [
        '/images/album-placeholders/album-1.jpg',
        '/images/album-placeholders/album-2.jpg',
        '/images/album-placeholders/album-3.jpg',
        '/images/album-placeholders/album-4.jpg',
        '/images/album-placeholders/album-5.jpg',
        '/images/album-placeholders/album-6.jpg',
        '/images/album-placeholders/album-7.jpg',
        '/images/album-placeholders/album-8.jpg',
        '/images/album-placeholders/album-9.jpg'
    ];
}]);
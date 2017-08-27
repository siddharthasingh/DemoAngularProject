var myApp= angular.module('myApp', []);

myApp.controller('myCtrl', function($scope, $http){
    $scope.books =[];
	$http.get('book.json').then(function(response){
        $scope.books = response.data.book;
        console.log(response);
        var i=0;
        console.log(response.data.book[i].id);
    
    
    });

    
});

myApp.controller('myLogin', function($scope, $http){
    $scope.myLoginFunc = function(userName, password){
	$http.get('user.json').then(function(response){
                     for(var i=0;i < response.data.user.length;i++){
                    if ($scope.userName == response.data.user[i].userName && $scope.password == response.data.user[i].password){
                        console.log("hello " + response.data.user[i].userName);
                        $scope.actionURL = "home.html";
                        location.href = $scope.actionURL;
                    }else{
                        $scope.status = "userName or password is incorrect";
                    }
            }

    });
    };
    
});
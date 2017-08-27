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



       myApp.controller("myAddToCartCtrl", function($scope,$http){
       var id=0;
        var bookname, prize,image;
var books = [];
        $scope.myAddToCart = function(obj){
/*
    $scope.products.push({name:$scope.name, price:$scope.priceProduct});
    $scope.nameProduct = "";
    $scope.priceProduct = "";
 */         var par=obj.target.parentNode;
            var node= par.childNodes;
            quantity = parseInt(node[9].value);
            $http.get('book.json').then(function(response){
            var books = response.data.book;
            console.log(response);
            for(i=0;i<response.data.book.length;i++){
            if(parseInt(obj.target.parentNode.id) == response.data.book[i].id){
            bookname=response.data.book[i].bookname;
            prize=response.data.book[i].prize;
            image=response.data.book[i].img;
            $http.get('cart.json').then(function(cartResponse){
                console.log(cartResponse);
                username= "ankitap";
                var cartUsers= cartResponse.data.cart.user;
                console.log(cartUsers);
                for (var j =0 ; j < cartUsers.length;j++){
                    if(username == cartUsers[j].username){
                        for(var k=0; k< cartUsers[j].books.length;k++){
                            if(parseInt(obj.target.parentNode.id)== cartUsers[j].books[k].id){
                                quantity = quantity + parseInt(cartUsers[j].books[k].quantity);
                                cartUsers[j].books[k].quantity =quantity;
                                cartResponse.data.cart.user =cartUsers;
                                console.log(cartResponse);
                                $http.post('cart.json', cartResponse);

                            }
                        }
                    }
                }
            });
            }
    }
        });
        }
       });
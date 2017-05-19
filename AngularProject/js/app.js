var app = angular.module('myApp', ['ngRoute']);

app.config(function($routeProvider) {
	$routeProvider
		.when('/', {
			redirectTo: '/main/0'
		})
		.when('/main/:id', {
			templateUrl: 'views/main.html',
			controller: 'mainController'
		})
		.when('/readList/:id', {
			templateUrl: 'views/readList.html',
			controller: 'readListController'
		})
		.when('/movieList/:id', {
			templateUrl: 'views/movieList.html',
			controller: 'movieListController'
		})
		.when('/musicList/:id', {
			templateUrl: 'views/musicList.html',
			controller: 'musicListController'
		})
		.when('/readDetail/:id', {
			templateUrl: 'views/readDetail.html',
			controller: 'readDetailController'
		})
		.when('/musicDetail/:id', {
			templateUrl: 'views/musicDetail.html',
			controller: 'musicDetailController'
		})
		.when('/movieDetail/:id', {
			templateUrl: 'views/movieDetail.html',
			controller: 'movieDetailController'
		})
		.when('/login', {
			templateUrl: 'views/login.html',
			controller: 'loginController'
		})
		.when('/userMain', {
			templateUrl: 'views/userMain.html',
			controller: 'userMainController'
		})
		.otherwise('/')
});

app.directive('tableViewCell', function () {
	return {
		templateUrl: 'views/tableViewCell.html',
		scope: {
			item: '=',
			imgPreFix: '='
		},
		link: function (scope, element, attrs) {
			
		}
	}
});


app.run(function ($rootScope) {
	$rootScope.$on('$locationChangeStart', function (event, toState, fromState) {
		$rootScope.leftFromUrl = fromState;
	});
	localStorage.isLogin = 'false';
	if (localStorage.isLogin == 'true'){
		$rootScope.navRightUrl = '#/userMain'
	} else {
		$rootScope.navRightUrl = '#/login';
	}
})

app.controller('myCtrl', function($scope) {
	$scope.aryHref = ["#/main/0", '#/readList/0', '#/musicList/0', '#/movieList/0'];
	$scope.aryImg = ['img/main.png', 'img/read.png', 'img/music.png', 'img/movie.png'];
	$scope.aryImgActive = ['img/main_active.png', 'img/read_active.png', 'img/music_active.png', 'img/movie_active.png'];
	$scope.aryFlag = [true, false, false, false];
	$scope.aryDes = ['首页', '阅读', '音乐', '影视'];
	
	$scope.footerClick = function (index) {
		for (var i=0 ;i<$scope.aryFlag.length; i++){
			$scope.aryFlag[i] = false;
		}
		$scope.aryFlag[index] = true; 
	}
});








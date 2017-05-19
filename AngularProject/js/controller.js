app.controller('mainController', function($scope, $rootScope, $http) {
	$rootScope.navTitle = '首页';
	$scope.imgPreFix = urlPrefix;
	$rootScope.navLeftImg = 'img/search.png';
	$http.get(mainListUrl).success(function(response) {
		$scope.items = response.data;

		var ary = $scope.items;
		for (var i = 0; i < ary.length; i++) {
			var item = ary[i];
			if (item.category == 1) {
				item.redirectTo = '#/readDetail/1';
			} else if (item.category == 4) {
				item.redirectTo = '#/musicDetail/1';
			} else if (item.category == 5) {
				item.redirectTo = '#/movieDetail/1';
			}
		}
	})
});

app.controller('readListController', function($scope, $rootScope, $http) {
	$rootScope.navTitle = '阅读';
	$rootScope.imgPreFix = urlPrefix;
	$rootScope.navLeftImg = 'img/search.png';

	$http.get(readListUrl).success(function(response) {
		$scope.items = response.data;
	});
});
app.controller('movieListController', function($scope, $rootScope, $http) {
	$rootScope.navTitle = '影视';
	$rootScope.imgPreFix = urlPrefix;
	$rootScope.navLeftImg = 'img/search.png';

	$http.get(movieListUrl).success(function(response) {
		$scope.items = response.data;
	});
});

app.controller('musicListController', function($scope, $rootScope, $http) {
	$rootScope.navTitle = '音乐';
	$rootScope.imgPreFix = urlPrefix;
	$rootScope.navLeftImg = 'img/search.png';
	$http.get(musicListUrl).success(function(response) {
		$http.get(musicListUrl).success(function(reponse) {
			$scope.items = response.data;
		})
	})
});

app.controller('readDetailController', function($scope, $rootScope, $http, $sce) {
	$rootScope.navTitle = '阅读详情';
	$rootScope.imgPreFix = urlPrefix;
	$rootScope.navLeftImg = 'img/aliwx_common_back_btn_normal.png';
	$rootScope.navLeftUrl = $rootScope.leftFromUrl;

	$http.get(readDetailUrl).success(function(response) {
		$scope.item = response.data;

		$scope.item.hp_content = $sce.trustAsHtml($scope.item.hp_content.replace(/\n/g, ''));
	})
});

app.controller('musicDetailController', function($scope, $rootScope, $http, $sce) {
	$rootScope.navTitle = '音乐详情';
	$rootScope.navLeftImg = 'img/aliwx_common_back_btn_normal.png';
	$scope.imgPreFix = urlPrefix;
	$rootScope.navLeftUrl = $rootScope.leftFromUrl;
	$http.get(musicDetailUrl).success(function(response) {
		$scope.item = response.data;

		$scope.item.story = $sce.trustAsHtml($scope.item.story.replace(/\n/g, ''));
		$scope.item.media_url = $sce.trustAsResourceUrl($scope.imgPreFix + $scope.item.media_url);
	});
});

app.controller('movieDetailController', function($scope, $rootScope, $http, $sce) {
	$rootScope.navTitle = '影视详情';
	$rootScope.navLeftUrl = $rootScope.leftFromUrl;
	$scope.imgPreFix = urlPrefix;
	$rootScope.navLeftImg = 'img/aliwx_common_back_btn_normal.png';

	$http.get(movieDetailUrl).success(function(response) {
		$scope.item = response.data;
		$scope.item.media_url = $sce.trustAsResourceUrl($scope.imgPreFix + $scope.item.media_url);
	})
});

app.controller('loginController', function($scope, $rootScope, $http, $location) {
	$rootScope.navTitle = '用户登陆';
	$rootScope.navLeftUrl = $rootScope.leftFromUrl;
	$rootScope.navLeftImg = 'img/aliwx_common_back_btn_normal.png';

	$scope.username = 'zz';
	$scope.password = '5555';
	$scope.loginClick = function() {
		var username = $scope.username;
		var password = $scope.password;

		$http.get(loginUrl + '&username=' + username + '&password=' + password).success(function(response) {
			if (response.code == 0) {
				localStorage.username = username;
				localStorage.password = password;
				localStorage.isLogin = 'true';
				$rootScope.navRightUrl = '#/userMain';
				
				$location.url('/userMain');
			} else {
				localStorage.isLogin = 'false';
				$rootScope.navRightUrl = '#/login';
				alert('登陆失败');
			}
		})

	}
});
app.controller('userMainController', function ($scope, $rootScope, $http, $location) {
	$rootScope.navLeftUrl = $rootScope.leftFromUrl;
	$rootScope.navTitle = '用户主页';
	$rootScope.navLeftImg = 'img/aliwx_common_back_btn_normal.png';
	$scope.username = localStorage.username;
	
	$scope.layoutClick = function () {
		$rootScope.navRightUrl = '#/login';
		localStorage.isLogin = 'false';
		$location.url('/');
	}
});
















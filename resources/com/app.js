let ocLoaderIssetLoad = false,
ocComponentLoader = function($ocLazyLoad){
    ocLoaderIssetLoad = true
    return $ocLazyLoad.load(`assets/js/${this}.js`);
}
var app = angular.module('app', ['oc.lazyLoad','ui.router'])
app.service('$serviceTabs',function($http,$sce) {
    return $http.get('api/tabs.json').then(function (response) {
        return response.data.sort((a,b)=>{
            return (a.label < b.label) ? -1 : (a.label > b.label) ? 1 : 0
        }).map(function (tab, i) {
            tab.key = i
            tab.content = $sce.trustAsHtml(tab.content)
            return tab
        })
    })
})
app.component('atLoader',{
    template:'<ng-transclude></ng-transclude>',
    priority: Number.MIN_SAFE_INTEGER,
    transclude:true,
    controller:function($element,$serviceTabs,$scope,$timeout){
        var promises = []
        $timeout(()=>{
            if(ocLoaderIssetLoad === true){
                promises.push(new Promise(function(r,e){
                    $scope.$on('ocLazyLoad.componentLoaded', function() {
                        r()
                    });
                }))
            }
            promises.push($serviceTabs)
            Promise.all(promises).then(function(){
                $element.remove()
            })
        })
    }
})
app.config(['$ocLazyLoadProvider','$urlRouterProvider','$stateProvider',
    function($ocLazyLoadProvider,$urlRouterProvider,$stateProvider) {
        $ocLazyLoadProvider.config({
            events: true
        })
        $urlRouterProvider.otherwise('/')
        $stateProvider.state({
            name: 'tabs-list',
            url: '/',
            template: require('tabs-list.jade')(),
            resolve: {
                tabs: ['$serviceTabs',function (data) {
                    return data;
                }]
            }
        }).state({
            name: 'tabs',
            url: '/tabs',
            template:require('tabs.jade')(),
            resolve:{
                tabs: ['$serviceTabs',function (data) {
                    return data;
                }],
                loadMyService:ocComponentLoader
            }
        })
    }
])

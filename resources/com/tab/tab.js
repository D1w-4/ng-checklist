class atTabController{
    constructor($scope){
        this.$scope = $scope
        this.$onInit = ()=>{
            this.tabsCtrl.addPane(this)
        }
        this.$onDestroy = ()=>{
            this.tabsCtrl.removePane(this)
        }

    }
}

angular.module('app').component('atTab',{
    transclude:true,
    template:require('tab.jade')(),
    controller:atTabController,
    require: {
        tabsCtrl: '^atTabs'
    },
    bindings: {
     label:'@'
    },

})
import Styles from 'tabsList.styl'

angular.module('app').component('atTabsList', {
    template: require('tabsList.jade')(),
    bindings: {
        tabs: '='
    },
})

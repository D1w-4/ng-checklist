import Styles from 'tabs.styl'

class atTabsController {
    constructor() {
        this.tabs = []
    }

    select(tab) {
        this.tabs.forEach((t)=> {
            t.selected = false
        })
        tab.selected = true
    }

    addPane(tab) {
        if (!this.tabs.length){
            this.select(tab)
        }
        this.tabs.push(tab)
    }

    removePane(tab) {
        var index = this.tabs.indexOf(tab)
        if (index !== -1) {
            this.tabs.splice(index,1)
        }
        if(this.tabs.length){
            this.select(this.tabs[0])
        }
    }
}

angular.module('app').component('atTabs', {
        transclude:true,
        template: require('tabs.jade')(),
        controller: atTabsController
    }
)

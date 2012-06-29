var Harmony = Class.create({
    initialize: function(menuId, options) {
        this.menu = $(menuId);
        this.initialState = true;
        this.initOptions(options);
        this.behave();
    },
    initOptions: function(options) {
        this.options = {
            menuClassName: 'dropdown',
            activeClassName:'selected',
            behavior: 'slide'
        };
        Object.extend(this.options, options || { });
    },
    behave: function() {
        this.menu.childElements().each(function(element) {
            element.down('ul').setStyle({
                display: 'none'
            });
            element.down('a').observe('click', function(event) {
                (this.selectedA == Event.element(event)) ? this.initialState = true : Event.stop(event);
                this.colapseLastActive();
                this.selectedA = Event.element(event);
                this.selectedUL = Event.element(event).next('ul');
                this.uncollapseCurrentActive();
                this.initialState = false;
            }.bind(this));
        }.bind(this));
    },
    colapseLastActive: function() {
        if(this.initialState === false) {
            switch(this.options.behaviour) {
                case 'slide':
                default:
                    Effect.SlideUp(this.selectedUL, {
                        duration: 0.5
                    });
                    break;
            }
            this.selectedA.removeClassName(this.options.activeClassName);
        }
    },
    uncollapseCurrentActive: function() {
        switch(this.options.behaviour) {
            case 'slide':
            default:
                Effect.SlideDown(this.selectedUL, {
                    duration: 0.5
                });
                break;
        }
        this.selectedA.addClassName(this.options.activeClassName);
    }
});

/*  
    menuHarmony.js it's a part of js-gui-classes Prototype JavaScript Framework based classes.
    http://github.com/Bombaharris/js-gui-classes
    Rafał Zielonka
    Version 1.0 (2012-06-19)

    Copyright (C) 2012  Rafał Zielonka

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as
    published by the Free Software Foundation, either version 3 of the
    License, or (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/> 
 */
var Harmony = Class.create({
    initialize: function(menuId, options) {
        this.menu = $(menuId);
        this.initOptions(options);
        this.behave();
    },
    initOptions: function(options) {
        this.options = {
            menuClassName: 'dropdown',
            activeClassName:'selected',
            behavior: 'slide',
            behaviorDuration: 0.5
        };
        Object.extend(this.options, options || { });
    },
    behave: function() {
        this.menu.childElements().each(function(element) {
            element.down('ul').setStyle({
                display: 'none'
            });
            element.down('a').observe('click', function(event) {
                Event.stop(event);
                this.selectedA = event.element();
                this.selectedUL = event.element().next('ul');
                this.uncollapseCurrentActive();
            }.bind(this));
        }.bind(this));
    },
    colapseLastActive: function() {
        switch(this.options.behaviour) {
            case 'slide':
            default:
                Effect.SlideUp(this.selectedUL, {
                    duration: 0.5
                });
                break;
        }
        this.selectedA.removeClassName(this.options.activeClassName);
    },
    uncollapseCurrentActive: function() {
        if ( this.selectedA.hasClassName(this.options.activeClassName) ) {
            this.colapseLastActive();
            return;
        }
        switch(this.options.behaviour) {
            case 'slide':
            default:
                Effect.SlideDown(this.selectedUL, {
                    duration: this.options.behaviorDuration
                });
                break;
        }
        this.selectedA.addClassName(this.options.activeClassName);
    }
});

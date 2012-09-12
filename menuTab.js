/*  
    menuTabs.js it's a part of js-gui-classes Prototype JavaScript Framework based classes.
    http://github.com/Bombaharris/js-gui-classes
    Rafał Zielonka
    Varsion 1.0 (2012-06-19)

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
var Tab = Class.create({
    initialize: function(menuId,containerId, options) {
        this.menu = $(menuId);
        this.container = $(containerId);
        this.menuequivalents = this.container.select('div');
        this.menuequivalents.invoke('hide');
        this.selectedA = this.menu.childElements().first().down();
        this.selectedDIV = this.menuequivalents.first();
        this.initOptions(options);
        this.showCurrentActive();
        this.behave();
    },
    initOptions: function(options) {
        this.options = {
            activeClassName:'selected',
            behavior: 'hide'
        };
        Object.extend(this.options, options || { });
    },
    behave: function() {
        this.menu.childElements().each(function(element,index) {
            element.down().observe('click', function(event) {
                event.stop();
                this.hideLastActive();
                this.selectedA = event.element();
                this.selectedDIV = this.menuequivalents[index];
                this.showCurrentActive();
            }.bind(this));
        }.bind(this));
    },
    hideLastActive: function() {
        switch(this.options.behaviour) {
            case 'hide':
            default:
                this.selectedDIV.hide();
                break;
        }
        this.selectedA.removeClassName(this.options.activeClassName);
    },
    showCurrentActive: function() {
        switch(this.options.behaviour) {
            case 'hide':
            default:
                this.selectedDIV.show()
                break;
        }
        this.selectedA.addClassName(this.options.activeClassName);
    }
});
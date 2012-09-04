/*  
    CarouselImg.js it's a part of js-gui-classes Prototype JavaScript Framework based classes.
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
var Carousel = Class.create({
    initialize: function(containerId, options) {
        this.initOptions(options);
        this.containerId = containerId;
        this.navigationId = this.containerId+'Nav';
        this.divId = this.containerId+'Div';
        this.elements = $(this.containerId).select('img');
        $(this.containerId).hide();
        this.container = $(this.options.containerToRenderId);
        this.maxIndex = this.elements.size() - 1;
        this.index = 0;
        this.walk();
    },
    initOptions: function(options) {
        this.options = {
            containerToRenderId: 'carouselAnim',
            menuClassName: 'boxCarouselNav',
            activeClassName:'selected',
            boxClassName:'boxCarousel',
            contentClassName:'boxCarouselContent',
            buttonClassName:'boxCarouselButton',
            bgPosition:'left center',
            behaviour: 'change',
            behaviourDuration: 10
        };
        Object.extend(this.options, options || { });
    },
    renderAll: function() {
        this.fillContent(this.index);
        this.renderBg(this.index);
        this.updateNavigation(this.index);
        (this.index >= this.maxIndex) ? this.index = 0 : this.index++;
    },
    walk: function() {
        this.buildContent();
        this.buildNavigation();
        this.renderAll();
        this.start();
        this.observeNavigation();
    },
    start: function() {
        this.pe = new PeriodicalExecuter(this.renderAll.bind(this),this.options.behaviourDuration);
    },
    stop:function() {
        this.pe.stop();
    },
    renderBg: function(index) {
        switch(this.options.behaviour) {
            case 'fade':
                this.container.fade({
                    duration: 1.0, 
                    from: 0.5, 
                    to: 1
                });
                break;
            case 'change':
            default:
                break;
        }
        this.container.setStyle({
            backgroundImage: "url("+this.elements[index].readAttribute('src')+")",
            backgroundPosition:this.options.bgPosition
        });
    },
    buildContent: function() {
        this.carouselBox = new Element('div',{
            'class':this.options.boxClassName
        });
        this.carouselContent = new Element('div',{
            'class':this.options.contentClassName
        });
        this.carouselBox.insert({
            top:this.carouselContent
        });
        this.container.insert({
            top:this.carouselBox
        });
        this.skitHeader = new Element('h1');
        
        this.skitText = new Element('p');

        this.skitButton = new Element('a',{
            'class':this.options.buttonClassName
        });

        this.carouselContent.insert(this.skitHeader);
        this.carouselContent.insert(this.skitText);
        this.carouselContent.insert(this.skitButton);
        
        this.fillContent(this.index);
    },
    fillContent: function(index) {
        this.skitHeader.update(this.elements[index].readAttribute('alt'));
        this.skitText.update(this.elements[index].readAttribute('data-longdesc'));
        this.skitButton.writeAttribute('href',this.elements[index].readAttribute('data-skit-button-href'));
        this.skitButton.update(this.elements[index].readAttribute('data-skit-button-text'));
    },
    buildNavigation: function() {
        this.carouselNav = new Element('ul',{
            'class':this.options.menuClassName,
            id:this.navigationId
        });
        this.elements.each(function(element) {
            var li = new Element('li');
            var ahref = new Element('a');
            ahref.update(element.readAttribute('alt'));
            li.insert(ahref);
            this.carouselNav.insert(li);
        }.bind(this));
        this.carouselBox.insert({
            bottom:this.carouselNav
        });
    },
    observeNavigation: function() {
        this.carouselNav.childElements().each(function(element,index) {
            element.down('a').observe("click", function() {             
                this.fillContent(index);
                this.renderBg(index);
                this.index = index +1;
                this.carouselNav.childElements().each(function(element) {
                    element.removeClassName(this.options.activeClassName);
                }.bind(this));
                element.addClassName(this.options.activeClassName);
            }.bind(this));
        }.bind(this));
    },
    updateNavigation: function(index) {
        $(this.navigationId).childElements().invoke('removeClassName',this.options.activeClassName)
        $(this.navigationId).childElements()[index].addClassName(this.options.activeClassName);
    }
});
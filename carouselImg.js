/*  
 carouselImg.js it's a part of js-gui-classes Prototype JavaScript Framework based classes.
 http://github.com/Bombaharris/js-gui-classes
 Rafał Zielonka
 Version 1.1 (2013-03-20)
 
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
        this.navigationId = this.containerId + 'Nav';
        this.divId = this.containerId + 'Div';
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
            activeClassName: 'selected',
            boxClassName: 'boxCarousel',
            contentClassName: 'boxCarouselContent',
            buttonClassName: 'boxCarouselButton',
            buttonPauseClassName: 'boxCarouselButtonPause',
            buttonPlayClassName: 'boxCarouselButtonPlay',
            buttonPauseText: 'pause',
            buttonPlayText: 'play',
            buttonNextArrowClassName: 'boxCarouselArrowNext',
            buttonPreviousArrowClassName: 'boxCarouselArrowPrevious',
            bgPosition: 'left center',
            behaviour: 'change',
            behaviourDuration: 10,
            drawSkitHeader: true,
            drawSkitSubHeader: true,
            drawSkitText: true,
            drawSkitButton: true,
            drawPausePlayButton: true,
            drawNav: true,
            drawNavArrows: true,
            navigationTextAttr: 'alt',
            skitHeaderAttr: 'title',
            skitSubHeaderAttr: 'alt',
            skitButtonTextAttr: 'alt'
        };
        Object.extend(this.options, options || {});
    },
    renderAll: function() {
        this.fillContent(this.index);
        this.renderBg(this.index);
        this.updateNavigation(this.index);
        (this.index >= this.maxIndex) ? this.index = 0 : this.index++;
    },
    renderBackAll: function() {
        this.fillContent(this.index);
        this.renderBg(this.index);
        this.updateNavigation(this.index);
        (this.index <= 0) ? this.index = this.maxIndex : this.index--;
    },
    walk: function() {
        this.buildContent();
        this.buildNavigation();
        this.renderAll();
        this.start();
        this.observeNavigation();
    },
    start: function() {
        this.pe = new PeriodicalExecuter(this.renderAll.bind(this), this.options.behaviourDuration);
    },
    stop: function() {
        this.pe.stop();
        this.pauseButton.hide();
        this.playButton.show();
    },
    restart: function() {
        this.pe.registerCallback();
        this.pauseButton.show();
        this.playButton.hide();
    },
    renderBg: function(index) {
        this.index = index;
        this.container.setStyle({
            backgroundImage: "url(" + this.elements[index].readAttribute('src') + ")",
            backgroundPosition: this.options.bgPosition
        });
        switch (this.options.behaviour) {
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
    },
    buildContent: function() {
        this.carouselBox = new Element('div', {
            'class': this.options.boxClassName
        });
        this.carouselContent = new Element('div', {
            'class': this.options.contentClassName
        });
        this.carouselBox.insert({
            top: this.carouselContent
        });
        this.container.insert({
            top: this.carouselBox
        });
        this.skitHeader = new Element('h1');
        this.skitSubHeader = new Element('h2');

        this.skitText = new Element('p');

        this.skitButton = new Element('a', {
            'class': this.options.buttonClassName
        });

        this.pauseButton = new Element('button', {
            'class': this.options.buttonPauseClassName
        }).insert(this.options.buttonPauseText);

        this.playButton = new Element('button', {
            'class': this.options.buttonPlayClassName
        }).insert(this.options.buttonPlayText);

        this.playButton.hide();

        (this.options.drawSkitHeader) && this.carouselContent.insert(this.skitHeader);
        (this.options.drawSkitSubHeader) && this.carouselContent.insert(this.skitSubHeader);
        (this.options.drawSkitText) && this.carouselContent.insert(this.skitText);
        (this.options.drawSkitButton) && this.carouselContent.insert(this.skitButton);

        (this.options.drawPausePlayButton) && this.carouselBox.insert(this.pauseButton);
        (this.options.drawPausePlayButton) && this.carouselBox.insert(this.playButton);

        this.fillContent(this.index);
    },
    fillContent: function(index) {
        this.index = index;
        if (this.options.drawSkitHeader) {
            this.skitHeader.update((Object.isElement(this.elements[index].up('a'))) ? this.elements[index].up('a').readAttribute(this.options.skitHeaderAttr) : this.elements[index].readAttribute(this.options.skitHeaderAttr));
        }
        if (this.options.drawSkitSubHeader) {
            this.skitSubHeader.update(this.elements[index].readAttribute(this.options.skitSubHeaderAttr));
        }
        if (this.options.drawSkitText) {
            (Object.isElement(this.elements[index].up('a').next('figcaption'))) && this.skitText.update(this.elements[index].up('a').next('figcaption').innerHTML);
            (Object.isElement(this.elements[index].next('figcaption'))) && this.skitText.update(this.elements[index].next('figcaption').innerHTML);
        }
        if (this.options.drawSkitButton) {
            (Object.isElement(this.elements[index].up('a'))) && this.skitButton.writeAttribute('href', this.elements[index].up('a').readAttribute('href'));
            this.skitButton.update(this.elements[index].readAttribute(this.options.skitButtonTextAttr));
        }
    },
    buildNavigation: function() {
        this.carouselNav = new Element('ul', {
            'class': this.options.menuClassName,
            id: this.navigationId
        });
        if (this.options.drawNav) {
            this.elements.each(function(element) {
                var li = new Element('li');
                var ahref = new Element('a');
                ahref.update(element.readAttribute(this.options.navigationTextAttr));
                li.insert(ahref);
                this.carouselNav.insert(li);
            }.bind(this));
            if (this.options.drawNav) {
                this.carouselBox.insert({
                    bottom: this.carouselNav
                });
            }
        }

        if (this.options.drawNavArrows) {
            this.arrowNext = new Element('a', {
                'class': this.options.buttonNextArrowClassName
            });
            this.arrowPrevious = new Element('a', {
                'class': this.options.buttonPreviousArrowClassName
            });
            this.carouselBox.insert({
                bottom: this.arrowNext
            });
            this.carouselBox.insert({
                bottom: this.arrowPrevious
            });
        }
    },
    observeNavigation: function() {
        if (this.options.drawNav) {
            this.carouselNav.childElements().each(function(element, index) {
                element.down('a').on('click', function() {
                    this.fillContent(index);
                    this.renderBg(index);
                    this.updateNavigation(index);
                }.bind(this));
            }.bind(this));
        }
        if (this.options.drawNavArrows) {
            this.pauseButton.on('click', function() {
                this.stop();
            }.bind(this));
            this.playButton.on('click', function() {
                this.restart();
            }.bind(this));
            this.arrowNext.on('click', function() {
                this.renderAll();
            }.bind(this));
            this.arrowPrevious.on('click', function() {
                this.renderBackAll();
            }.bind(this));
        }
    },
    updateNavigation: function(index) {
        if (this.options.drawNav) {
            this.index = index;
            $(this.navigationId).childElements().invoke('removeClassName', this.options.activeClassName)
            $(this.navigationId).childElements()[index].addClassName(this.options.activeClassName);
        }
    }
});
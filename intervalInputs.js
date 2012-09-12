/*  
    intervalInputs.js it's a part of js-gui-classes Prototype JavaScript Framework based classes.
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
var IntervalInputs = Class.create({
    initialize: function(cssSelector,options) {
        this.cssSelector = cssSelector 
        this.containers = $$(this.cssSelector);
        this.initOptions(options);
        this.interval();
        this.observeInputs();
    },
    initOptions: function(options) {
        this.options = {
            intervalChar: '-',
            intervalWidth: 1,
            intervalUnit: 'em',
            scaleAttribute: 'maxlength',
            autoFocusChange: true,
            intervalDivClassName: 'intervalDiv'
        };
        Object.extend(this.options, options || { });
    },
    interval: function () {
        this.containers.each(function(container) {
            var inputs = container.select('input');
            inputs.each(function(input) {
                var inputFontSize = ( input.getStyle('font-size').empty() ) ? 18 : parseInt(input.getStyle('font-size'));
                var inputSize = parseInt(input.readAttribute(this.options.scaleAttribute));
                input.setStyle({
                    'width' : parseInt(inputSize * inputFontSize)+""+this.options.intervalUnit,
                    'float': "left"
                });
                if (input != inputs.last()) {
                    input.insert({
                        after: this.buildInterval()
                    }); 
                }
            }.bind(this));
            container.insert({
                after: new Element('input', {
                    'type': 'hidden',
                    'id':inputs.first().name+"-"+inputs.last().name,
                    'name':inputs.first().name+"-"+inputs.last().name
                })
            });  
        }.bind(this));    
    },
    observeInputs: function() {
        $$(this.cssSelector+' ['+this.options.scaleAttribute+']').each(function(input) {
            new Form.Element.Observer(input, 0.1, this.renderGroupInput.bind(this));
            (this.options.autoFocusChange) &&  new Form.Element.Observer(input, 0.1, this.maxLengthFocusChange.bind(this));
            (this.options.autoFocusChange) && input.on("keydown",this.backspaceFocusChange.bind(this));
        }.bind(this));  
    },
    renderGroupInput: function() {
        this.containers.each(function(container) {
            var val = "";
            var inputs = container.select('input');
            inputs.each(function(input) {
                val += $F(input); 
            }.bind(this));
            $(inputs.first().name+"-"+inputs.last().name).value = val;
        }.bind(this));    
    },
    maxLengthFocusChange: function(input) {
        if(input.readAttribute(this.options.scaleAttribute) == $F(input).length) {
            if(Object.isElement(input.next('input'))) {
                input.next('input').focus();
                input.next('input').select();
            }
        }
    },
    backspaceFocusChange: function(event) {
        var input =  event.element();
        if(event.keyCode == Event.KEY_BACKSPACE && $F(input).empty()) {
            if(Object.isElement(input.previous('input'))) {
                input.previous('input').focus();
                input.previous('input').select();
            }
        }
    },
    buildInterval: function() {
        var div_pad = new Element('div');
        div_pad.setStyle({
            'width' : this.options.intervalWidth+""+this.options.intervalUnit,
            'float' : "left",
            'textAlign': "center"
        });
        div_pad.addClassName(this.options.intervalDivClassName);
        div_pad.update(this.options.intervalChar);
        return div_pad;
    }
});
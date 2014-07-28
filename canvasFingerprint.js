/*  
 canvasFingerprint.js it's a part of js-gui-classes Prototype JavaScript Framework based classes.
 http://github.com/Bombaharris/js-gui-classes
 Rafał Zielonka
 Version 1.0 (2014-07-28)
 
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
var canvasFingerprint = Class.create({
    initialize: function() {
        this.initCanvas();
    },
    initCanvas: function() {
        this.canvas = new Element('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.txt = "canvasFingerprint.js";
        this.ctx.textBaseline = "top";
        this.ctx.font = "14px 'Arial'";
        this.ctx.textBaseline = "alphabetic";
        this.ctx.fillStyle = "#f60";
        this.ctx.fillRect(125, 1, 62, 20);
        this.ctx.fillStyle = "#069";
        this.ctx.fillText(this.txt, 2, 15);
        this.ctx.fillStyle = "rgba(102, 204, 0, 0.7)";
        this.ctx.fillText(this.txt, 4, 17);
    },
    bin2hex: function(s) {
        var i, l, o = '',
                n;
        s += '';
        for (i = 0, l = s.length; i < l; i++) {
            n = s.charCodeAt(i)
                    .toString(16);
            o += n.length < 2 ? '0' + n : n;
        }
        return o;
    },
    atob: function(s) {
        if (Object.isFunction(window.atob)) {
            return atob(s);
        } else {
            var padchar = '=';
            var alpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
            var getbyte = function(s, i) {
                var x = s.charCodeAt(i);
                return x;
            };

            var i, b10;
            var x = [];

            // convert to string
            s = '' + s;

            var imax = s.length - s.length % 3;


            if (s.length === 0) {
                return s;
            }
            for (i = 0; i < imax; i += 3) {
                b10 = (getbyte(s, i) << 16) | (getbyte(s, i + 1) << 8) | getbyte(s, i + 2);
                x.push(alpha.charAt(b10 >> 18));
                x.push(alpha.charAt((b10 >> 12) & 0x3F));
                x.push(alpha.charAt((b10 >> 6) & 0x3f));
                x.push(alpha.charAt(b10 & 0x3f));
            }
            switch (s.length - imax) {
                case 1:
                    b10 = getbyte(s, i) << 16;
                    x.push(alpha.charAt(b10 >> 18) + alpha.charAt((b10 >> 12) & 0x3F) +
                            padchar + padchar);
                    break;
                case 2:
                    b10 = (getbyte(s, i) << 16) | (getbyte(s, i + 1) << 8);
                    x.push(alpha.charAt(b10 >> 18) + alpha.charAt((b10 >> 12) & 0x3F) +
                            alpha.charAt((b10 >> 6) & 0x3f) + padchar);
                    break;
            }
            return x.join('');
        }
    },
    getFingerprint: function() {
        this.b64 = this.canvas.toDataURL().replace("data:image/png;base64,", "");
        this.bin = this.atob(this.b64);
        return this.bin2hex(this.bin.slice(-16, -12));
    }
});
/**
 * EidoGo -- Web-based SGF Editor
 * Copyright (c) 2007, Justin Kramer <jkkramer@gmail.com>
 * Code licensed under AGPLv3:
 * http://www.fsf.org/licensing/licenses/agpl-3.0.html
 *
 * General-purpose utility functions. All references to external libraries are
 * in this file. Pretty much any modern JS library could be used (YUI, jQuery,
 * Dojo, Prototype, Mootools).
 */
 
(function() {

var jQuery = window.jQuery.noConflict(true);

eidogo.util = {

    byId: function(id) {
        return jQuery("#" + id)[0];
    },
    
    byClass: function(cls) {
        return jQuery("." + cls);
    },
    
    ajax: function(method, url, params, successFn, failureFn, scope, timeout) {
        scope = scope || window;
        jQuery.ajax({
            type: method.toUpperCase(),
            url: url,
            data: params,
            success: function(text) { successFn.call(scope, {responseText: text}) },
            error: failureFn.bind(scope),
            timeout: timeout
        });
    },
    
    addEvent: function(el, eventType, handler, arg, override) {
        if (override) {
            handler = handler.bind(arg);
        } else if (arg) {
            // use a closure to pass an extra argument
            var oldHandler = handler;
            handler = function(e) {
                oldHandler(e, arg);
            }
        }
        jQuery(el).bind(eventType, {}, handler);
    },
    
    onClick: function(el, handler, scope) {
        eidogo.util.addEvent(el, "click", handler, scope, true);
    },
    
    getElClickXY: function(e, el) {
        // for IE
	    if(!e.pageX) {
            e.pageX = e.clientX + (document.documentElement.scrollLeft ||
                document.body.scrollLeft);
            e.pageY = e.clientY + (document.documentElement.scrollTop ||
                document.body.scrollTop);
        }
        if (!el._x) {
            var elXY = eidogo.util.getElXY(el),
                elX = elXY[0], elY = elXY[1];
            el._x = elX;
            el._y = elY;
        } else {
            var elX = el._x;
            var elY = el._y;
        }
		return [e.pageX - elX, e.pageY - elY];
    },
    
    stopEvent: function(e) {
        if (e.stopPropagation) {
            e.stopPropagation();
        } else {
            e.cancelBubble = true;
        }
        if (e.preventDefault) {
            e.preventDefault();
        } else {
            e.returnValue = false;
        }
    },
    
    getTarget: function(ev) {
        var t = ev.target || ev.srcElement;
        return (t && t.nodeName && t.nodeName.toUpperCase() == "#TEXT") ?
            t.parentNode : t;
    },
    
    addClass: function(el, cls) {
        jQuery(el).addClass(cls);
    },
    
    removeClass: function(el, cls) {
        jQuery(el).removeClass(cls);
    },
    
    show: function(el, display) {
        display = display || "block";
        if (typeof el == "string") {
            el = eidogo.util.byId(el);
        }
        if (!el) return;
        el.style.display = display;
    },
    
    hide: function(el) {
        if (typeof el == "string") {
            el = eidogo.util.byId(el);
        }
        if (!el) return;
        el.style.display = "none";
    },
    
    getStyle: function(el, prop) {
        return jQuery(el).css(prop);
    },
    
    getElXY: function(el) {
        if (el._x && el._y) return [el._x, el._y];
        var node = el, elX = 0, elY = 0;
        while (node) {
            elX += node.offsetLeft;
            elY += node.offsetTop;
            node = node.offsetParent ? node.offsetParent : null;
        }
        el._x = elX;
        el._y = elY;
        return [elX, elY];
    },
    
    getElX: function(el) {
        return this.getElXY(el)[0];
    },
    
    getElY: function(el) {
        return this.getElXY(el)[1];
    },
    
    addStyleSheet: function(href) {
        if (document.createStyleSheet) {
            document.createStyleSheet(href);
        } else {
            var link = document.createElement('link');
            link.rel = 'stylesheet';
            link.type = 'text/css';
            link.href = href;
            document.getElementsByTagName("head")[0].appendChild(link);
        }
    },
    
    getPlayerPath: function() {
        var scripts = document.getElementsByTagName('script');
        var scriptPath;
        [].forEach.call(scripts, function(script) {
            if (/(all\.compressed\.js|eidogo\.js)/.test(script.src)) {
                scriptPath = script.src.replace(/\/js\/[^\/]+$/, "");
            }
        });
        return scriptPath;
    }
    
};

})();
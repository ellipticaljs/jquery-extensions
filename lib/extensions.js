//umd pattern

(function (root, factory) {
    if (typeof module !== 'undefined' && module.exports) {
        //commonjs
        module.exports = factory();
    } else if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define([], factory);
    } else {
        // Browser globals (root is window)
        root.returnExports = factory();
    }
}(this, function () {

    /* String/Number prototypes  */
    String.prototype.toCamelCase=function(){
        return this.replace(/[-_]([a-z])/g, function (g) { return g[1].toUpperCase(); });
    };
    String.prototype.toTitleCase=function(){
        return this.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
    };
    String.prototype.toPixel = function(){
        var val=parseInt(this,10);
        val = val.toString() + 'px';
        return val;
    };
    String.prototype.toArrayFromCamelCase = function(){
        return this.match(/[A-Z]?[a-z]+/g);
    };
    String.prototype.toFloatPixel = function(){
        return this.toString() + 'px';
    };
    String.prototype.toInteger=function(){
        return parseInt(this.replace('px',''),10);
    };
    String.prototype.toMillisecond = function(){
        var val=parseInt(this,10);
        val = val.toString() + 'ms';
        return val;
    };
    String.prototype.toNode=function(){
        var parsed=$.parseHTML(this);
        if(parsed[0]){
            return parsed[0]
        }else{
            return null;
        }
    };
    Number.prototype.toPixel = function(){
        var val=parseInt(this,10);
        val = val.toString() + 'px';
        return val;
    };
    Number.prototype.toFloatPixel = function(){
        return this.toString() + 'px';
    };
    Number.prototype.toMillisecond = function(){
        var val=parseInt(this,10);
        val = val.toString() + 'ms';
        return val;
    };




    /**
     * replaces an element's class based on a wildcard pattern
     * @param removals {String}
     * @param additions {String}
     * @returns {Object}
     * @public
     *
     * ex: average rating
     *     $span.alterClass('icon-star-*', 'icon-star-3');
     *     $span.icon-star-2 => $span.icon-star-3
     */
    $.fn.alterClass = function ( removals, additions ) {

        var self = this;

        if ( removals.indexOf( '*' ) === -1 ) {
            // Use native jQuery methods if there is no wildcard matching
            self.removeClass( removals );
            return !additions ? self : self.addClass( additions );
        }

        var patt = new RegExp( '\\s' +
            removals.
            replace( /\*/g, '[A-Za-z0-9-_]+' ).
            split( ' ' ).
            join( '\\s|\\s' ) +
            '\\s', 'g' );

        self.each( function ( i, it ) {
            var cn = ' ' + it.className + ' ';
            while ( patt.test( cn ) ) {
                cn = cn.replace( patt, ' ' );
            }
            it.className = $.trim( cn );
        });

        return !additions ? self : self.addClass( additions );
    };

    /**
     * extends jQuery 'find' to additionally filter the jQuery object against the selector
     * example uses: querying mutation records
     * @param selector {String}
     * @returns {Object}
     * @public
     */
    $.fn.selfFind = function(selector) {
        return this.find(selector).add(this.filter(selector))
    };

    /**
     * clear select list
     * @param opts
     * @returns {$.fn}
     */
    $.fn.clearSelect=function(opts){
        (typeof opts.defaultOption ==='undefined') ? this.children.remove() : this.children('option:not(:first)').remove();
        return this;

    };

    $.fn.findTextNodes=function(){
        return this.contents().filter(function(){return this.nodeType===3});
    };

    $.fn.findTextNodeDescendants=function(){
        return this.find('*').contents().filter(function(){return this.nodeType===3});
    };

    //no chaining
    $.fn.isVisible=function(){
        var _isVisible=this.is(':visible');
        var visibility=this.css( 'visibility');
        return(_isVisible && visibility==='visible');
    };

    //no chaining
    $.fn.query=function(selector,callback) {
        var self = this;
        var count = 0;
        var result = this.find(selector);
        if (result[0]) {
            callback(result);
        }
        var timeOutId = setInterval(function () {
            result = self.find(selector);
            if (result[0] || (count > 4)) {
                clearInterval(timeOutId);
                callback(result);
            } else count++;
        }, 500);
    };

    $.fn.detachClass=function(klass){
        return this.each(function(){
            if($(this).length===1){
                $(this).removeClass(klass);
            }else if($(this).length>1){
                $.each($(this),function(index,node){
                    $(node).removeClass(klass);
                });
            }
        });

    };

    //no chaining
    $.fn.removeAnimation=function(interval,f){
        var element=this;
        var g=function(){ element.removeClass('hide-important')};
        setTimeout(function(){
            element.addClass('hide-important');
            f();
            setTimeout(g,100);
        },interval);
    };

    //no chaining
    $.fn.timeout=function(interval,f){
        setTimeout(function(){
            f();
        },interval);
    };

    /**
     *  returns first matched children in an iterative children query as "children"
     * @param selector
     * @returns {*|jQuery|HTMLElement}
     */
    $.fn.closestChildren=function(selector){
        if (!selector || selector === '') {
            return $();
        }
        var result=$();
        this.each(function() {
            var $this = $(this);
            var queue = [];
            queue.push($this);
            while (queue.length > 0) {
                var node = queue.shift();
                var children = node.children();
                for (var i = 0; i < children.length; ++i) {
                    var $child = $(children[i]);
                    if ($child.is(selector)) {
                        result=children;
                        return false;
                    } else {
                        queue.push($child);
                    }
                }
            }
        });
        var elements = [];
        $.each(result, function (index, element) {
            if ($(element).is(selector)) {
                elements.push(element);
            }
        });
        return $(elements);
    };

    //no chaining
    $.fn.hasAttr=function(attr){
        return this[0].hasAttribute(attr);
    };

    return $;

}));

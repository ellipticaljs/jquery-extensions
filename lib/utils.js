
/*
 * =============================================================
 * jQuery.utils
 * =============================================================
 *
 *
 *
 * Dependencies:
 * jQuery 2.0+
 *
 *
 */

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
    var utils={};

    utils.datetime={
        isDate: function(obj){
            return (/Date/).test(Object.prototype.toString.call(obj)) && !isNaN(obj.getTime());
        },

        isLeapYear: function(year){
            return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;
        },

        getDaysInMonth: function(year, month){
            return [31, this.isLeapYear(year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
        },

        setToStartOfDay: function(date){
            if (this.isDate(date)) date.setHours(0,0,0,0);
        },

        compareDates: function(a,b){
            // weak date comparison (use setToStartOfDay(date) to ensure correct result)
            return a.getTime() === b.getTime();
        },

        /**
         *
         * @returns {string}
         */
        currentDate: function () {
            var currentDate = new Date();
            var day = currentDate.getDate();
            var month = currentDate.getMonth() + 1;
            var year = currentDate.getFullYear();
            return (month + '/' + day + '/' + year);
        }
    };

    utils.array={
        isArray: function(obj){
            return (/Array/).test(Object.prototype.toString.call(obj));
        },

        toStringFromArray:function(arr,index){
            var length=arr.length;
            var s='';
            for (var i=0;i<length;i++){
                if(index !==undefined){
                    if(i!==index){
                        s+=arr[i];

                    }
                }else{
                    s+=arr[i];
                }
            }
            return s;
        },

        toNamespaceFromArray:function(arr){
            var length=arr.length;
            var maxIndex=length-1;
            var s='';
            for (var i=0;i<length;i++){
                s+=arr[i].toString();
                if(i!==maxIndex){
                    s+='.';
                }
            }

            return s.toLowerCase();
        }
    };

    utils.string={
        dashToCamelCase:function(s){
            return s.replace(/-([a-z])/g, function (g) { return g[1].toUpperCase(); });
        },

        random:function(){
            return Math.floor((Math.random()*100000)+1).toString();
        },

        camelCaseToArray: function(s){
            return s.match(/[A-Z]?[a-z]+/g);
        },

        tagNameToNamespace:function(s){
            s= s.replace(/-/g,'.');
            return s.toLowerCase();
        }
    };

    utils.color={
        rgb2hex: function(rgb){
            if (  rgb.search("rgb") == -1 ) {
                return rgb;
            }
            else if ( rgb == 'rgba(0, 0, 0, 0)' ) {
                return 'transparent';
            }
            else {
                rgb = rgb.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+))?\)$/);
                function hex(x) {
                    return ("0" + parseInt(x).toString(16)).slice(-2);
                }
                return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
            }
        }
    };

    utils.url={
        /**
         *
         * @param ji {String}
         * @returns {String}
         */
        queryString: function (ji) {
            var hu = window.location.search.substring(1);
            var gy = hu.split("&");
            for (i = 0; i < gy.length; i++) {
                var ft = gy[i].split("=");
                if (ft[0] == ji) {
                    return ft[1];
                }
            }
            return null;
        },

        /**
         *
         * @returns {Array}
         */
        queryStringObjectArray: function () {
            var arr = [];
            var hu = window.location.search.substring(1);
            var gy = hu.split("&");
            for (i = 0; i < gy.length; i++) {
                var ft = gy[i].split("=");
                if (ft[0] == ji) {
                    return ft[1];
                }
                var obj = {};
                obj.prop = ft[0];
                obj.val = ft[1];
                arr.push(obj);
            }

            return arr;
        },

        /**
         *
         * @returns {Array}
         */
        queryStringFilterArray: function () {
            var arr = [];
            var hu = window.location.search.substring(1);
            var gy = hu.split("&");
            for (i = 0; i < gy.length; i++) {
                var ft = gy[i].split("=");
                var obj = {};
                obj.filter = ft[0];
                obj.val = ft[1];
                if (obj.filter != '') {
                    arr.push(obj);
                }

            }

            return arr;
        }
    };

    utils.image={
        /**
         *
         * @param img {Object}
         * @param data {Object}
         * @returns {Object}
         */
        aspectRatio: function (img, data) {
            var width = img.width();
            var height = img.height();
            var aRatio = height / width;
            data.aspectRatio = aRatio;
            if (typeof data.height != 'undefined') {
                data.width = parseInt((1 / aRatio) * data.height);
            } else if (typeof data.width != 'undefined') {
                data.height = parseInt(aRatio * data.width);
            }

            return data;
        }
    };


    $.utils = $.utils || {};
    $.extend($.utils, utils);

    return $;


}));

/*
 * =============================================================
 * jQuery.support
 * =============================================================
 *
 * almost all tests adopted from Modernizr
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
	var support = {};
	
	$.support = $.support || {};
	$.extend($.support, support);

	return $;

}));

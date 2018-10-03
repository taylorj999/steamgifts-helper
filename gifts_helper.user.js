// ==UserScript==
// @name        Steamgifts Page Cleanup
// @namespace   steamgiftsHelper
// @include     https://steamgifts.com/*
// @include     https://*.steamgifts.com/*
// @version     1
// @run-at      document-end
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @grant       GM_info
// @description This is a userscript to modify the steamgifts.com html to hide any giveaways the user is not eligible to enter.
// @description Because this userscript must modify the DOM, it makes use of some jquery inclusion code created by Brock Adams
// @description at https://stackoverflow.com/questions/2246901/how-can-i-use-jquery-in-greasemonkey-scripts-in-google-chrome
// @description in order to make sure we have access to jquery.
// ==/UserScript==

function GM_main ($) {
    let rows = $(".giveaway__row-outer-wrap");
	for (let index = 0; index < rows.length; index++) {
		var childs = $(rows[index]).find(".giveaway__column--contributor-level--negative");
		if (childs.length > 0) {
			$(rows[index]).remove();
		} else {
			childs = $(rows[index]).find(".is-faded");
			if (childs.length > 0) {
				$(rows[index]).remove();
			}
		}
	}
}

if (typeof jQuery === "function") {
    console.log ("Running with local copy of jQuery!");
    GM_main (jQuery);
}
else {
    console.log ("fetching jQuery from some 3rd-party server.");
    add_jQuery (GM_main, "1.7.2");
}

function add_jQuery (callbackFn, jqVersion) {
    var myJqVersion   = jqVersion || "1.7.2";
    var D           = document;
    var targ        = D.getElementsByTagName ('head')[0] || D.body || D.documentElement;
    var scriptNode  = D.createElement ('script');
    scriptNode.src  = 'http://ajax.googleapis.com/ajax/libs/jquery/'
                    + myJqVersion
                    + '/jquery.min.js'
                    ;
    scriptNode.addEventListener ("load", function () {
        var scriptNode          = D.createElement ("script");
        scriptNode.textContent  =
            'var gm_jQuery  = jQuery.noConflict (true);\n'
            + '(' + callbackFn.toString () + ')(gm_jQuery);'
        ;
        targ.appendChild (scriptNode);
    }, false);
    targ.appendChild (scriptNode);
}



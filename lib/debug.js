/* Simple event loop javascript debug library a la Linux kernel style.
 *
 * In order to use this libary all you need to do is create some
 * css entries for your sections, example:
 *
 * #js_emerg
 * {
 * 	color: red;
 *	background-color: black;
 *	layer-background-color: black;
 *	visibility:hidden;
 * }
 *
 * Then on before you start pegging your JS code add some all the
 * div entries. Example:
 *
 * <div id="js_emerg"></div>
 * <div id="js_alert">Alert:&nbsp;</div>
 * <div id="js_crit"></div>
 * <div id="js_err"></div>
 * <div id="js_warning"></div>
 * <div id="js_notice">Gestures:&nbsp;</div>
 * <div id="js_info"></div>
 * <div id="js_debug">Debug:&nbsp;</div>
 */
var JS_EMERG	= 0; /* system is unusable */
var JS_ALERT	= 1; /* action must be taken immediately */
var JS_CRIT	= 2; /* critical conditions */
var JS_ERR	= 3; /* error conditions */
var JS_WARNING	= 4; /* warning conditions */
var JS_NOTICE	= 5; /* normal but significant condition */
var JS_INFO	= 6; /* informational */
var JS_DEBUG	= 7; /* debug-level messages */

function pr_label(js_level) {
	switch (js_level) {
	case JS_EMERG:
		return "js_emerg";
	case JS_ALERT:
		return "js_alert";
	case JS_CRIT:
		return "js_crit";
	case JS_ERR:
		return "js_err";
	case JS_WARNING:
		return "js_warning";
	case JS_NOTICE:
		return "js_notice";
	case JS_INFO:
		return "js_info";
	case JS_DEBUG:
		return "js_debug";
	default:
		return "js_notice";
	}
}

function pr_msg(js_level, str) {
	document.getElementById(pr_label(js_level)).style.visibility = "visible";
	document.getElementById(pr_label(js_level)).innerHTML = str;
}

function pr_emerg(str) {
	pr_msg(JS_EMERG, str);
}

function pr_alert(str) {
	pr_msg(JS_ALERT, str);
}

function pr_crit(str) {
	pr_msg(JS_CRIT, str);
}

function pr_err(str) {
	pr_msg(JS_ERR, str);
}

function pr_warning(str) {
	pr_msg(JS_WARNING, str);
}

function pr_notice(str) {
	pr_msg(JS_NOTICE, str);
}

function pr_info(str) {
	pr_msg(JS_INFO, str);
}

function pr_debug(str) {
	pr_msg(JS_DEBUG, str);
}

function pr_disable_level(js_level) {
	document.getElementById(pr_label(js_level)).style.visibility = "hidden";
}

function pr_disable(str) {
	var i = 0;
	for (i=0; i < JS_DEBUG; i++)
		pr_disable_level(i);
}

function pr_enable_level(js_level) {
	document.getElementById(pr_label(js_level)).style.visibility = "visible";
}

function pr_enable() {
	pr_enable_level(JS_ALERT);
	pr_enable_level(JS_NOTICE);
	pr_enable_level(JS_DEBUG);
}

/* TODO: 
	place this content into livemap.js, 
	delete <script src=clock.s> from layout.html 
*/

var nullen = function(i) {
	return (i < 10) ? i = '0' + i : i;
};

var getOffset = function(d) {
	/* summertime for germany, 2011 */
	if ((d.getUTCMonth() >= 3 && d.getUTCDay() >= 27) && 
		(d.getUTCMonth() <= 10 && d.getUTCDay() <= 30))
	    return 2;
	else 
	    return 1;
}

$(document).ready(function(){
	window.setInterval(function() {		
		var d = new Date();
		var offset = getOffset(d);

		var hrs = nullen((d.getUTCHours() + offset) % 24);
		var mins = nullen(d.getUTCMinutes());
		var secs = nullen(d.getUTCSeconds());

		$("#clock").html(hrs + ':' + mins + ':' + secs);
	}, 1000);


	/* is it a service free period= */
	var d = new Date();
	var offset = getOffset(d);
	if (
		(((d.getUTCHours() + offset) % 24) > 23 && d.getUTCMinutes() > 30) || 
		(((d.getUTCHours() + offset) % 24)) < 6)
		$("#warning").show();
	
});
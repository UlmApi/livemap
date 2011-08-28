/* TODO: 
	place this content into livemap.js, 
	delete <script src=clock.s> from layout.html 
*/
$(document).ready(function(){
	window.setInterval(function() {
		var d = new Date();
		/* summertime for germany, 2011 */
		if ((d.getUTCMonth() >= 3 && d.getUTCDay() >= 27) && 
			(d.getUTCMonth() <= 10 && d.getUTCDay() <= 30))
		    offset = 2;
		else 
		    offset = 1;

		var hrs = (d.getUTCHours() + 2) % 24;
		var mins = d.getUTCMinutes();

		var secs = d.getUTCSeconds();
		secs = (secs < 10) ? secs = '0' + secs : secs;

		$("#clock").html(hrs + ':' + mins + ':' + secs);
	}, 1000);
});
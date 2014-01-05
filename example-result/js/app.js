/**
 * Describe dependencies
 * @depends {jquery-2.0.3.min}
 */

(function( $ ) {

	$(document).ready(function() {
		var $div = $('<div>');
		$div.css({
			height: 400,
			background: '#eee'
		});
		$div.click(function() {
			$div.hide();
		});

		$('body').html($div);
	});

})( jQuery )
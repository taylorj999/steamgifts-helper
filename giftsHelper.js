$(document).ready(function() {
	var rows = $(".giveaway__row-outer-wrap");
	for (index = 0; index < rows.length; index++) {
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
});



function f(element) { return document.getElementById(element) } // Wrapper for document.getElementById

function calculateMoney() {
	var item = {
		"monument":   f("monumentCost").valueAsNumber,
		"marker":     f("markerCost").valueAsNumber,
		"vase":       f("vaseCost").valueAsNumber,
		"lettering":  f("letteringCost").valueAsNumber,
		"foundation": f("foundationCost").valueAsNumber,
		"subtotal":   f("subtotal").valueAsNumber,
		"tax":        f("tax").valueAsNumber,
		"setting":    f("settingCost").valueAsNumber,
		"fees":       f("fees").valueAsNumber,
		"total":      f("totalCost").valueAsNumber,
		"paid":       f("amountPaid").valueAsNumber,
		"due":        f("balanceDue").valueAsNumber,
		"v": {
			"subtotal":   f("subtotal").value,
			"tax":        f("tax").value,
			"total":      f("totalCost").value,
			"due":        f("balanceDue").value
		}
	}

	function subtotal() { return item.monument + item.marker + item.vase + item.lettering + item.foundation }
	function tax()      { return subtotal() * 0.08517 }
	function fees()     { return item.fees }
	function setting()  { return item.setting }
	function total()    { return tax() + setting() + fees() }
	function paid()     { return item.paid }
	function balance()  { return total() - paid() }

	item.v.subtotal = subtotal()
	item.v.tax      = tax()
	item.v.total    = total()
	item.v.balance  = balance()
}

var file = {
	'load'   : function (filename) { return $.getJSON(filename) },
	'save'   : function () {},
	'parse'  : function (data) { return $.parseJSON(data.responseText) },
	'string' : function (data) { return JSON.stringify(data) },
	'pickOrder' : function() {}
}

var orders, x;

document.body.onload = function() {
	// load orders.json
	x = file.load("orders.json")
	//orders = $.parseJSON(x.responseText);
	// put orders into localstorage/indexedDB
	// pick order from list
	file.pickOrder();
	// begin calculating money
	calculateMoney();
}

var order, money;
function f(element) { return document.getElementById(element); } // Wrapper for document.getElementById

function calculateMoney() {
	"use strict";

	money = {
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
	};

	function subtotal(){ return money.monument + money.marker + money.vase + money.lettering + money.foundation; }
	function tax()     { return subtotal() * 0.08517; }
	function fees()    { return money.fees; }
	function setting() { return money.setting; }
	function total()   { return subtotal() + tax() + setting() + fees(); }
	function paid()    { return money.paid; }
	function balance() { return total() - paid(); }

	money.v.subtotal = subtotal();
	money.v.tax      = tax();
	money.v.total    = total();
	money.v.balance  = balance();
}

var file = {
	'name'   : "",
	'init'   : function () {
		"use strict";
		//file.load( file.set(file.name) );
		calculateMoney();
		//file.get();
	},
	'order'  : {
		'get' : {
			'details'   : function () {
				f('order-date').value = order.details.date;
				f('info-rep').value   = order.details.by;
			},
			'title'      : function () {
				f('order-title').value = order.title.full;
			},
			'materials' : function () {
				var rows = 3;
				var qdata = {};
				qdata.qty = [];
				for (var i = 1; i <= rows; i++) {
					//qdata.qty = qdata.qty.push('qty-piece-' + i);
				}
				f('material-piece');
				f('type-piece');
				f('length-piece');
				f('width-piece');
				f('height-piece');
				f('notes-piece');
				//var foundation = order.materials.foundation

				function getPiece(i) {}
				function getFoundation() {}
			},
			'design'    : function () {},
			'setting'   : function () {},
			'signature' : function () {},
			'status'    : function () {}
		},
		'set' : {
			'details'   : function () {
				order.details.date = f('order-date').value;
				order.details.by   = f('info-rep').value;
			},
			'title'      : function () {
				var orderName = f('order-title');
				var localName = {
					'first': order.title.first,
					'middle': order.title.middle,
					'last': order.title.last,
					'full': order.title.full,
					'sort': order.title.sort
				};
				order.name.full = f('order-name').value;
			},
			'materials' : function () {
				f('qty-foundation');
				f('material-foundation');
				f('type-foundation');
				f('length-foundation');
				f('width-foundation');
				f('height-foundation');
				f('notes-foundation');
				var foundation = order.materials.foundation;

				function setPiece(i) {}
				function setFoundation() {
					if (f('type-foundation').value === 'deep')
						foundation.deep = true;
					else if (f('type-foundation').value === 'pad')
						foundation.deep = false;

					foundation.pad    = f('material-foundation').value;
					foundation.length = f('length-foundation').value;
					foundation.width  = f('width-foundation').value;
					foundation.height = f('height-foundation').value;
					foundation.notes  = f('notes-foundation').value;
				}
			},
			'design'    : function () {},
			'setting'   : function () {},
			'signature' : function () {},
			'status'    : function () {}
		}
	},
	'save'   : function (data) { return "../data/" + data + ".json"; },
	'load'   : function (data) { $.getJSON(data, function(obj) { order = obj; }); },
	'parsed' : function () { $.parseJSON(order, function(obj) { order.bits.parsed = data; }); },
	'string' : function () { data = JSON.stringify(order); },//; var string = data; order.bits.string = string; },

	'get'    : function () {
		file.order.load.details();
		file.order.load.title();
	},
	'set'    : function () {
		file.string();
		file.order.set.details();
		file.order.set.title();
		localStorage.setItem(order.title.sort, order.stringy);
	}
};

document.body.onload = file.init;
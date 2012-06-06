var order={}, file, qdata;

steal('jquery', function(){})

function f(element) { return document.getElementById(element); }

function calc() {
	"use strict";
	var money, subtotal, taxRate, tax, setting, fees, total, paid, balance;
	money = [ f('money-monument'), f('money-marker'), f('money-vase'), f('money-lettering'), f('money-foundation'), f('money-subtotal'), f('money-tax'), f('money-installation'), f('money-fees'), f('money-total'), f('money-paid'), f('money-balance') ];

	subtotal = money[0].valueAsNumber + money[1].valueAsNumber + money[2].valueAsNumber + money[3].valueAsNumber + money[4].valueAsNumber;

	taxRate = 0.08517;            // The local tax rate.
	tax     = subtotal * taxRate;   // The amount of tax.
	setting = money[7].valueAsNumber; // The setting fees.
	fees    = money[8].valueAsNumber;   // Any other fees.
	total   = tax + subtotal + setting + fees;  // Add these together...
	paid    = money[10].valueAsNumber;          // ...mix in the amount paid...
	balance = total - paid;                     // ...and return the balance.

	money[5].value  = subtotal;
	money[6].value  = tax;
	money[9].value  = total;
	money[11].value = balance;

	// Set the onchange attribute to call calc for each money cell that is editable.
	for (var i = 0; i < money.length; i++)
		if( money[i].readOnly === false ) money[i].onchange = calc;
}

var file = {
	'name'   : "hawk_victoria_m",
	'init'   : function () {
		"use strict";
		file.load( file.set(file.name) )
		calc();
		file.get();
	},
	'order'  : {
		'get' : {
			'details'   : function () {
				f('order-date').value = order.details.date;
				f('info-rep').value   = order.details.by;
			},
			'name'      : function () {
				f('order-name').value = order.name.full;
			},
			'materials' : function () {
				var rows = 3;
				qdata = {};
				qdata.qty = [];
				for (var i = 1; i <= rows; i++) {
					//qdata.qty = qdata.qty.push('qty-piece-' + i);
				};
				f('material-piece')
				f('type-piece')
				f('length-piece')
				f('width-piece')
				f('height-piece')
				f('notes-piece')
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
				order.details.date = f('order-date').value
				order.details.by   = f('info-rep').value 
			},
			'name'      : function () {
				var orderName = f('order-name');
				var localName = {
					'first': order.name.first,
					'middle': order.name.middle,
					'last': order.name.last,
					'full': order.name.full,
					'sort': order.name.sort
				}
				order.name.full = f('order-name').value
			},
			'materials' : function () {
				f('qty-foundation')
				f('material-foundation')
				f('type-foundation')
				f('length-foundation')
				f('width-foundation')
				f('height-foundation')
				f('notes-foundation')
				var foundation = order.materials.foundation

				function setPiece(i) {}
				function setFoundation() {
					if (f('type-foundation').value === 'deep')
						foundation.deep = true;
					else if (f('type-foundation').value === 'pad')
						foundation.deep = false

					foundation.pad    = f('material-foundation').value
					foundation.length = f('length-foundation').value
					foundation.width  = f('width-foundation').value
					foundation.height = f('height-foundation').value
					foundation.notes  = f('notes-foundation').value
				}
			},
			'design'    : function () {},
			'setting'   : function () {},
			'signature' : function () {},
			'status'    : function () {}
		}
	},
	'save'   : function (data) { return "../data/" + data + ".json" },
	'load'   : function (data) { $.getJSON(data, function(obj) { order = obj }) },
	'parsed' : function () { $.parseJSON(order, function(obj) { order.bits.parsed = data; }) },
	'string' : function () { data = JSON.stringify(order) },//; var string = data; order.bits.string = string; },

	'get'    : function () {
		file.order.load.details();
		file.order.load.name();
	},
	'set'    : function () {
		file.string();
		file.order.set.details();
		file.order.set.name();
		localStorage.setItem(order.name.sort, order.stringy);
	}
}

document.body.onload = file.init;

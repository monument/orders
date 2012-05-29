function orderFile(what, part) {
	function details(what) {
		if (what === 'load') {
			$('#order-date')[0].value = order.details.date;
			$('#info-rep')[0].value   = order.details.by;
		} else if (what === 'save') {
			order.details.date = $('#order-date')[0].value
			order.details.by   = $('#info-rep')[0].value 
			order.details
		}
	}
	function name() {
		if (what === 'load') {
			$('#order-name')[0].value = order.name.full;
		} else if (what === 'save') {
			var orderName = $('#order-name')[0];
			var localName = {
				'first': order.name.first,
				'middle': order.name.middle,
				'last': order.name.last,
				'full': order.name.full,
				'sort': order.name.sort
			}

			// if( type === 'sort' )
			// 	order.name.sort = localName.sort

			order.name.full    = $('#order-name')[0].value
		}
	}
	function materials() {
		$('#qty-foundation')[0]
		$('#material-foundation')[0]
		$('#type-foundation')[0]
		$('#length-foundation')[0]
		$('#width-foundation')[0]
		$('#height-foundation')[0]
		$('#notes-foundation')[0]

		function getPiece(i) {}
		function setPiece(i) {}
		function getFoundation() {


		}
		function setFoundation() {
			var foundation = order.materials.foundation
			if ($('#type-foundation')[0].value === 'deep')
				foundation.deep = true;
			else if ($('#type-foundation')[0].value === 'pad')
				foundation.deep = false
			foundation.pad    = $('#material-foundation')[0].value
			foundation.length = $('#length-foundation')[0].value
			foundation.width  = $('#width-foundation')[0].value
			foundation.height = $('#height-foundation')[0].value
			foundation.notes  = $('#notes-foundation')[0].value
		}
		if (what === 'load') {
			//getPiece(i)
		} else if (what === 'save') {
			//setPiece(i)
			setFoundation()
		}
	}
	function design() {
		if (what === 'load') {

		} else if (what === 'save') {

		}
	}
	function setting() {
		if (what === 'load') {

		} else if (what === 'save') {

		}
	}
	function signature() {
		if (what === 'load') {

		} else if (what === 'save') {

		}
	}
	function status() {
		if (what === 'load') {

		} else if (what === 'save') {

		}
	}

	switch(part) {
		case 'details':
			details(what); break;
		case 'name':
			name(what); break;
		case 'materials':
			materials(what); break;
		case 'design':
			design(what); break;
		case 'setting':
			setting(what); break;
		case 'signature':
			signature(what); break;
		case 'status':
			status(what); break;
	}
}


function setOrder() {
	stringOrder();
	orderFile('save', 'details')
	orderFile('save', 'name')
	localStorage.setItem(order.name.sort, order.stringy);
}

function getOrder() {
	orderFile('load', 'details')
	orderFile('load', 'name')
	//orderFile('load', 'materials')
	//orderFile('load', 'design')
	//orderFile('load', 'setting')
	//orderFile('load', 'signature')
	//orderFile('load', 'status')
}

function stringOrder() {
	var stringy = JSON.stringify(order);
	order.stringy = stringy;
}


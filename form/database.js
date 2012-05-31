function orderFile(what, part) {
	function details(what) {
		if (what === 'load') {
			f('order-date').value = order.details.date;
			f('info-rep').value   = order.details.by;
		} else if (what === 'save') {
			order.details.date = f('order-date').value
			order.details.by   = f('info-rep').value 
		}
	}
	function name() {
		if (what === 'load') {
			f('order-name').value = order.name.full;
		} else if (what === 'save') {
			var orderName = f('order-name');
			var localName = {
				'first': order.name.first,
				'middle': order.name.middle,
				'last': order.name.last,
				'full': order.name.full,
				'sort': order.name.sort
			}

			// if( type === 'sort' )
			// 	order.name.sort = localName.sort

			order.name.full    = f('order-name').value
		}
	}
	function materials() {
		f('qty-foundation')
		f('material-foundation')
		f('type-foundation')
		f('length-foundation')
		f('width-foundation')
		f('height-foundation')
		f('notes-foundation')
		var foundation = order.materials.foundation

		function getPiece(i) {}
		function setPiece(i) {}
		function getFoundation() {}
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



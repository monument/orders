function setOrder() {
	stringOrder();
	order.name.full = $('#order-name')[0];
	localStorage.setItem(order.name.sort, order.stringy);
}

// function getOrder() {
// 	$('')
// }

function stringOrder() {
	order.stringy = JSON.stringify(order);
}

function getName(type) {

}
function setName(type) {
	var orderName = $('#order-name')[0];
	var firstName = orderName.value.substr/\b/)
	var localName = {
		'first': order.name.first,
		'middle': order.name.middle,
		'last': order.name.last,
		'full': order.name.full,
		'sort': order.name.sort
	}


	if( type === 'sort' )
		order.name.sort = localName.sort
}
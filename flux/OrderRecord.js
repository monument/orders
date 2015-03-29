import Immutable from 'immutable'

let Cost = Immutable.Record({
	part: '',
	amount: 0,
})

let Payment = Immutable.Record({
	date: '',
	amount: 0,
})

let Piece = Immutable.Record({
	qty: 0,
	part: '',
	type: '',
	kind: '',
	length: 0,
	width: 0,
	height: 0,
	notes: '',
	amount: 0,
})

let Design = Immutable.Record({
	designName: '',
	letteringDirection: 'north',
	positionsVerified: true,
	nameOnLeft: '',
	carvingType: 'flat',
	nameOnBack: false,
	specialArtwork: true,
	matchRubbing: false,
})

let Sale = Immutable.Record({
	name: '',
	phone: '',
	email: '',
	street: '',
	city: '',
	state: '',
	zip: 0,
	soldBy: '',
	soldAt: '',
})

let Contact = Immutable.Record({
	name: '',
	phone: '',
})

let Delivery = Immutable.Record({
    by: '',
	to: '',
	near: '',
	spaces: '',
	lot: '',
	block: '',
	section: '',
	contact: new Contact(),
})

let OrderRecord = Immutable.Record({
	status: 'layaway',
	date: '',
	title: '',
	note: '',
	costs: Immutable.List(),
	payments: Immutable.List(),
	preview: '',
	lettering: 0,
	delivery: 0,
	fees: 0,
	design: new Design(),
	sale: new Sale(),
	deliver: new Delivery(),
	pieces: Immutable.List(),
})

export {
	Cost, Payment, Piece,
	Design, Sale, Delivery, Contact,
	OrderRecord}
export default OrderRecord

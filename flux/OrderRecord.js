import Immutable from 'immutable'
import {v4 as uuid} from 'node-uuid'

const Cost = Immutable.Record({
	part: '',
	amount: 0,
})

const Payment = Immutable.Record({
	date: '',
	amount: 0,
})

const Piece = Immutable.Record({
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

const Design = Immutable.Record({
	designName: '',
	letteringDirection: 'north',
	positionsVerified: true,
	nameOnLeft: '',
	carvingType: 'flat',
	nameOnBack: false,
	specialArtwork: true,
	matchRubbing: false,
})

const Sale = Immutable.Record({
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

const Delivery = Immutable.Record({
    by: '',
	to: '',
	near: '',
	spaces: '',
	lot: '',
	block: '',
	section: '',
	contact: Immutable.Map({
		name: '',
		phone: '',
	}),
})

const OrderRecord = Immutable.Record({
	id: '',
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

class Order extends OrderRecord {
	constructor(data) {
		super(data)
		return this.withMutations(order => {
			order = order.set('id', order.id || uuid())

			order = order.set('design', new Design(order.design))
			order = order.set('sale', new Sale(order.sale))
			order = order.set('deliver', new Delivery(order.deliver))

			order = order.set('costs', order.costs.map(item => new Cost(item)))
			order = order.set('payments', order.payments.map(item => new Payment(item)))
			order = order.set('pieces', order.pieces.map(item => new Piece(item)))
		})
	}
}

export {Cost, Payment, Piece, Order, Delivery, Design, Sale}
export default Order

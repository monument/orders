import Immutable from 'immutable'
import {v4 as uuid} from 'node-uuid'
import moment from 'moment'

const CostRecord = Immutable.Record({
	piece: '',
	amount: '0',
})

function Cost(data={}) {
	return CostRecord(data)
}

const PaymentRecord = Immutable.Record({
	date: '',
	amount: '0',
})

function Payment(data={}) {
	return PaymentRecord(data).withMutations(p => {
		const today = moment()
		return p.set('date', p.get('date') || `${today.year()}-${today.month()}-${today.day()}`)
	})
}

const PieceRecord = Immutable.Record({
	qty: '1',
	piece: '',
	material: '',

	description: '',

	length: '',
	width: '',
	height: '',

	amount: '100',
})

function Piece(data={}) {
	return PieceRecord(data)
}

const OrderRecord = Immutable.Record({
	id: '',
	status: 'quote',
	date: '',
	title: '',
	note: '',
	costs: Immutable.List(),
	payments: Immutable.List(),
	preview: '',
	lettering: '0',
	deliveryFee: '0',
	fees: '0',

	design: Immutable.Map({
		designName: '',
		letteringDirection: 'north',
		positionsVerified: true,
		nameOnLeft: '',
		carvingType: 'flat',
		nameOnBack: false,
		specialArtwork: true,
		matchRubbing: false,
	}),

	sale: Immutable.Map({
		name: '',
		phone: '',
		email: '',
		street: '',
		city: '',
		state: '',
		zip: '',
		soldBy: '',
		soldAt: '',
	}),

	delivery: Immutable.Map({
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
	}),

	pieces: Immutable.List(),
})

function Order(data={}) {
	return OrderRecord(data).withMutations(order => {
		const today = moment()
		order = order
			.set('id', order.get('id') || uuid())
			.set('date', order.get('date') || `${today.year()}-${today.month()}-${today.day()}`)

		if (!order.get('costs').size) {
			order = order.set('costs', Immutable.List.of(Cost()))
		}
		if (!order.get('payments').size) {
			order = order.set('payments', Immutable.List.of(Payment()))
		}
		if (!order.get('pieces').size) {
			order = order.set('pieces', Immutable.List.of(Piece()))
		}

		return order
	})
}

export default Order
export {Order, Cost, Payment, Piece, OrderRecord}

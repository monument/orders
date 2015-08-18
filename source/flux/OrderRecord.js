import Immutable from 'immutable'
import {v4 as uuid} from 'node-uuid'

const dateFormat = new Intl.NumberFormat('en-US', {style: 'decimal', minimumIntegerDigits: 2, useGrouping: false}).format

const CostRecord = Immutable.Map({
	piece: '',
	amount: '0',
})

function Cost(data={}) {
	const basic = Immutable.fromJS(data)
	return CostRecord.merge(basic)
}

const PaymentRecord = Immutable.Map({
	date: '',
	amount: '0',
})

function Payment(data={}) {
	const basic = Immutable.fromJS(data)
	return PaymentRecord.withMutations((p) => {
		p = p.merge(basic)
		const today = new Date()
		p = p.set('date', p.get('date') || `${dateFormat(today.getFullYear())}-${dateFormat(today.getMonth() + 1)}-${dateFormat(today.getDate())}`)
		return p
	})
}

const PieceRecord = Immutable.Map({
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
	const basic = Immutable.fromJS(data)
	return PieceRecord.merge(basic)
}

const OrderRecord = Immutable.Map({
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
	const oldOrder = Immutable.fromJS(data)
	return OrderRecord.withMutations(order => {
		const today = new Date()
		order = order
			.set('id', order.get('id') || uuid())
			.set('date', order.get('date') || `${dateFormat(today.getFullYear())}-${dateFormat(today.getMonth() + 1)}-${dateFormat(today.getDate())}`)
			.merge(oldOrder)

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
export {Order, Cost, Payment, Piece}

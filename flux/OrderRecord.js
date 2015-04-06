import Immutable from 'immutable'
import {v4 as uuid} from 'node-uuid'

const dateFormat = new Intl.NumberFormat('en-US', {style: 'decimal', minimumIntegerDigits: 2, useGrouping: false}).format

const CostRecord = Immutable.Map({
	part: '',
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
	part: '',
	material: '',
	type: '',
	kind: '',
	length: '',
	width: '',
	height: '',
	notes: '',
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
	let order = OrderRecord.withMutations((o) => {
		o = o.set('id', o.get('id') || uuid())
		const today = new Date()
		o = o.set('date', o.get('date') || `${dateFormat(today.getFullYear())}-${dateFormat(today.getMonth() + 1)}-${dateFormat(today.getDate())}`)
		o = o.merge(oldOrder)

		if (!o.get('costs').size)
			o = o.set('costs', Immutable.List.of(Cost()))
		if (!o.get('payments').size)
			o = o.set('payments', Immutable.List.of(Payment()))
		if (!o.get('pieces').size)
			o = o.set('pieces', Immutable.List.of(Piece()))

		return o
	})
	return order
}

export default Order
export {Order, Cost, Payment, Piece}

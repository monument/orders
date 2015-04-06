import {Store} from 'flummox'
import Immutable from 'immutable'
import Order from './OrderRecord'
import {Piece, Cost, Payment} from './OrderRecord'
import contains from 'lodash/collection/contains'

export default class OrderStore extends Store {
	constructor(flux) {
		// set up parent class
		super()

		// bind actions to methods
		const orderActionIds = flux.getActionIds('orders')
		this.register(orderActionIds.createOrder, this.onCreateOrder)
		this.register(orderActionIds.updatePath, this.onUpdatePath)

		this.register(orderActionIds.addPiece, this.onAddPiece)
		this.register(orderActionIds.removePiece, this.onRemovePiece)

		this.register(orderActionIds.addCost, this.onAddCost)
		this.register(orderActionIds.removeCost, this.onRemoveCost)

		this.register(orderActionIds.addPayment, this.onAddPayment)
		this.register(orderActionIds.removePayment, this.onRemovePayment)

		// prepare state
		this.state = {
			orders: Immutable.Map()
		}
	}


	// Methods

	onCreateOrder(orderInfo) {
		console.log('onCreateOrder')
		const order = Order(orderInfo)
		this.setState({orders: this.state.orders.set(order.get('id'), order)})
	}

	onUpdatePath({path, ev}) {
		console.log('onUpdatePath')
		const newValue = ev.target.value
		this.setState({orders: this.state.orders.setIn(path, newValue)})
	}


	// Pieces
	_addItem({orderId, archetype, key}) {
		console.log('_addItem')
		let order = this.state.orders.get(orderId)
		console.log(this.state.orders.toJS())
		order = order.set(key, order.get(key).push(archetype))
		this.setState({orders: this.state.orders.set(orderId, order)})
	}
	_removeItem({orderId, index, key, archetype}) {
		console.log('_removeItem')
		let order = this.state.orders.get(orderId)
		let things = order.get(key).delete(index)
		if (!things.size)
			things = things.push(archetype)
		order = order.set(key, things)
		this.setState({orders: this.state.orders.set(orderId, order)})
	}


	onAddPiece({orderId}) {
		console.log('onAddPiece')
		this._addItem({orderId, archetype: Piece, key: 'pieces'})
	}
	onRemovePiece({orderId, pieceIndex}) {
		console.log('onRemovePiece')
		this._removeItem({orderId, index: pieceIndex, key: 'pieces', archetype: Piece})
	}

	// Costs
	onAddCost({orderId}) {
		console.log('onAddCost')
		this._addItem({orderId, archetype: Cost, key: 'costs'})
	}
	onRemoveCost({orderId, costIndex}) {
		console.log('onRemoveCost')
		this._removeItem({orderId, index: costIndex, key: 'costs', archetype: Cost})
	}

	// Payments
	onAddPayment({orderId}) {
		console.log('onAddPayment')
		this._addItem({orderId, archetype: Payment, key: 'payments'})
	}
	onRemovePayment({orderId, paymentIndex}) {
		console.log('onRemovePayment')
		this._removeItem({orderId, index: paymentIndex, key: 'payments', archetype: Payment})
	}
}

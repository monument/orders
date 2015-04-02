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
		this.register(orderActionIds.updateOrderSale, this.onUpdateOrderSale)
		this.register(orderActionIds.updateFee, this.onUpdateFee)
		this.register(orderActionIds.updateDesign, this.onUpdateDesign)
		this.register(orderActionIds.updateDeliver, this.onUpdateDeliver)
		this.register(orderActionIds.updateItem, this.onUpdateItem)

		this.register(orderActionIds.addPiece, this.onAddPiece)
		this.register(orderActionIds.removePiece, this.onRemovePiece)
		this.register(orderActionIds.updatePiece, this.onUpdatePiece)

		this.register(orderActionIds.addCost, this.onAddCost)
		this.register(orderActionIds.removeCost, this.onRemoveCost)
		this.register(orderActionIds.updateCost, this.onUpdateCost)

		this.register(orderActionIds.addPayment, this.onAddPayment)
		this.register(orderActionIds.removePayment, this.onRemovePayment)
		this.register(orderActionIds.updatePayment, this.onUpdatePayment)

		// prepare state
		this.state = {
			orders: Immutable.Map()
		}
	}


	// Methods

	onCreateOrder(orderInfo) {
		const ImmutableOrder = Immutable.fromJS(orderInfo)
		let order = new Order(orderInfo)
		order = order.mergeDeep(ImmutableOrder)
		this.setState({orders: this.state.orders.set(order.id, order)})
	}

	_updateKey({orderId, key, value}) {
		let order = this.state.orders.get(orderId)
		order = order.set(key, value)
		this.setState({orders: this.state.orders.set(orderId, order)})
	}

	_updateKeyIn({orderId, parent, key, value}) {
		let order = this.state.orders.get(orderId)
		let destination = order.get(parent).set(key, value)
		order = order.set(parent, destination)
		this.setState({orders: this.state.orders.set(orderId, order)})
	}

	onUpdateOrderSale({orderId, key, value}) {
		this._updateKeyIn({orderId, parent: 'sale', key, value})
	}

	onUpdateFee({orderId, fee, value}) {
		if (!contains(['delivery', 'fees'], fee)) {
			return
		}
		this._updateKey({orderId, key: fee, value})
	}

	onUpdateDesign({orderId, key, newValue}) {
		this._updateKeyIn({orderId, parent: 'design', key, value: newValue})
	}
	onUpdateDeliver({orderId, key, newValue}) {
		this._updateKeyIn({orderId, parent: 'deliver', key, value: newValue})
	}

	onUpdateItem({orderId, item, newValue}) {
		this._updateKey({orderId, key: item, value: newValue})
	}

	// Pieces
	_addItem(orderId, ItemConstructor, key) {
		let order = this.state.orders.get(orderId)
		const item = new ItemConstructor()
		order = order.set(key, order.get(key).push(item))
		this.setState({orders: this.state.orders.set(orderId, order)})
	}
	_removeItem(orderId, index, key, ItemConstructor) {
		let order = this.state.orders.get(orderId)
		let things = order.get(key).delete(index)
		if (!things.size)
			things = things.push(new ItemConstructor())
		order = order.set(key, things)
		this.setState({orders: this.state.orders.set(orderId, order)})
	}
	_updateItem(orderId, key, index, newInfo, ItemConstructor) {
		let order = this.state.orders.get(orderId)
		const item = order.get(key).get(index)
		const merged = item.merge(newInfo)
		const newItem = new ItemConstructor(merged)
		const items = order.get(key).splice(index, 1, newItem)
		order = order.set(key, items)
		this.setState({orders: this.state.orders.set(orderId, order)})
	}


	onAddPiece({orderId}) {
		this._addItem(orderId, Piece, 'pieces')
	}
	onRemovePiece({orderId, pieceIndex}) {
		this._removeItem(orderId, pieceIndex, 'pieces', Piece)
	}
	onUpdatePiece({orderId, pieceIndex, info}) {
		this._updateItem(orderId, 'pieces', pieceIndex, info, Piece)
	}

	// Costs
	onAddCost({orderId}) {
		this._addItem(orderId, Cost, 'costs')
	}
	onRemoveCost({orderId, costIndex}) {
		this._removeItem(orderId, costIndex, 'costs', Cost)
	}
	onUpdateCost({orderId, costIndex, info}) {
		this._updateItem(orderId, 'costs', costIndex, info, Cost)
	}

	// Payments
	onAddPayment({orderId}) {
		this._addItem(orderId, Payment, 'payments')
	}
	onRemovePayment({orderId, paymentIndex}) {
		this._removeItem(orderId, paymentIndex, 'payments', Payment)
	}
	onUpdatePayment({orderId, paymentIndex, info}) {
		this._updateItem(orderId, 'payments', paymentIndex, info, Payment)
	}
}

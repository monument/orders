import {Store} from 'flummox'
import Immutable from 'immutable'
import Order from './OrderRecord'
import {Piece, Cost, Payment} from './OrderRecord'

export default class OrderStore extends Store {
	constructor(flux) {
		// set up parent class
		super()

		// bind actions to methods
		const orderActionIds = flux.getActionIds('orders')
		this.register(orderActionIds.createOrder, this.onCreateOrder)
		this.register(orderActionIds.updateOrderSale, this.onUpdateOrderSale)
		this.register(orderActionIds.updateFee, this.onUpdateFee)

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

	onUpdateOrderSale({orderId, key, value}) {
		let order = this.state.orders.get(orderId)
		const newSale = order.sale.set(key, value)
		order = order.set('sale', newSale)
		this.setState({orders: this.state.orders.set(orderId, order)})
	}

	onUpdateFee({orderId, fee, value}) {
		if (!['delivery', 'fees'].contains(fee)) {
			return
		}
		let order = this.state.orders.get(orderId)
		order = order.set(fee, value)
		this.setState({orders: this.state.orders.set(orderId, order)})
	}

	// Pieces
	onAddItem(orderId, ItemConstructor, key) {
		let order = this.state.orders.get(orderId)
		const item = new ItemConstructor()
		order = order.set(key, order.get(key).push(item))
		this.setState({orders: this.state.orders.set(orderId, order)})
	}
	onRemoveItem(orderId, index, key, ItemConstructor) {
		let order = this.state.orders.get(orderId)
		let things = order.get(key).delete(index)
		if (!things.size)
			things = things.push(new ItemConstructor())
		order = order.set(key, things)
		this.setState({orders: this.state.orders.set(orderId, order)})
	}
	onUpdateItem(orderId, key, index, newInfo, ItemConstructor) {
		let order = this.state.orders.get(orderId)
		const item = order.get(key).get(index)
		const merged = item.merge(newInfo)
		const newItem = new ItemConstructor(merged)
		const items = order.get(key).splice(index, 1, newItem)
		order = order.set(key, items)
		this.setState({orders: this.state.orders.set(orderId, order)})
	}


	onAddPiece({orderId}) {
		this.onAddItem(orderId, Piece, 'pieces')
	}
	onRemovePiece({orderId, pieceIndex}) {
		this.onRemoveItem(orderId, pieceIndex, 'pieces', Piece)
	}
	onUpdatePiece({orderId, pieceIndex, info}) {
		this.onUpdateItem(orderId, 'pieces', pieceIndex, info, Piece)
	}

	// Costs
	onAddCost({orderId}) {
		this.onAddItem(orderId, Cost, 'costs')
	}
	onRemoveCost({orderId, costIndex}) {
		this.onRemoveItem(orderId, costIndex, 'costs', Cost)
	}
	onUpdateCost({orderId, costIndex, info}) {
		this.onUpdateItem(orderId, 'costs', costIndex, info, Cost)
	}

	// Payments
	onAddPayment({orderId}) {
		this.onAddItem(orderId, Payment, 'payments')
	}
	onRemovePayment({orderId, paymentIndex}) {
		this.onRemoveItem(orderId, paymentIndex, 'payments', Payment)
	}
	onUpdatePayment({orderId, paymentIndex, info}) {
		this.onUpdateItem(orderId, 'payments', paymentIndex, info, Payment)
	}
}

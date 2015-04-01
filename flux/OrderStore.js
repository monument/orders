import {Store} from 'flummox'
import Immutable from 'immutable'
import Order from './OrderRecord'
import {Piece} from './OrderRecord'

export default class OrderStore extends Store {
	constructor(flux) {
		// set up parent class
		super()

		// bind actions to methods
		const orderActionIds = flux.getActionIds('orders')
		this.register(orderActionIds.createOrder, this.onCreateOrder)
		this.register(orderActionIds.updateOrderSale, this.onUpdateOrderSale)
		this.register(orderActionIds.addPiece, this.onAddPiece)
		this.register(orderActionIds.removePiece, this.onRemovePiece)

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

	onAddPiece({orderId}) {
		const piece = new Piece()
		let order = this.state.orders.get(orderId)
		order = order.set('pieces', order.pieces.push(piece))
		this.setState({orders: this.state.orders.set(orderId, order)})
	}

	onRemovePiece({orderId, pieceIndex}) {
		let order = this.state.orders.get(orderId)
		let pieces = order.pieces.splice(pieceIndex, 1)
		order = order.set('pieces', pieces)
		this.setState({orders: this.state.orders.set(orderId, order)})
	}
}

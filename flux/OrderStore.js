import {Store} from 'flummox'
import Immutable from 'immutable'
import Order from './OrderRecord'

export default class OrderStore extends Store {
	constructor(flux) {
		// set up parent class
		super()

		// bind actions to methods
		const orderActionIds = flux.getActionIds('orders')
		this.register(orderActionIds.createOrder, this.onCreateOrder)
		this.register(orderActionIds.updateOrderSale, this.onUpdateOrderSale)

		// prepare state
		this.state = {
			orders: Immutable.Map()
		}
	}

	// Internal fluxxor methods

	// static serialize(state) {
	// 	return state.toJSON()
	// }

	// static deserialize(serializedState) {
	// 	const json = JSON.parse(serializedState)
	// 	const data = Immutable.fromJS(json)
	// 	const hydrated = data.map(order => new Order(order))
	// 	return hydrated
	// }

	assignState(oldState, newState) {
		// this._saveState(newState)
		return Object.assign({}, oldState, newState)
	}

	getStateAsObject() {
		return this.state
	}


	// Methods

	onCreateOrder(orderInfo) {
		let ImmutableOrder = Immutable.fromJS(orderInfo)
		let order = new Order(orderInfo)
		order = order.mergeDeep(ImmutableOrder)
		this.setState({
			orders: this.state.orders.set(order.id, order)
		})
	}

	onUpdateOrderSale({orderId, key, value}) {
		let order = this.state.orders.get(orderId)
		let newSale = order.sale.set(key, value)
		order = order.set('sale', newSale)
		this.setState({orders: this.state.orders.set(orderId, order)})
	}
}

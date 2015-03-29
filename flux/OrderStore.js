import {Store} from 'flummox'
import Immutable from 'immutable'

export default class OrderStore extends Store {
	constructor(flux) {
		super()

		let orderActionIds = flux.getActionIds('orders')
		this.register(orderActionIds.createOrder, this.onCreateOrder)

		this.state = {
			orders: Immutable.List()
		}
	}

	onCreateOrder(order) {
		this.setState({
			orders: this.state.orders.concat([order])
		})
	}
}

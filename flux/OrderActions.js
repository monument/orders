import {Actions} from 'flummox'
import Immutable from 'immutable'
import Order from './OrderRecord'

export default class OrderActions extends Actions {
	createOrder(orderInfo) {
		let ImmutableOrder = Immutable.fromJS(orderInfo)
		let order = new Order(orderInfo)
		order = order.mergeDeep(ImmutableOrder)
		return order
	}
}

import {Actions} from 'flummox'
import Immutable from 'immutable'

export default class OrderActions extends Actions {
	createOrder(order) {
		console.log('OrderActions.createOrder')
		return order
	}

	updateOrderSale(orderId, key, value) {
		console.log('OrderActions.updateOrderSale')
		return {orderId, key, value}
	}
}

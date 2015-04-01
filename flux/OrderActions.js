import {Actions} from 'flummox'
import Immutable from 'immutable'

export default class OrderActions extends Actions {
	createOrder(order) {
		console.log('OrderActions.createOrder')
		return order
	}

	addPiece(orderId) {
		console.log('OrderActions.addPiece')
		return {orderId}
	}

	removePiece(orderId, pieceIndex) {
		console.log('OrderActions.removePiece')
		return {orderId, pieceIndex}
	}

	updateOrderSale(orderId, key, value) {
		console.log('OrderActions.updateOrderSale')
		return {orderId, key, value}
	}
}

import {Actions} from 'flummox'

export default class OrderActions extends Actions {
	createOrder(order) {
		return order
	}
	updatePath(path, ev) {
		return {path, ev}
	}

	addPiece(orderId) {
		return {orderId}
	}
	removePiece(orderId, pieceIndex) {
		return {orderId, pieceIndex}
	}

	addCost(orderId) {
		return {orderId}
	}
	removeCost(orderId, costIndex) {
		return {orderId, costIndex}
	}

	addPayment(orderId) {
		return {orderId}
	}
	removePayment(orderId, paymentIndex) {
		return {orderId, paymentIndex}
	}
}

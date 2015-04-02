import {Actions} from 'flummox'

export default class OrderActions extends Actions {
	createOrder(order) {
		return order
	}

	addPiece(orderId) {
		return {orderId}
	}
	removePiece(orderId, pieceIndex) {
		return {orderId, pieceIndex}
	}
	updatePiece(orderId, pieceIndex, info) {
		return {orderId, pieceIndex, info}
	}

	addCost(orderId) {
		return {orderId}
	}
	removeCost(orderId, costIndex) {
		return {orderId, costIndex}
	}
	updateCost(orderId, costIndex, info) {
		return {orderId, costIndex, info}
	}

	addPayment(orderId) {
		return {orderId}
	}
	removePayment(orderId, paymentIndex) {
		return {orderId, paymentIndex}
	}
	updatePayment(orderId, paymentIndex, info) {
		return {orderId, paymentIndex, info}
	}

	updateOrderSale(orderId, key, value) {
		return {orderId, key, value}
	}
	updateFee(orderId, fee, value) {
		return {orderId, fee, value}
	}
}

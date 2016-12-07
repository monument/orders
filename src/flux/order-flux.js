import {Flux} from 'flummox'
import OrderActions from './order-actions'
import OrderStore from './order-store'

export default class OrderFlux extends Flux {
	constructor() {
		super()

		this.createActions('orders', OrderActions)
		this.createStore('orders', OrderStore, this)
	}
}

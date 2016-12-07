import {Flux} from 'flummox'
import OrderActions from './OrderActions'
import OrderStore from './OrderStore'

export default class OrderFlux extends Flux {
	constructor() {
		super()

		this.createActions('orders', OrderActions)
		this.createStore('orders', OrderStore, this)
	}
}

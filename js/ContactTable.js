import React from 'react'
let {PropTypes, Component} = React
import Immutable from 'immutable'
import {Sale} from '../flux/OrderRecord'

export default class ContactTable extends Component {
	static propTypes = {
		sale: PropTypes.instanceOf(Sale).isRequired,
		orderId: PropTypes.string.isRequired,
		actions: PropTypes.object.isRequired,
	}

	render() {
		let {sale, orderId, actions} = this.props
		// console.log(actions)
		return <table id="contact" className="table">
			<caption>Contact</caption>
			<tbody>
				<tr><td colSpan={3}>
					<input placeholder="Name" value={sale.get('name')} onChange={ev => actions.updateOrderSale(orderId, 'name', ev.target.value)} />
				</td></tr>
				<tr><td colSpan={3}>
					<input placeholder="Phone" type="tel" value={sale.get('phone')} onChange={ev => actions.updateOrderSale(orderId, 'phone', ev.target.value)} />
				</td></tr>
				<tr><td colSpan={3}>
					<input placeholder="Email" type="email" value={sale.get('email')} onChange={ev => actions.updateOrderSale(orderId, 'email', ev.target.value)} />
				</td></tr>
				<tr><td colSpan={3}>
					<input placeholder="Street" type="text" value={sale.get('street')} onChange={ev => actions.updateOrderSale(orderId, 'street', ev.target.value)} />
				</td></tr>
				<tr>
					<td style={{width: '50%'}}><input placeholder="City" value={sale.get('city')} onChange={ev => actions.updateOrderSale(orderId, 'city', ev.target.value)} /></td>
					<td><input placeholder="State" value={sale.get('state')} onChange={ev => actions.updateOrderSale(orderId, 'state', ev.target.value)} /></td>
					<td><input placeholder="Zip" value={sale.get('zip')} onChange={ev => actions.updateOrderSale(orderId, 'zip', ev.target.value)} /></td>
				</tr>
				<tr>
					<td colSpan={3}><input placeholder="Sold By" list="reps" value={sale.get('soldBy')} onChange={ev => actions.updateOrderSale(orderId, 'soldBy', ev.target.value)} /></td>
				</tr>
			</tbody>
		</table>
	}
}

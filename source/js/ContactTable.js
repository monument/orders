import React, {PropTypes, Component} from 'react'
import Immutable from 'immutable'
import curry from 'lodash/function/curry'

export default class ContactTable extends Component {
	static propTypes = {
		sale: PropTypes.instanceOf(Immutable.Map).isRequired,
		orderId: PropTypes.string.isRequired,
		actions: PropTypes.object.isRequired,
	}

	render() {
		const {sale, orderId, actions} = this.props
		const updateIn = curry(actions.updatePath, 2)
		return <table id='contact' className='table'>
			<caption>Contact</caption>
			<tbody>
				<tr><td colSpan={3}>
					<input
						placeholder='Name'
						value={sale.get('name')}
						onChange={updateIn([orderId, 'sale', 'name'])} />
				</td></tr>
				<tr><td colSpan={3}>
					<input
						type='tel'
						placeholder='Phone'
						value={sale.get('phone')}
						onChange={updateIn([orderId, 'sale', 'phone'])} />
				</td></tr>
				<tr><td colSpan={3}>
					<input
						type='email'
						placeholder='Email'
						value={sale.get('email')}
						onChange={updateIn([orderId, 'sale', 'email'])} />
				</td></tr>
				<tr><td colSpan={3}>
					<input
						placeholder='Street'
						value={sale.get('street')}
						onChange={updateIn([orderId, 'sale', 'street'])} />
				</td></tr>
				<tr>
					<td style={{width: '50%'}}>
						<input
							placeholder='City'
							value={sale.get('city')}
							onChange={updateIn([orderId, 'sale', 'city'])} />
					</td>
					<td>
						<input
							placeholder='State'
							value={sale.get('state')}
							onChange={updateIn([orderId, 'sale', 'state'])} />
					</td>
					<td>
						<input
							placeholder='Zip'
							value={sale.get('zip')}
							onChange={updateIn([orderId, 'sale', 'zip'])} />
					</td>
				</tr>
				<tr>
					<td colSpan={3}>
						<input
							list='reps'
							placeholder='Sold By'
							value={sale.get('soldBy')}
							onChange={updateIn([orderId, 'sale', 'soldBy'])} />
					</td>
				</tr>
			</tbody>
		</table>
	}
}

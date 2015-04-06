import React from 'react'
let {PropTypes, Component} = React
import Immutable from 'immutable'
import curry from 'lodash/function/curry'
import currency from './currency'

export default class PaymentsTable extends Component {
	static propTypes = {
		actions: PropTypes.shape({
			addPayment: PropTypes.func.isRequired,
			removePayment: PropTypes.func.isRequired,
			updatePath: PropTypes.func.isRequired,
		}).isRequired,
		payments: PropTypes.instanceOf(Immutable.List).isRequired,
		paid: PropTypes.number.isRequired,
		balance: PropTypes.number.isRequired,
	}

	render() {
		const {addPayment, removePayment, updatePath} = this.props.actions
		const updateIn = curry(updatePath, 2)
		const {orderId} = this.props

		return <table className='table money' id='payments'>
			<caption>Payments <button onClick={() => addPayment(orderId)}>+</button></caption>
			<tbody>
				{this.props.payments.map((payment, index) =>
					<tr key={index}>
						<td>
							<input
								placeholder='MM/DD/YYYY'
								type='date'
								required
								value={payment.get('date')}
								onChange={updateIn([orderId, 'payments', index, 'date'])} />
						</td>
						<td>
							<input
								className='amountPaid currency'
								type='number'
								value={payment.get('amount')}
								onChange={updateIn([orderId, 'payments', index, 'amount'])} />
						</td>
						<td className='action delete'>
							<button onClick={() => removePayment(orderId, index)}>
								–
							</button>
						</td>
					</tr>
				).toArray()}
			</tbody>
			<tfoot>
				<tr>
					<td><label htmlFor='amount-paid'>Amount Paid</label></td>
					<td colSpan='2'><output id='amount-paid' className='amount'>{currency(this.props.paid)}</output></td>
				</tr>
				<tr>
					<td><label className='print-big' htmlFor='balance-due'>Balance Due</label></td>
					<td colSpan='2'><output id='balance-due' className='amount'>{currency(this.props.balance)}</output></td>
				</tr>
			</tfoot>
		</table>
	}
}

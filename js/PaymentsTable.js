import React from 'react'
let {PropTypes, Component} = React
import Immutable from 'immutable'

export default class PaymentsTable extends Component {
	static propTypes = {
		addPayment: PropTypes.func.isRequired,
		removePayment: PropTypes.func.isRequired,
		updatePayment: PropTypes.func.isRequired,
		payments: PropTypes.instanceOf(Immutable.List).isRequired,
		paid: PropTypes.number.isRequired,
		balance: PropTypes.number.isRequired,
	}

	render() {
		const {addPayment, removePayment, updatePayment} = this.props
		const {orderId} = this.props
		return <table className="table money" id="payments">
			<caption>Payments <button onClick={() => addPayment(orderId)}>+</button></caption>
			<tbody>
				{this.props.payments.map(({date, amount}, index) =>
					<tr key={index}>
						<td><input placeholder="MM/DD/YYYY" type="date" required value={date} onChange={(ev) => updatePayment(orderId, index, {date: ev.target.value})} /></td>
						<td><input className="amountPaid" type="number" value={amount} onChange={(ev) => updatePayment(orderId, index, {amount: parseFloat(ev.target.value)})} /></td>
						<td className="action delete"><button onClick={() => removePayment(orderId, index)}>-</button></td>
					</tr>
				).toArray()}
			</tbody>
			<tfoot>
				<tr>
					<td><label htmlFor="amount-paid">Amount Paid</label></td>
					<td><output id="amount-paid">{this.props.paid}</output></td>
					<td />
				</tr>
				<tr>
					<td><label className="print-big" htmlFor="balance-due">Balance Due</label></td>
					<td><output id="balance-due">{this.props.balance}</output></td>
					<td />
				</tr>
			</tfoot>
		</table>
	}
}

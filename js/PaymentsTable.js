import React from 'react'
let {PropTypes, Component} = React
import Immutable from 'immutable'

export default class PaymentsTable extends Component {
	static propTypes = {
		// addPayment: PropTypes.func.isRequired,
		// delPayment: PropTypes.func.isRequired,
		payments: PropTypes.instanceOf(Immutable.List).isRequired,
		paid: PropTypes.number.isRequired,
		balance: PropTypes.number.isRequired,
	}

	render() {
		return <table className="table money" id="payments">
			<caption>Payments <button onClick={this.props.addPayment}>(+)</button></caption>
			<tbody>
				{this.props.payments.map(({date, amount}, index) =>
					<tr key={index}>
						<td><input placeholder="MM/DD/YYYY" type="date" required defaultValue={date} /></td>
						<td><input className="amountPaid" type="number" defaultValue={amount || 0} /></td>
						<td className="action delete"><button onClick={this.props.delPayment}>&nbsp;-&nbsp;</button></td>
					</tr>
				).toArray()}
			</tbody>
			<tfoot>
				<tr>
					<td><label htmlFor="amount-paid">Amount Paid</label></td>
					<td><input id="amount-paid" readOnly className="amountPaid" type="number" defaultValue={this.props.paid} /></td>
					<td />
				</tr>
				<tr>
					<td><label className="print-big" htmlFor="balance-due">Balance Due</label></td>
					<td><input id="balance-due" readOnly className="amount" type="number" defaultValue={this.props.balance} /></td>
					<td />
				</tr>
			</tfoot>
		</table>
	}
}

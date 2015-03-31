import React from 'react'
let {PropTypes, Component} = React
import Immutable from 'immutable'

export default class CostsTable extends Component {
	static propTypes = {
		// addCost: PropTypes.func.isRequired,
		// delCost: PropTypes.func.isRequired,
		subtotal: PropTypes.number.isRequired,
		tax: PropTypes.number.isRequired,
		deliveryCharge: PropTypes.number.isRequired,
		applicableFees: PropTypes.number.isRequired,
		total: PropTypes.number.isRequired,
		costs: PropTypes.instanceOf(Immutable.List).isRequired,
	}

	render() {
		return <table className="table money" id="costs">
			<caption>Costs <button onClick={this.props.addCost}>(+)</button></caption>
			<tbody>
				{this.props.costs.map(({part, amount}, index) =>
					<tr className="cost" key={index}>
						<td><input list="part-list" placeholder="Part" defaultValue={part} /></td>
						<td><input type="number" defaultValue={amount || 0} /></td>
						<td className="action delete"><button onClick={this.props.delCost}>&nbsp;-&nbsp;</button></td>
					</tr>
				).toArray()}
			</tbody>
			<tbody>
				<tr>
					<td><label htmlFor="subtotal">Subtotal</label></td>
					<td><input id="subtotal" type="number" readOnly value={this.props.subtotal} /></td>
					<td />
				</tr>
				<tr>
					<td><label htmlFor="sales-tax">Sales Tax</label></td>
					<td><input id="sales-tax" type="number" readOnly value={this.props.tax} /></td>
					<td />
				</tr>
				<tr>
					<td><label htmlFor="delivery-fee">Delivery</label></td>
					<td><input id="delivery-fee" type="number" value={this.props.delivery} /></td>
					<td />
				</tr>
				<tr>
					<td><label htmlFor="other-fees">Applicable Fees</label></td>
					<td><input id="other-fees" type="number" value={this.props.fees} /></td>
					<td />
				</tr>
				<tr>
					<td><label className="print-big" htmlFor="total-price">Total Price</label></td>
					<td><input id="total-price" type="number" readOnly value={this.props.total} /></td>
					<td />
				</tr>
			</tbody>
		</table>
	}
}

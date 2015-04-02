import React from 'react'
let {PropTypes, Component} = React
import Immutable from 'immutable'
import round from './round'

export default class CostsTable extends Component {
	static propTypes = {
		actions: PropTypes.shape({
			addCost: PropTypes.func.isRequired,
			removeCost: PropTypes.func.isRequired,
			updateCost: PropTypes.func.isRequired,
			updateFee: PropTypes.func.isRequired,
		}).isRequired,
		orderId: PropTypes.string.isRequired,
		subtotal: PropTypes.number.isRequired,
		tax: PropTypes.number.isRequired,
		deliveryCharge: PropTypes.number.isRequired,
		applicableFees: PropTypes.number.isRequired,
		total: PropTypes.number.isRequired,
		costs: PropTypes.instanceOf(Immutable.List).isRequired,
	}

	render() {
		const {addCost, removeCost, updateCost, updateFee} = this.props.actions
		const {orderId} = this.props
		return <table className="table money" id="costs">
			<caption>Costs <button onClick={() => addCost(orderId)}>+</button></caption>
			<tbody>
				{this.props.costs.map(({part, amount}, index) =>
					<tr className="cost" key={index}>
						<td><input list="part-list" placeholder="Part" value={part} onChange={(ev) => updateCost(orderId, index, {part: ev.target.value})} /></td>
						<td><input type="number" value={amount} onChange={(ev) => updateCost(orderId, index, {amount: parseFloat(ev.target.value)})} /></td>
						<td className="action delete"><button onClick={() => removeCost(orderId, index)}>&nbsp;-&nbsp;</button></td>
					</tr>
				).toArray()}
			</tbody>
			<tbody>
				<tr>
					<td><label htmlFor="subtotal">Subtotal</label></td>
					<td><output id="subtotal">${this.props.subtotal}</output></td>
					<td />
				</tr>
				<tr>
					<td><label htmlFor="sales-tax">Sales Tax</label></td>
					<td><output id="sales-tax">${this.props.tax}</output></td>
					<td />
				</tr>
				<tr>
					<td><label htmlFor="delivery-fee">Delivery</label></td>
					<td><input id="delivery-fee" type="number" value={this.props.delivery} onChange={(ev) => updateFee(orderId, 'delivery', ev.target.value)} /></td>
					<td />
				</tr>
				<tr>
					<td><label htmlFor="other-fees">Applicable Fees</label></td>
					<td><input id="other-fees" type="number" value={this.props.fees} onChange={(ev) => updateFee(orderId, 'fees', ev.target.value)} /></td>
					<td />
				</tr>
				<tr>
					<td><label className="print-big" htmlFor="total-price">Total Price</label></td>
					<td><output id="total-price">${this.props.total}</output></td>
					<td />
				</tr>
			</tbody>
		</table>
	}
}

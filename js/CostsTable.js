import React from 'react'
let {PropTypes, Component} = React
import Immutable from 'immutable'
import curry from 'lodash/function/curry'
import currency from './currency'

export default class CostsTable extends Component {
	static propTypes = {
		actions: PropTypes.shape({
			addCost: PropTypes.func.isRequired,
			removeCost: PropTypes.func.isRequired,
			updatePath: PropTypes.func.isRequired,
		}).isRequired,
		orderId: PropTypes.string.isRequired,
		subtotal: PropTypes.number.isRequired,
		tax: PropTypes.number.isRequired,
		deliveryFee: PropTypes.string.isRequired,
		fees: PropTypes.string.isRequired,
		total: PropTypes.number.isRequired,
		costs: PropTypes.instanceOf(Immutable.List).isRequired,
		pieces: PropTypes.instanceOf(Immutable.List).isRequired,
	}

	render() {
		const {addCost, removeCost, updatePath} = this.props.actions
		const updateIn = curry(updatePath, 2)
		const {orderId} = this.props
		return <table className='table money' id='costs'>
			<caption>Costs <button onClick={() => addCost(orderId)}>+</button></caption>
			<tbody>
				{this.props.costs.map((cost, index) =>
					<tr className='cost' key={index}>
						<td>
							<input
								list='part-list'
								placeholder='Part'
								value={cost.get('part')}
								onChange={updateIn([orderId, 'costs', index, 'part'])} />
						</td>
						<td>
							<input
								className='currency'
								type='number'
								value={cost.get('amount')}
								onChange={updateIn([orderId, 'costs', index, 'amount'])} />
						</td>
						<td className='action delete'>
							<button onClick={() => removeCost(orderId, index)}>
								–
							</button>
						</td>
					</tr>
				).toArray()}
			</tbody>
			<tbody>
				{this.props.pieces.map((piece, index) =>
					<tr className='piece' key={index}>
						<td>
							<output>
								{piece.get('kind')} {piece.get('material')} {piece.get('part')}
							</output>
						</td>
						<td colSpan='2'>
							<output className='currency amount'>{piece.get('qty')} × {currency(piece.get('amount'))}</output>
						</td>
					</tr>
				).toArray()}
			</tbody>
			<tbody>
				<tr>
					<td><label htmlFor='subtotal'>Subtotal</label></td>
					<td colSpan='2'><output id='subtotal' className='amount'>{currency(this.props.subtotal)}</output></td>
				</tr>
				<tr>
					<td><label htmlFor='sales-tax'>Sales Tax</label></td>
					<td colSpan='2'><output id='sales-tax' className='amount'>{currency(this.props.tax)}</output></td>
				</tr>
				<tr>
					<td><label htmlFor='delivery-fee'>Delivery</label></td>
					<td colSpan='2'><input id='delivery-fee' className='currency' type='number' value={this.props.deliveryFee} onChange={updateIn([orderId, 'deliveryFee'])} /></td>
				</tr>
				<tr>
					<td><label htmlFor='other-fees'>Applicable Fees</label></td>
					<td colSpan='2'><input id='other-fees' className='currency' type='number' value={this.props.fees} onChange={updateIn([orderId, 'fees'])} /></td>
				</tr>
				<tr>
					<td><label className='print-big' htmlFor='total-price'>Total Price</label></td>
					<td colSpan='2'><output id='total-price' className='amount'>{currency(this.props.total)}</output></td>
				</tr>
			</tbody>
		</table>
	}
}

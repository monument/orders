import React from 'react'
let {PropTypes, Component} = React
import curry from 'lodash/function/curry'
import currency from './currency'

export default class OrderInfoBlock extends Component {
	static propTypes = {
		date: PropTypes.string.isRequired,
		balance: PropTypes.number.isRequired,
		status: PropTypes.oneOf([
			'quote',
			'layaway',
			'drawing-in-process',
			'design-approval-pending',
			'on-order',
			'engraving-bmc',
			'engraving-sasakwa',
			'final-customer-approval',
			'to-be-set',
		]).isRequired,
		actions: PropTypes.shape({
			updatePath: PropTypes.func.isRequired,
		}).isRequired,
		orderId: PropTypes.string.isRequired,
	}

	render() {
		const {orderId} = this.props
		const {updatePath} = this.props.actions
		const updateIn = curry(updatePath, 2)

		return <div className='order-info'>
			<input className='order-date' placeholder='mm/dd/yyyy' type='date' value={this.props.date} onChange={updateIn([orderId, 'date'])} />
			<output className='amount'>{currency(this.props.balance)}</output>
			<select className='order-status' value={this.props.status} onChange={updateIn([orderId, 'status'])}>
				<option value='quote'>Quote</option>
				<option value='layaway'>Layaway</option>
				<option value='drawing-in-process'>Drawing In-Process</option>
				<option value='design-approval-pending'>Design Approval Pending</option>
				<option value='on-order'>On Order</option>
				<option value='engraving-bmc'>Engraving @BMC</option>
				<option value='engraving-sasakwa'>Engraving @Sasakwa</option>
				<option value='final-customer-approval'>Final Customer Approval</option>
				<option value='to-be-set'>To Be Set</option>
			</select>
			<div className="control-buttons">
				<button onClick={(ev) => this.props.actions.clearOrder(orderId)}>Clear Form</button>
			</div>
		</div>
	}
}
// <button onClick={this.props.actions.sendToTrello}>Submit</button>

import React from 'react'
let {PropTypes, Component} = React

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
	}

	render() {
		return <div className='order-info'>
			<input className='order-date' placeholder='mm/dd/yyyy' type='date' defaultValue={this.props.date} />
			<output className='amount'>{this.props.balance}</output>
			<select className='order-status' defaultValue={this.props.status}>
				<option defaultValue='quote'>Quote</option>
				<option defaultValue='layaway'>Layaway</option>
				<option defaultValue='drawing-in-process'>Drawing In-Process</option>
				<option defaultValue='design-approval-pending'>Design Approval Pending</option>
				<option defaultValue='on-order'>On Order</option>
				<option defaultValue='engraving-bmc'>Engraving @BMC</option>
				<option defaultValue='engraving-sasakwa'>Engraving @Sasakwa</option>
				<option defaultValue='final-customer-approval'>Final Customer Approval</option>
				<option defaultValue='to-be-set'>To Be Set</option>
			</select>
		</div>
	}
}

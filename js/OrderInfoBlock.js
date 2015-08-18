import React from 'react'
let {PropTypes, Component} = React
import curry from 'lodash/function/curry'
import currency from './currency'

export default class OrderInfoBlock extends Component {
	static propTypes = {
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
			<div className='control-buttons'>
				<button onClick={(ev) => this.props.actions.clearOrder(orderId)}>Clear Form</button>
				<button onClick={(ev) => window.print()}>Print</button>
			</div>
		</div>
	}
}
// <button onClick={this.props.actions.sendToTrello}>Save</button>

import React, {PropTypes, Component} from 'react'

export default class OrderInfoBlock extends Component {
	static propTypes = {
		actions: PropTypes.shape({
			clearOrder: PropTypes.func.isRequired,
		}).isRequired,
		orderId: PropTypes.string.isRequired,
	}

	render() {
		return (
			<div className='order-info'>
				<div className='control-buttons'>
					<button onClick={() => this.props.actions.clearOrder(this.props.orderId)}>Clear Form</button>
					<button onClick={() => window.print()}>Print</button>
				</div>
			</div>
		)
	}
}
// <button onClick={this.props.actions.sendToTrello}>Save</button>

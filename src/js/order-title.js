import React, {PropTypes, Component} from 'react'
import curry from 'lodash/curry'

import moment from 'moment'

export default class OrderTitle extends Component {
	static propTypes = {
		actions: PropTypes.shape({
			updatePath: PropTypes.func.isRequired,
		}).isRequired,
		date: PropTypes.string.isRequired,
		orderId: PropTypes.string.isRequired,
		title: PropTypes.string.isRequired,
	}

	render() {
		const {updatePath} = this.props.actions
		const updateIn = curry(updatePath, 2)
		const {orderId} = this.props

		return (
			<div>
				<h1 className='title'>
					<input
						placeholder='Name on order'
						value={this.props.title}
						onChange={updateIn([orderId, 'title'])}
					/>
				</h1>
				<label className='order-date'>
					Date Ordered:
					<input
						placeholder='yyyy-mm-dd'
						value={this.props.date}
						onChange={updateIn([orderId, 'date'])}
					/>
				</label>
			</div>
		)
	}
}

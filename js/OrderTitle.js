import React from 'react'
let {PropTypes, Component} = React
import curry from 'lodash/function/curry'

export default class OrderTitle extends Component {
	static propTypes = {
		date: PropTypes.string.isRequired,
		orderId: PropTypes.string.isRequired,
		title: PropTypes.string.isRequired,
		actions: PropTypes.shape({
			updatePath: PropTypes.func.isRequired,
		}).isRequired,
	}

	render() {
		const {updatePath} = this.props.actions
		const updateIn = curry(updatePath, 2)
		const {orderId} = this.props

		return <div>
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
					placeholder='mm/dd/yyyy'
					type='date'
					value={this.props.date}
					onChange={updateIn([orderId, 'date'])}
				/>
			</label>
		</div>
	}
}

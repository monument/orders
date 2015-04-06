import React from 'react'
let {PropTypes, Component} = React
import curry from 'lodash/function/curry'

export default class OrderTitle extends Component {
	static propTypes = {
		title: PropTypes.string.isRequired,
		orderId: PropTypes.string.isRequired,
		actions: PropTypes.shape({
			updatePath: PropTypes.func.isRequired,
		}).isRequired,
	}

	render() {
		const {updatePath} = this.props.actions
		const updateIn = curry(updatePath, 2)
		const {orderId} = this.props

		return <div className="title">
			<h1>
				<input
					placeholder='Name on order'
					value={this.props.title}
					onChange={updateIn([orderId, 'title'])} />
			</h1>
		</div>
	}
}

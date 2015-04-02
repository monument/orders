import React from 'react'
let {PropTypes, Component} = React

export default class OrderTitle extends Component {
	static propTypes = {
		title: PropTypes.string.isRequired,
		orderId: PropTypes.string.isRequired,
		actions: PropTypes.shape({
			updateItem: PropTypes.func.isRequired,
		}).isRequired,
	}

	render() {
		const {updateItem} = this.props.actions
		const {orderId} = this.props
		return (<div className="title">
			<h1>Name on Order: <input value={this.props.title} onChange={(ev) => updateItem(orderId, 'title', ev.target.value)} /></h1>
		</div>)
	}
}

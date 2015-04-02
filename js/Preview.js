import React from 'react'
let {PropTypes, Component} = React

export default class Preview extends Component {
	static propTypes = {
		content: PropTypes.string.isRequired,
		orderId: PropTypes.string.isRequired,
		actions: PropTypes.shape({
			updateItem: PropTypes.func.isRequired,
		}).isRequired,
	}

	render() {
		const {updateItem} = this.props.actions
		const {orderId} = this.props
		return <div className="preview">
			<textarea value={this.props.content} onChange={(ev) => updateItem(orderId, 'preview', ev.target.value)} />
			<p className="print">
				Lettering other than above will be done for a charge at the rate
				prevailing at the time additional lettering is ordered.
			</p>
		</div>
	}
}

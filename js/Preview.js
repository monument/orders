import React from 'react'
let {PropTypes, Component} = React
import {curry} from 'lodash'

export default class Preview extends Component {
	static propTypes = {
		content: PropTypes.string.isRequired,
		orderId: PropTypes.string.isRequired,
		actions: PropTypes.shape({
			updatePath: PropTypes.func.isRequired,
		}).isRequired,
	}

	render() {
		const {updatePath} = this.props.actions
		const updateIn = curry(updatePath, 2)
		const {orderId} = this.props
		return (<div className="preview">
			<textarea value={this.props.content} onChange={updateIn([orderId, 'preview'])} />
			<p className="print">
				Lettering other than above will be done for a charge at the rate
				prevailing at the time additional lettering is ordered.
			</p>
		</div>)
	}
}

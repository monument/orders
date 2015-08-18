import React, {PropTypes, Component} from 'react'
import {curry} from 'lodash'
import Quill from 'react-quill-editor'

const toolbar = [
	{ label: 'Size', type: 'size', items: [
		{ label: 'Normal',  value: '1.0em' },
		{ label: 'Smaller', value: '0.8em' },
		{ label: 'Larger',  value: '1.4em' },
		{ label: 'Huge',    value: '2em' },
	]},

	{ label: 'Alignment', type: 'align', items: [
		{ label: 'Left',    value: 'left' },
		{ label: 'Center',  value: 'center' },
		{ label: 'Right',   value: 'right' },
		{ label: 'Justify', value: 'justify' },
	]},

	{ label: 'Text', type: 'group', items: [
		{ label: 'Bold',          type: 'bold' },
		{ label: 'Italic',        type: 'italic' },
	]},
]

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
		return (<div className='preview'>
			<Quill
				value={this.props.content || ''}
				onChange={updateIn([orderId, 'preview'])}
				toolbar={toolbar} />
			<p className='print'>
				Lettering other than above will be done for a charge at the rate
				prevailing at the time additional lettering is ordered.
			</p>
		</div>)
	}
}

import React, {PropTypes, Component} from 'react'

export default class NoteBox extends Component {
	static propTypes = {
		note: PropTypes.string,
		onChange: PropTypes.func.isRequired,
	}

	render() {
		return <textarea placeholder='Notes' className='note' value={this.props.note} onChange={this.props.onChange} />
	}
}

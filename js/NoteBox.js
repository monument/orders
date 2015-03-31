import React from 'react'
let {PropTypes, Component} = React

export default class NoteBox extends Component {
	static propTypes = {
		note: PropTypes.string,
		onChange: PropTypes.func,
	}

	render() {
		return <textarea className="note" value={this.props.note} />
	}
}

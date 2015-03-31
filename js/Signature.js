import React from 'react'
let {PropTypes, Component} = React

export default class Signature extends Component {
	static propTypes = {
		scribble: PropTypes.string,
	}

	render() {
		return <div>
			<input id="signature" readOnly defaultValue={this.props.scribble} />
			<label htmlFor="signature" style={{margin: '2px 0 0 3px'}}>Signature</label>
		</div>
	}
}

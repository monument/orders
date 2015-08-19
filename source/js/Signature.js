import React, {PropTypes, Component} from 'react'

export default class Signature extends Component {
	static propTypes = {
		scribble: PropTypes.string,
	}

	render() {
		return (
			<label>
				<input className='signature' readOnly value={this.props.scribble} />
				<span>Signature</span>
			</label>
		)
	}
}

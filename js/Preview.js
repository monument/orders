import React from 'react'
let {PropTypes, Component} = React

export default class Preview extends Component {
	static propTypes = {
		content: PropTypes.string.isRequired,
	}

	render() {
		return <div className="preview">
			<textarea defaultValue={this.props.content} />
			<p className="print">
				Lettering other than above will be done for a charge at the rate
				prevailing at the time additional lettering is ordered.
			</p>
		</div>
	}
}

import React from 'react'
let {PropTypes, Component} = React

export default class OrderTitle extends Component {
	static propTypes = {
		title: PropTypes.string.isRequired,
	}

	render() {
		return (<div className="title">
			<h1><input defaultValue={this.props.title} /></h1>
		</div>)
	}
}

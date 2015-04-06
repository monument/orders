import React from 'react'
let {PropTypes, createClass: ReactClass} = React

//export default class Signature extends Component {
//	static propTypes = {
//		scribble: PropTypes.string,
//	}
//
//	render() {
//		return <div>
//			<input id="signature" readOnly value={this.props.scribble} />
//			<label htmlFor="signature" style={{margin: '2px 0 0 3px'}}>Signature</label>
//		</div>
//	}
//}

let Signature = {}
Signature.propTypes = {
	scribble: PropTypes.string,
}
Signature.render = function() {
	return <label>
		<input className="signature" readOnly value={this.props.scribble}/>
		<span>Signature</span>
	</label>
}

const SignatureComponent = ReactClass(Signature)
export default SignatureComponent

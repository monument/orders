import React from 'react'
let {PropTypes, Component} = React
import Immutable from 'immutable'
import curry from 'lodash/function/curry'

export default class DetailsTable extends Component {
	static propTypes = {
		delivery: PropTypes.instanceOf(Immutable.Map).isRequired,
		design: PropTypes.instanceOf(Immutable.Map).isRequired,
		actions: PropTypes.shape({
			updatePath: PropTypes.func.isRequired,
		}).isRequired,
		orderId: PropTypes.string.isRequired,
	}

	render() {
		const {design, delivery} = this.props
		const {updatePath} = this.props.actions
		const {orderId} = this.props
		const updateIn = curry(updatePath, 2)

		return <div>
			<div className="details">
				<div className="delivery">
					<span>
						<label htmlFor="deliver-by">Deliver By</label>
						<input id="deliver-by" value={delivery.get('by')} type="date" onChange={updateIn([orderId, 'delivery', 'by'])} />
					</span>
					<span>
						<label htmlFor="deliver-to">Cemetery</label>
						<input id="deliver-to" value={delivery.get('to')} onChange={updateIn([orderId, 'delivery', 'to'])} />
					</span>
					<span>
						<label htmlFor="in-near">In/Near</label>
						<input id="in-near" value={delivery.get('near')} onChange={updateIn([orderId, 'delivery', 'near'])} />
					</span>
					<div className="cem-contact">
						<label>Name of contact to find grave</label>
						<input placeholder="Name" value={delivery.getIn(['contact', 'name'])} onChange={updateIn([orderId, 'delivery', 'contact', 'name'])} />
						<input placeholder="Phone" value={delivery.getIn(['contact', 'phone'])} onChange={updateIn([orderId, 'delivery', 'contact', 'phone'])} />
					</div>
					<div className="cem-location">
						<label>Location in cemetery</label>
						<input placeholder="Space(s)" value={delivery.get('spaces')} onChange={updateIn([orderId, 'delivery', 'spaces'])} />
						<input placeholder="Lot" value={delivery.get('lot')} onChange={updateIn([orderId, 'delivery', 'lot'])} />
						<input placeholder="Block" value={delivery.get('block')} onChange={updateIn([orderId, 'delivery', 'block'])} />
						<input placeholder="Section" value={delivery.get('section')} onChange={updateIn([orderId, 'delivery', 'section'])} />
					</div>
				</div>
			</div>
			<div className="design">
				<span><input placeholder="Design Name" value={design.get('designName')} onChange={updateIn([orderId, 'design', 'designName'])} /></span>
				<span>
					<label htmlFor="lettering-dir">Lettering Faces</label>
					<select id="lettering-dir" value={design.get('letteringDirection')} onChange={updateIn([orderId, 'design', 'letteringDirection'])}>
						<option value='unknown'>Unknown</option>
						<option value='north'>North</option>
						<option value='south'>South</option>
						<option value='east'>East</option>
						<option value='west'>West</option>
					</select>
				</span>
				<span>
					<label htmlFor="positions-verified">Positions Verified</label>
					<input id="positions-verified" type="checkbox" value={design.get('positionsVerified')} onChange={updateIn([orderId, 'design', 'positionsVerified'])} />
				</span>
				<span>
					<label htmlFor="name-on-left">Name on Left</label>
					<input id="name-on-left" type="text" value={design.get('nameOnLeft')} onChange={updateIn([orderId, 'design', 'nameOnLeft'])} />
				</span>
				<span>
					<label htmlFor="carving-type">Carving Type</label>
					<select id="carving-type" value={design.get('carvingType')} onChange={updateIn([orderId, 'design', 'carvingType'])}>
						<option value="flat">Flat</option>
						<option value="none">None</option>
						<option value="shape">Shape</option>
						<option value="etching">Etching</option>
					</select>
				</span>
				<span>
					<label htmlFor="name-on-back">Name on Back</label>
					<input id="name-on-back" type="checkbox" value={design.get('nameOnBack')} onChange={updateIn([orderId, 'design', 'nameOnBack'])} />
				</span>
				<span>
					<label htmlFor="special-artwork">Special Artwork</label>
					<input id="special-artwork" type="checkbox" value={design.get('specialArtwork')} onChange={updateIn([orderId, 'design', 'specialArtwork'])} />
				</span>
				<span>
					<label htmlFor="match-rubbing">Match Rubbing</label>
					<input id="match-rubbing" type="checkbox" value={design.get('matchRubbing')} onChange={updateIn([orderId, 'design', 'matchRubbing'])} />
				</span>
			</div>
		</div>
	}
}

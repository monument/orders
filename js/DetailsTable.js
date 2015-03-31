import React from 'react'
let {PropTypes, Component} = React
import Immutable from 'immutable'
import {Delivery, Design} from '../flux/OrderRecord'

export default class DetailsTable extends Component {
	static propTypes = {
		delivery: PropTypes.instanceOf(Delivery).isRequired,
		design: PropTypes.instanceOf(Design).isRequired
	}

	render() {
		let {design, delivery} = this.props

		return <div>
			<div className="details">
				<div className="delivery">
					<span><label htmlFor="deliver-by">Deliver By</label><input id="deliver-by" defaultValue={delivery.get('by')} type="date" /></span>
					<span><label htmlFor="deliver-to">Cemetery</label><input id="deliver-to" defaultValue={delivery.get('to')} /></span>
					<span><label htmlFor="in-near">In/Near</label><input id="in-near" defaultValue={delivery.get('near')} /></span>
					<div className="cem-contact">
						<label>Name of contact to find grave</label>
						<input placeholder="Name" defaultValue={delivery.get('contact').get('name')} /><input placeholder="Phone" defaultValue={delivery.get('contact').get('phone')} />
					</div>
					<div className="cem-location">
						<label>Location in cemetery</label>
						<input placeholder="Space(s)" defaultValue={delivery.get('spaces')} /><input placeholder="Lot" defaultValue={delivery.get('lot')} />
						<input placeholder="Block" defaultValue={delivery.get('block')} /><input placeholder="Section" defaultValue={delivery.get('section')} />
					</div>
				</div>
			</div>
			<div className="design">
				<span><input placeholder="Design Name" defaultValue={design.get('designName')} /></span>
				<span>
					<label htmlFor="lettering-dir">Lettering Faces</label>
					<select id="lettering-dir" defaultValue={design.get('letteringDirection')}>
						<option defaultValue='unknown'>Unknown</option>
						<option defaultValue='north'>North</option>
						<option defaultValue='south'>South</option>
						<option defaultValue='east'>East</option>
						<option defaultValue='west'>West</option>
					</select>
				</span>
				<span>
					<label htmlFor="positions-verified">Positions Verified</label>
					<input id="positions-verified" type="checkbox" defaultValue={design.get('positionsVerified')} />
				</span>
				<span>
					<label htmlFor="name-on-left">Name on Left</label>
					<input id="name-on-left" type="text" defaultValue={design.get('nameOnLeft')} />
				</span>
				<span>
					<label htmlFor="carving-type">Carving Type</label>
					<select id="carving-type" defaultValue={design.get('carvingType')}>
						<option defaultValue="flat">Flat</option>
						<option defaultValue="none">None</option>
						<option defaultValue="shape">Shape</option>
						<option defaultValue="etching">Etching</option>
					</select>
				</span>
				<span>
					<label htmlFor="name-on-back">Name on Back</label>
					<input id="name-on-back" type="checkbox" design={design.get('nameOnBack')} />
				</span>
				<span>
					<label htmlFor="special-artwork">Special Artwork</label>
					<input id="special-artwork" type="checkbox" defaultValue={design.get('specialArtwork')} />
				</span>
				<span>
					<label htmlFor="match-rubbing">Match Rubbing</label>
					<input id="match-rubbing" type="checkbox" defaultValue={design.get('matchRubbing')} />
				</span>
			</div>
		</div>
	}
}

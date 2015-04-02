import React from 'react'
let {PropTypes, Component} = React
import Immutable from 'immutable'
import {Delivery, Design} from '../flux/OrderRecord'

export default class DetailsTable extends Component {
	static propTypes = {
		delivery: PropTypes.instanceOf(Delivery).isRequired,
		design: PropTypes.instanceOf(Design).isRequired,
		actions: PropTypes.shape({
			updateDeliver: PropTypes.func.isRequired,
			updateDesign: PropTypes.func.isRequired,
		}).isRequired,
		orderId: PropTypes.string.isRequired,
	}

	render() {
		const {design, delivery} = this.props
		const {updateDesign, updateDeliver} = this.props.actions
		const {orderId} = this.props

		return <div>
			<div className="details">
				<div className="delivery">
					<span>
						<label htmlFor="deliver-by">Deliver By</label>
						<input id="deliver-by" value={delivery.by} type="date" onChange={(ev) => updateDeliver(orderId, 'by', ev.target.value)} />
					</span>
					<span>
						<label htmlFor="deliver-to">Cemetery</label>
						<input id="deliver-to" value={delivery.to} onChange={(ev) => updateDeliver(orderId, 'to', ev.target.value)} />
					</span>
					<span>
						<label htmlFor="in-near">In/Near</label>
						<input id="in-near" value={delivery.near} onChange={(ev) => updateDeliver(orderId, 'near', ev.target.value)} />
					</span>
					<div className="cem-contact">
						<label>Name of contact to find grave</label>
						<input placeholder="Name" value={delivery.contact.name} />
						<input placeholder="Phone" value={delivery.contact.phone} />
					</div>
					<div className="cem-location">
						<label>Location in cemetery</label>
						<input placeholder="Space(s)" value={delivery.spaces} onChange={(ev) => updateDeliver(orderId, 'spaces', ev.target.value)} />
						<input placeholder="Lot" value={delivery.lot} onChange={(ev) => updateDeliver(orderId, 'lot', ev.target.value)} />
						<input placeholder="Block" value={delivery.block} onChange={(ev) => updateDeliver(orderId, 'block', ev.target.value)} />
						<input placeholder="Section" value={delivery.section} onChange={(ev) => updateDeliver(orderId, 'section', ev.target.value)} />
					</div>
				</div>
			</div>
			<div className="design">
				<span><input placeholder="Design Name" value={design.designName} /></span>
				<span>
					<label htmlFor="lettering-dir">Lettering Faces</label>
					<select id="lettering-dir" value={design.letteringDirection}>
						<option value='unknown'>Unknown</option>
						<option value='north'>North</option>
						<option value='south'>South</option>
						<option value='east'>East</option>
						<option value='west'>West</option>
					</select>
				</span>
				<span>
					<label htmlFor="positions-verified">Positions Verified</label>
					<input id="positions-verified" type="checkbox" value={design.positionsVerified} />
				</span>
				<span>
					<label htmlFor="name-on-left">Name on Left</label>
					<input id="name-on-left" type="text" value={design.nameOnLeft} />
				</span>
				<span>
					<label htmlFor="carving-type">Carving Type</label>
					<select id="carving-type" value={design.carvingType}>
						<option value="flat">Flat</option>
						<option value="none">None</option>
						<option value="shape">Shape</option>
						<option value="etching">Etching</option>
					</select>
				</span>
				<span>
					<label htmlFor="name-on-back">Name on Back</label>
					<input id="name-on-back" type="checkbox" value={design.nameOnBack} />
				</span>
				<span>
					<label htmlFor="special-artwork">Special Artwork</label>
					<input id="special-artwork" type="checkbox" value={design.specialArtwork} />
				</span>
				<span>
					<label htmlFor="match-rubbing">Match Rubbing</label>
					<input id="match-rubbing" type="checkbox" value={design.matchRubbing} />
				</span>
			</div>
		</div>
	}
}

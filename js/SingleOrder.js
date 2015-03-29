import React from 'react'
let {PropTypes, Component} = React
// import {map, reduce, pluck} from 'lodash'
import OrderRecord from '../flux/OrderRecord'
import {Delivery, Design, Sale} from '../flux/OrderRecord'
import Immutable from 'immutable'

class OrderTitle extends Component {
	static propTypes = {
		title: PropTypes.string.isRequired,
	}

	render() {
		return (<div className="title">
			<h1><input defaultValue={this.props.title} /></h1>
		</div>)
	}
}

class PiecesTable extends Component {
	static propTypes = {
		addPiece: PropTypes.func.isRequired,
		delPiece: PropTypes.func.isRequired,
		pieces: PropTypes.instanceOf(Immutable.List).isRequired,
	}

	render() {
		return (<table className="material striped table">
			<caption>Materials <button onClick={this.props.addPiece}>(+)</button></caption>
			<thead>
				<tr>
					<th className="qty">Qty</th>
					<th className="part">Piece <button onClick={this.props.addPiece}>(+)</button></th>
					<th className="material">Material</th>
					<th className="kind">Description</th>
					<th className="dim" colSpan={3}>Dimensions <abbr title="Length / Width / Height">(L/W/H)</abbr></th>
					<th className="notes">Notes</th>
					<th className="cost">Cost</th>
					<th className="action add"><button onClick={this.props.addPiece}>[+]</button></th>
				</tr>
			</thead>
			<tbody>
				{this.props.pieces.map((piece, index) =>
					<tr key={index}>
						<td className="qty"><input className="qty" defaultValue={piece.qty} type="number" /></td>
						<td className="part"><input className="part" defaultValue={piece.part} list="part-list" /></td>
						<td className="material"><input className="material" defaultValue={piece.material} list="material-list" /></td>
						<td className="kind"><input className="kind" defaultValue={piece.kind} list="kind-list" /></td>
						<td className="dim length"><input className="length" defaultValue={piece.length} /></td>
						<td className="dim width"><input className="width" defaultValue={piece.width} /></td>
						<td className="dim height"><input className="height" defaultValue={piece.height} /></td>
						<td className="notes"><input className="notes" defaultValue={piece.notes} /></td>
						<td className="cost"><input className="cost" defaultValue={piece.amount} type="number" /></td>
						<td className="action delete"><button onClick={this.props.delPiece}>–</button></td>
					</tr>
				).toArray()}
			</tbody>
		</table>)
	}
}

class DetailsTable extends Component {
	static propTypes = {
		delivery: PropTypes.instanceOf(Delivery).isRequired,
		design: PropTypes.instanceOf(Design).isRequired
	}

	render() {
		let {design, delivery} = this.props

		return <div>
			<div className="details">
				<div className="delivery">
					<span><label htmlFor="deliver-by">Deliver By</label><input id="deliver-by" defaultValue={delivery.by} type="date" /></span>
					<span><label htmlFor="deliver-to">Cemetery</label><input id="deliver-to" defaultValue={delivery.to} /></span>
					<span><label htmlFor="in-near">In/Near</label><input id="in-near" defaultValue={delivery.near} /></span>
					<div className="cem-contact">
						<label>Name of contact to find grave</label>
						<input placeholder="Name" defaultValue={delivery.contact.name} /><input placeholder="Phone" defaultValue={delivery.contact.phone} />
					</div>
					<div className="cem-location">
						<label>Location in cemetery</label>
						<input placeholder="Space(s)" defaultValue={delivery.spaces} /><input placeholder="Lot" defaultValue={delivery.lot} />
						<input placeholder="Block" defaultValue={delivery.block} /><input placeholder="Section" defaultValue={delivery.section} />
					</div>
				</div>
			</div>
			<div className="design">
				<span><input placeholder="Design Name" defaultValue={design.designName} /></span>
				<span>
					<label htmlFor="lettering-dir">Lettering Faces</label>
					<select id="lettering-dir" defaultValue={design.letteringDirection}>
						<option defaultValue='unknown'>Unknown</option>
						<option defaultValue='north'>North</option>
						<option defaultValue='south'>South</option>
						<option defaultValue='east'>East</option>
						<option defaultValue='west'>West</option>
					</select>
				</span>
				<span>
					<label htmlFor="positions-verified">Positions Verified</label>
					<input id="positions-verified" type="checkbox" defaultValue={design.positionsVerified} />
				</span>
				<span>
					<label htmlFor="name-on-left">Name on Left</label>
					<input id="name-on-left" type="text" defaultValue={design.nameOnLeft} />
				</span>
				<span>
					<label htmlFor="carving-type">Carving Type</label>
					<select id="carving-type" defaultValue={design.carvingType}>
						<option defaultValue="flat">Flat</option>
						<option defaultValue="none">None</option>
						<option defaultValue="shape">Shape</option>
						<option defaultValue="etching">Etching</option>
					</select>
				</span>
				<span>
					<label htmlFor="name-on-back">Name on Back</label>
					<input id="name-on-back" type="checkbox" design={design.nameOnBack} />
				</span>
				<span>
					<label htmlFor="special-artwork">Special Artwork</label>
					<input id="special-artwork" type="checkbox" defaultValue={design.specialArtwork} />
				</span>
				<span>
					<label htmlFor="match-rubbing">Match Rubbing</label>
					<input id="match-rubbing" type="checkbox" defaultValue={design.matchRubbing} />
				</span>
			</div>
		</div>
	}
}

class Preview extends Component {
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

class OrderInfoBlock extends Component {
	static propTypes = {
		date: PropTypes.string.isRequired,
		balance: PropTypes.number.isRequired,
		status: PropTypes.oneOf([
			"quote",
			"layaway",
			"drawing-in-process",
			"design-approval-pending",
			"on-order",
			"engraving-bmc",
			"engraving-sasakwa",
			"final-customer-approval",
			"to-be-set",
		]).isRequired,
	}

	render() {
		return <div className="order-info">
			<input className="order-date" type="date" defaultValue={this.props.date} />
			<output className="amount">{this.props.balance}</output>
			<select className="order-status" defaultValue={this.props.status}>
				<option defaultValue="quote">Quote</option>
				<option defaultValue="layaway">Layaway</option>
				<option defaultValue="drawing-in-process">Drawing In-Process</option>
				<option defaultValue="design-approval-pending">Design Approval Pending</option>
				<option defaultValue="on-order">On Order</option>
				<option defaultValue="engraving-bmc">Engraving @BMC</option>
				<option defaultValue="engraving-sasakwa">Engraving @Sasakwa</option>
				<option defaultValue="final-customer-approval">Final Customer Approval</option>
				<option defaultValue="to-be-set">To Be Set</option>
			</select>
		</div>
	}
}

class CostsTable extends Component {
	static propTypes = {
		addCost: PropTypes.func.isRequired,
		delCost: PropTypes.func.isRequired,
		subtotal: PropTypes.number.isRequired,
		tax: PropTypes.number.isRequired,
		deliveryCharge: PropTypes.number.isRequired,
		applicableFees: PropTypes.number.isRequired,
		total: PropTypes.number.isRequired,
		costs: PropTypes.instanceOf(Immutable.List).isRequired,
	}

	render() {
		return <table className="table money" id="costs">
			<caption>Costs <button onClick={this.props.addCost}>(+)</button></caption>
			<tbody>
				{this.props.costs.map(({part, amount}, index) =>
					<tr className="cost" key={index}>
						<td><input list="part-list" placeholder="Part" defaultValue={part} /></td>
						<td><input type="number" defaultValue={amount || 0} /></td>
						<td className="action delete"><button onClick={this.props.delCost}>&nbsp;-&nbsp;</button></td>
					</tr>
				).toArray()}
			</tbody>
			<tbody>
				<tr>
					<td><label htmlFor="subtotal">Subtotal</label></td>
					<td><input id="subtotal" type="number" readOnly value={this.props.subtotal} /></td>
					<td />
				</tr>
				<tr>
					<td><label htmlFor="sales-tax">Sales Tax</label></td>
					<td><input id="sales-tax" type="number" readOnly value={this.props.tax} /></td>
					<td />
				</tr>
				<tr>
					<td><label htmlFor="delivery-fee">Delivery</label></td>
					<td><input id="delivery-fee" type="number" value={this.props.delivery} /></td>
					<td />
				</tr>
				<tr>
					<td><label htmlFor="other-fees">Applicable Fees</label></td>
					<td><input id="other-fees" type="number" value={this.props.fees} /></td>
					<td />
				</tr>
				<tr>
					<td><label className="print-big" htmlFor="total-price">Total Price</label></td>
					<td><input id="total-price" type="number" readOnly value={this.props.total} /></td>
					<td />
				</tr>
			</tbody>
		</table>
	}
}

let sum = (acc, n) => acc + n
let round = (n) => Math.round(n * 100) / 100

class PaymentsTable extends Component {
	static propTypes = {
		addPayment: PropTypes.func.isRequired,
		delPayment: PropTypes.func.isRequired,
		payments: PropTypes.instanceOf(Immutable.List).isRequired,
		paid: PropTypes.number.isRequired,
		balance: PropTypes.number.isRequired,
	}

	render() {
		return <table className="table money" id="payments">
			<caption>Payments <button onClick={this.props.addPayment}>(+)</button></caption>
			<tbody>
				{this.props.payments.map(({date, amount}, index) =>
					<tr key={index}>
						<td><input placeholder="MM/DD/YYYY" type="date" required defaultValue={date} /></td>
						<td><input className="amountPaid" type="number" defaultValue={amount || 0} /></td>
						<td className="action delete"><button onClick={this.props.delPayment}>&nbsp;-&nbsp;</button></td>
					</tr>
				).toArray()}
			</tbody>
			<tfoot>
				<tr>
					<td><label htmlFor="amount-paid">Amount Paid</label></td>
					<td><input id="amount-paid" readOnly className="amountPaid" type="number" defaultValue={this.props.paid} /></td>
					<td />
				</tr>
				<tr>
					<td><label className="print-big" htmlFor="balance-due">Balance Due</label></td>
					<td><input id="balance-due" readOnly className="amount" type="number" defaultValue={this.props.balance} /></td>
					<td />
				</tr>
			</tfoot>
		</table>
	}
}

class ContactTable extends Component {
	static propTypes = {
		sale: PropTypes.instanceOf(Sale)
	}

	render() {
		let {sale} = this.props
		return <table id="contact" className="table">
			<caption>Contact</caption>
			<tbody>
				<tr><td colSpan={3}><input placeholder="Name" defaultValue={sale.name} /></td></tr>
				<tr><td colSpan={3}><input placeholder="Phone" type="tel" defaultValue={sale.phone} /></td></tr>
				<tr><td colSpan={3}><input placeholder="Email" type="email" defaultValue={sale.email} /></td></tr>
				<tr><td colSpan={3}><input placeholder="Street" type="text" defaultValue={sale.street} /></td></tr>
				<tr>
					<td style={{width: '50%'}}><input placeholder="City" defaultValue={sale.city} /></td>
					<td><input placeholder="State" defaultValue={sale.state} /></td>
					<td><input placeholder="Zip" defaultValue={sale.zip} /></td>
				</tr>
				<tr>
					<td colSpan={3}><input placeholder="Sold By" list="reps" defaultValue={sale.soldBy} /></td>
				</tr>
			</tbody>
		</table>
	}
}

class NoteBox extends Component {
	static propTypes = {
		note: PropTypes.string,
	}

	render() {
		return <textarea className="note" defaultValue={this.props.note} />
	}
}

class Signature extends Component {
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

let actions = {
	addPiece() {},
	delPiece() {},
	addCost() {},
	delCost() {},
	addPayment() {},
	delPayment() {},
}

export default class SingleOrder extends Component {
	static propTypes = {
		order: PropTypes.instanceOf(OrderRecord),
	}

	render() {
		let {order} = this.props
		console.log(this.props)

		let costs = order.costs.map(c => c.amount).reduce(sum, 0)
		let pieces = order.pieces.map(piece => piece.amount * piece.qty)
		let subtotal = costs + pieces.reduce(sum, 0)
		let tax = subtotal * 0.08157
		let total = subtotal + tax + order.delivery + order.fees
		let paid = order.payments.map(p => p.amount).reduce(sum, 0)
		let balance = round(total - paid)

		return <div className="order">
			<div className="main">
				<OrderTitle title={order.title} />
				<PiecesTable
					pieces={order.pieces}
					addPiece={actions.addPiece}
					delPiece={actions.delPiece} />
				<DetailsTable
					delivery={order.deliver}
					design={order.design} />

				<Preview content={order.preview} />
				<footer><input /></footer>
			</div>

			<aside className="sidebar">
				<OrderInfoBlock
					date={order.date}
					balance={balance}
					status={order.status} />
				<CostsTable
					subtotal={subtotal}
					tax={tax}
					deliveryCharge={order.delivery}
					applicableFees={order.fees}
					total={total}
					costs={order.costs}
					addCost={actions.addCost}
					delCost={actions.delCost} />
				<PaymentsTable
					payments={order.payments}
					balance={balance}
					paid={paid}
					addPayment={actions.addPayment}
					delPayment={actions.delPayment} />

				<NoteBox note={order.note} />
				<ContactTable sale={order.sale} />
				<Signature scribble={order.sale.signature} />
			</aside>
		</div>
	}
}

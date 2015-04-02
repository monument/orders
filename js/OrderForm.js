import React from 'react'
const {PropTypes, Component} = React
import Immutable from 'immutable'
import Order from '../flux/OrderRecord'

import OrderTitle from './OrderTitle'
import PiecesTable from './PiecesTable'
import DetailsTable from './DetailsTable'
import Preview from './Preview'
import OrderInfoBlock from './OrderInfoBlock'
import CostsTable from './CostsTable'
import PaymentsTable from './PaymentsTable'
import ContactTable from './ContactTable'
import NoteBox from './NoteBox'
import Signature from './Signature'

import sum from './sum'
import round from './round'


export default class OrderForm extends Component {
	static propTypes = {
		order: PropTypes.instanceOf(Order),
		actions: PropTypes.object.isRequired,
	}

	render() {
		const {order, actions} = this.props
		console.log(this.props)

		const costs = order.costs.map(c => c.amount).reduce(sum, 0)
		const pieces = order.pieces.map(piece => piece.amount * piece.qty)
		const subtotal = costs + pieces.reduce(sum, 0)
		const tax = round(subtotal * 0.08157)
		const total = subtotal + tax + order.delivery + order.fees
		const paid = order.payments.map(p => p.amount).reduce(sum, 0)
		const balance = round(total - paid)

		return <div className="order">
			<div className="main">
				<OrderTitle orderId={order.id} actions={actions}
					title={order.title} />
				<PiecesTable orderId={order.id} actions={actions}
					pieces={order.pieces} />
				<DetailsTable orderId={order.id} actions={actions}
					delivery={order.deliver}
					design={order.design} />

				<Preview content={order.preview} orderId={order.id} actions={actions} />
				<footer><input /></footer>
			</div>

			<aside className="sidebar">
				<OrderInfoBlock orderId={order.id} actions={actions}
					date={order.date}
					balance={balance}
					status={order.status} />
				<CostsTable orderId={order.id} actions={actions}
					subtotal={subtotal}
					tax={tax}
					deliveryCharge={order.delivery}
					applicableFees={order.fees}
					total={total}
					costs={order.costs} />
				<PaymentsTable orderId={order.id} actions={actions}
					payments={order.payments}
					balance={balance}
					paid={paid} />

				<NoteBox note={order.note} onChange={(ev) => actions.updateItem(order.id, 'note', ev.target.value)} />
				<ContactTable orderId={order.id} actions={actions}
					sale={order.sale} />
				<Signature scribble={order.sale.signature} />
			</aside>
		</div>
	}
}

import React, {PropTypes, Component} from 'react'
import Immutable from 'immutable'

import OrderTitle from './order-title'
import PiecesTable from './pieces-table'
import DetailsTable from './details-table'
import Preview from './preview'
import OrderInfoBlock from './order-info-block'
import CostsTable from './costs-table'
import PaymentsTable from './payments-table'
import ContactTable from './contact-table'
import NoteBox from './note-box'
import Signature from './signature'

import add from 'lodash/add'

import {OrderRecord} from '../flux/order-record'

export default class OrderForm extends Component {
	static propTypes = {
		actions: PropTypes.object.isRequired,
		order: PropTypes.instanceOf(OrderRecord),
	}

	render() {
		const {order, actions} = this.props
		// console.log(this.props)

		const costs = order.get('costs')
			.map(c => c.get('amount'))
			.map(parseFloat)
			.reduce(add, 0)

		const pieces = order.get('pieces')
			.map(piece => parseFloat(piece.get('amount')) * parseInt(piece.get('qty')))
			.reduce(add, 0)

		const subtotal = costs + pieces
		const tax = subtotal * 0.08517
		const deliveryFee = parseFloat(order.get('deliveryFee'))
		const otherFees = parseFloat(order.get('fees'))
		const total = subtotal + tax + deliveryFee + otherFees

		const paid = order.get('payments')
			.map(p => p.get('amount'))
			.map(parseFloat)
			.reduce(add, 0)

		const balance = total - paid

		const id = order.get('id')

		return (
			<div className='order'>
				<div className='main'>
					<OrderTitle orderId={id} actions={actions}
						date={order.get('date')}
						title={order.get('title')} />
					<PiecesTable orderId={id} actions={actions}
						pieces={order.get('pieces')} />
					<DetailsTable orderId={id} actions={actions}
						delivery={order.get('delivery')}
						design={order.get('design')} />

					<Preview content={order.get('preview')} orderId={id} actions={actions} />
					<footer><input /></footer>
				</div>

				<aside className='sidebar'>
					<OrderInfoBlock
						orderId={id}
						actions={actions} />
					<CostsTable
						orderId={id}
						actions={actions}
						subtotal={subtotal}
						tax={tax}
						deliveryFee={order.get('deliveryFee')}
						fees={order.get('fees')}
						total={total}
						costs={order.get('costs')}
						pieces={order.get('pieces')} />
					<PaymentsTable
						orderId={id}
						actions={actions}
						payments={order.get('payments')}
						balance={balance}
						paid={paid} />

					<NoteBox note={order.get('note')} onChange={ev => actions.updatePath([id, 'note'], ev)} />
					<ContactTable orderId={id} actions={actions}
						sale={order.get('sale')} />
					<Signature scribble={order.get('sale').get('signature')} />
				</aside>
			</div>
		)
	}
}

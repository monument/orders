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

import add from 'lodash/math/add'

export default class OrderForm extends Component {
	static propTypes = {
		order: PropTypes.instanceOf(Immutable.Map),
		actions: PropTypes.object.isRequired,
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
		const tax = subtotal * 0.08157
		const deliveryFee = parseFloat(order.get('deliveryFee'))
		const otherFees = parseFloat(order.get('fees'))
		const total = subtotal + tax + deliveryFee + otherFees

		const paid = order.get('payments')
			.map(p => p.get('amount'))
			.map(parseFloat)
			.reduce(add, 0)

		const balance = total - paid

		const id = order.get('id')

		return <div className='order'>
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

				<NoteBox note={order.get('note')} onChange={(ev) => actions.updatePath([id, 'note'], ev)} />
				<ContactTable orderId={id} actions={actions}
					sale={order.get('sale')} />
				<Signature scribble={order.get('sale').get('signature')} />
			</aside>
		</div>
	}
}

import React from 'react'
import OrderForm from './OrderForm'
import sampleOrder from './example-order.json'
import FluxComponent from 'flummox/component'
import mapValues from 'lodash/object/mapValues'

export default class App extends React.Component {
	render() {
		return (<div className='app'>
			<header className='bmlogo'>
				<img src='./img/bmcheader.png' />
			</header>
			<FluxComponent
				flux={this.props.flux}
				connectToStores={['orders']}
				render={(storeState) => {
					let actions = this.props.flux.getActions('orders')
					return <OrderForm
						order={storeState.orders.first()}
						actions={actions}
					/>
				}}>
			</FluxComponent>
		</div>)
	}
}

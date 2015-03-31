import React from 'react'
import OrderForm from './OrderForm'
import sampleOrder from './example-order.json'
import FluxComponent from 'flummox/component'

export default class App extends React.Component {
	render() {
		return (<div className='app'>
			<header className='bmlogo'>
				<img src='./img/bmcheader.png' />
			</header>
			<FluxComponent
				flux={this.props.flux}
				connectToStores={['orders']}
				render={(storeState) =>
					<OrderForm
						order={storeState.orders.first()}
						actions={this.props.flux.getActions('orders')}
					/>
				}>
			</FluxComponent>
		</div>)
	}
}

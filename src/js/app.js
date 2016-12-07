import React, {Component, PropTypes} from 'react'
import OrderForm from './order-form'
import FluxComponent from 'flummox/component'

export default class App extends Component {
	static propTypes = {
		flux: PropTypes.object.isRequired,
	}
	render() {
		return (
			<div className='app'>
				<header className='bmlogo'>
					<img src='source/images/bmcheader.png' role="presentation" />
				</header>
				<FluxComponent
					flux={this.props.flux}
					connectToStores={['orders']}
					render={storeState => <OrderForm order={storeState.orders.first()} actions={this.props.flux.getActions('orders')} />}
				/>
			</div>
		)
	}
}

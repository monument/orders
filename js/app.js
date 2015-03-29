import React from 'react'
import SingleOrder from './singleOrder'
import sampleOrder from './example-order.json'
import FluxComponent from 'flummox/component'

export default class App extends React.Component {
	render() {
		return (<div className='app'>
			<header className="bmlogo">
				<img src="./img/bmcheader.png" />
			</header>
			<FluxComponent
				flux={this.props.flux}
				connectToStores={['orders']}
				render={(storeState) =>
					<SingleOrder order={storeState.orders.first()} />
				}>
			</FluxComponent>
		</div>)
	}
}

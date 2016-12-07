import React from 'react'
import ReactDOM from 'react-dom'

import App from './js/app'
import OrderFlux from './flux/order-flux'

import debounce from 'lodash/debounce'

let Flux = new OrderFlux()

const oldData = localStorage.getItem('fluxxor-state')
if (oldData) {
	Flux.deserialize(oldData)
}

if (!Flux.getStore('orders').state.orders || !Flux.getStore('orders').state.orders.size) {
	Flux.getActions('orders').createOrder({})
}

let saveState = () => localStorage.setItem('fluxxor-state', Flux.serialize())
Flux.getStore('orders').addListener('change', debounce(saveState, 1000))

function run() {
    ReactDOM.render(<App flux={Flux} />, document.querySelector('#root'))
}
if (!global.Intl) {
    require.ensure([
        'intl',
        'intl/locale-data/jsonp/en.js'
    ], function (require) {
        require('intl');
        require('intl/locale-data/jsonp/en.js');
        run()
    })
} else {
    run()
}

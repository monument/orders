import React from 'react'

import App from './js/app'
import OrderFlux from './flux/OrderFlux'

import throttle from 'lodash/function/throttle'

let Flux = new OrderFlux()

const oldData = localStorage.getItem('fluxxor-state')
if (oldData)
	Flux.deserialize(oldData)
else
	Flux.getActions('orders').createOrder({})

function saveState() {
	localStorage.setItem('fluxxor-state', Flux.serialize())
}

Flux.getStore('orders').addListener('change', throttle(saveState, 500))

///
React.render(<App flux={Flux} />, document.querySelector('.app'))
///

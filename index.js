import React from 'react'

import App from './js/app'
import OrderFlux from './flux/OrderFlux'

let Flux = new OrderFlux()
Flux.getActions('orders').createOrder({})
window.acts = Flux.getActions('orders')

React.render(<App flux={Flux} />, document.querySelector('.app'))

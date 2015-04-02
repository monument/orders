import React from 'react'
let {PropTypes, Component} = React
import Immutable from 'immutable'
import {partial} from 'lodash'

export default class PiecesTable extends Component {
	static propTypes = {
		addPiece: PropTypes.func.isRequired,
		removePiece: PropTypes.func.isRequired,
		updatePiece: PropTypes.func.isRequired,
		orderId: PropTypes.string.isRequired,
		pieces: PropTypes.instanceOf(Immutable.List).isRequired,
	}

	render() {
		const {addPiece, removePiece, updatePiece} = this.props
		const {orderId} = this.props
		return <table className="material striped table">
			<caption>Materials <button onClick={() => addPiece(orderId)}>+</button></caption>
			<thead>
				<tr>
					<th className="qty">Qty</th>
					<th className="part">Piece</th>
					<th className="material">Material</th>
					<th className="kind">Description</th>
					<th className="dim" colSpan={3}>Dimensions <abbr title="Length / Width / Height">(L/W/H)</abbr></th>
					<th className="notes">Notes</th>
					<th className="cost">Cost</th>
					<th className="action add"><button onClick={() => addPiece(orderId)}>+</button></th>
				</tr>
			</thead>
			<tbody>
				{this.props.pieces.map((piece, index) => {
					let editPiece = partial(updatePiece, orderId, index)
					return <tr key={index}>
						<td className="qty">
							<input value={piece.qty} type="number" onChange={(ev) => editPiece({qty: parseInt(ev.target.value)})} />
						</td>
						<td className="part">
							<input value={piece.part} list="part-list" onChange={(ev) => editPiece({part: ev.target.value})} />
						</td>
						<td className="material">
							<input value={piece.material} list="material-list" onChange={(ev) => editPiece({material: ev.target.value})} />
						</td>
						<td className="kind">
							<input value={piece.kind} list="kind-list" onChange={(ev) => editPiece({kind: ev.target.value})} />
						</td>
						<td className="dim length">
							<input value={piece.length} onChange={(ev) => editPiece({length: ev.target.value})} />
						</td>
						<td className="dim width">
							<input value={piece.width} onChange={(ev) => editPiece({width: ev.target.value})} />
						</td>
						<td className="dim height">
							<input value={piece.height} onChange={(ev) => editPiece({height: ev.target.value})} />
						</td>
						<td className="notes">
							<input value={piece.notes} onChange={(ev) => editPiece({notes: ev.target.value})} />
						</td>
						<td className="cost">
							<input value={piece.amount} type="number" onChange={(ev) => editPiece({amount: parseFloat(ev.target.value)})} />
						</td>
						<td className="action delete">
							<button onClick={() => removePiece(orderId, index)}>–</button>
						</td>
					</tr>
				}).toArray()}
			</tbody>
		</table>
	}
}

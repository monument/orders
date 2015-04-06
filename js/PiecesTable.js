import React from 'react'
let {PropTypes, Component} = React
import Immutable from 'immutable'
import {partial} from 'lodash'

export default class PiecesTable extends Component {
	static propTypes = {
		actions: PropTypes.shape({
			addPiece: PropTypes.func.isRequired,
			removePiece: PropTypes.func.isRequired,
			updatePiece: PropTypes.func.isRequired,
		}).isRequired,
		orderId: PropTypes.string.isRequired,
		pieces: PropTypes.instanceOf(Immutable.List).isRequired,
	}

	render() {
		const {addPiece, removePiece, updatePiece} = this.props.actions
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
							<input
								type="number"
								value={piece.get('qty')}
								onChange={(ev) => editPiece({qty: parseInt(ev.target.value)})} />
						</td>
						<td className="part">
							<input
								list="part-list"
								value={piece.get('part')}
								onChange={(ev) => editPiece({part: ev.target.value})} />
						</td>
						<td className="material">
							<input
								list="material-list"
								value={piece.get('material')}
								onChange={(ev) => editPiece({material: ev.target.value})} />
						</td>
						<td className="kind">
							<input
								list="kind-list"
								value={piece.get('kind')}
								onChange={(ev) => editPiece({kind: ev.target.value})} />
						</td>
						<td className="dim length">
							<input
								value={piece.get('length')}
								onChange={(ev) => editPiece({length: ev.target.value})} />
						</td>
						<td className="dim width">
							<input
								value={piece.get('width')}
								onChange={(ev) => editPiece({width: ev.target.value})} />
						</td>
						<td className="dim height">
							<input
								value={piece.get('height')}
								onChange={(ev) => editPiece({height: ev.target.value})} />
						</td>
						<td className="notes">
							<input
								value={piece.get('notes')}
								onChange={(ev) => editPiece({notes: ev.target.value})} />
						</td>
						<td className="cost">
							<input
								type="number"
								value={piece.get('amount')}
								onChange={(ev) => editPiece({amount: ev.target.value})} />
						</td>
						<td className="action delete">
							<button onClick={() => removePiece(orderId, index)}>
								–
							</button>
						</td>
					</tr>
				}).toArray()}
			</tbody>
		</table>
	}
}

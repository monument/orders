import React from 'react'
let {PropTypes, Component} = React
import Immutable from 'immutable'

export default class PiecesTable extends Component {
	static propTypes = {
		addPiece: PropTypes.func.isRequired,
		// delPiece: PropTypes.func.isRequired,
		pieces: PropTypes.instanceOf(Immutable.List).isRequired,
	}

	render() {
		return (<table className="material striped table">
			<caption>Materials <button onClick={(ev) => this.props.addPiece(this.props.orderId)}>(+)</button></caption>
			<thead>
				<tr>
					<th className="qty">Qty</th>
					<th className="part">Piece <button onClick={this.props.addPiece}>(+)</button></th>
					<th className="material">Material</th>
					<th className="kind">Description</th>
					<th className="dim" colSpan={3}>Dimensions <abbr title="Length / Width / Height">(L/W/H)</abbr></th>
					<th className="notes">Notes</th>
					<th className="cost">Cost</th>
					<th className="action add"><button onClick={this.props.addPiece}>[+]</button></th>
				</tr>
			</thead>
			<tbody>
				{this.props.pieces.map((piece, index) =>
					<tr key={index}>
						<td className="qty"><input className="qty" defaultValue={piece.qty} type="number" /></td>
						<td className="part"><input className="part" defaultValue={piece.part} list="part-list" /></td>
						<td className="material"><input className="material" defaultValue={piece.material} list="material-list" /></td>
						<td className="kind"><input className="kind" defaultValue={piece.kind} list="kind-list" /></td>
						<td className="dim length"><input className="length" defaultValue={piece.length} /></td>
						<td className="dim width"><input className="width" defaultValue={piece.width} /></td>
						<td className="dim height"><input className="height" defaultValue={piece.height} /></td>
						<td className="notes"><input className="notes" defaultValue={piece.notes} /></td>
						<td className="cost"><input className="cost" defaultValue={piece.amount} type="number" /></td>
						<td className="action delete"><button onClick={this.props.delPiece}>–</button></td>
					</tr>
				).toArray()}
			</tbody>
		</table>)
	}
}

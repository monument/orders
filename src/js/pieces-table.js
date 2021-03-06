import React, {PropTypes, Component} from 'react'
import Immutable from 'immutable'
import curry from 'lodash/curry'

export default class PiecesTable extends Component {
	static propTypes = {
		actions: PropTypes.shape({
			addPiece: PropTypes.func.isRequired,
			removePiece: PropTypes.func.isRequired,
			updatePath: PropTypes.func.isRequired,
		}).isRequired,
		orderId: PropTypes.string.isRequired,
		pieces: PropTypes.instanceOf(Immutable.List).isRequired,
	}

	render() {
		const {addPiece, removePiece, updatePath} = this.props.actions
		const {orderId} = this.props
		const updateIn = curry(updatePath, 2)

		return (
			<table className='material striped table'>
				<caption>Pieces</caption>
				<thead>
					<tr>
						<th className='qty'>Qty</th>
						<th className='piece'>Piece</th>
						<th className='material'>Material</th>
						<th className='kind'>Description</th>
						<th className='dim' colSpan={3}>Dimensions</th>
						<th className='cost'>Cost</th>
						<th className='action add'></th>
					</tr>
				</thead>
				<tbody>
					{this.props.pieces.map((piece, index) =>
						<tr key={index}>
							<td className='qty'>
								<input
									type='number'
									min='1'
									value={piece.get('qty')}
									onChange={updateIn([orderId, 'pieces', index, 'qty'])}
								/>
							</td>
							<td className='piece'>
								<input
									value={piece.get('piece')}
									onChange={updateIn([orderId, 'pieces', index, 'piece'])}
								/>
							</td>
							<td className='material'>
								<input
									value={piece.get('material')}
									onChange={updateIn([orderId, 'pieces', index, 'material'])}
								/>
							</td>
							<td className='description'>
								<input
									value={piece.get('description')}
									onChange={updateIn([orderId, 'pieces', index, 'description'])}
								/>
							</td>
							<td className='dim length'>
								<input
									placeholder='L'
									value={piece.get('length')}
									onChange={updateIn([orderId, 'pieces', index, 'length'])}
								/>
							</td>
							<td className='dim width'>
								<input
									placeholder='W'
									value={piece.get('width')}
									onChange={updateIn([orderId, 'pieces', index, 'width'])}
								/>
							</td>
							<td className='dim height'>
								<input
									placeholder='H'
									value={piece.get('height')}
									onChange={updateIn([orderId, 'pieces', index, 'height'])}
								/>
							</td>
							<td className='cost'>
								<input
									className='currency'
									type='number'
									min='0'
									value={piece.get('amount')}
									onChange={updateIn([orderId, 'pieces', index, 'amount'])}
								/>
							</td>
							<td className='action delete'>
								<button onClick={() => removePiece(orderId, index)}>
									–
								</button>
							</td>
						</tr>)
					.toArray()}
				</tbody>
				<tfoot>
					<tr>
						<td colSpan='10' className='add-piece'>
							<button onClick={() => addPiece(orderId)}>Add Piece</button>
						</td>
					</tr>
				</tfoot>
			</table>
		)
	}
}

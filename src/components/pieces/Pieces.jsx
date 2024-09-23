import './Pieces.css'
import Piece from './Piece.jsx'
import { useState, useRef } from 'react'
import { createPosition, copyPosition } from '../../helper.jsx'
import { useAppContext } from '../../contexts/Context.jsx'
import { makeNewMove,clearPos } from '../../reducer/actions/move.jsx'
import { disableCastle } from '../../reducer/actions/pipe.jsx'
import engine from '../../engine/engine.jsx'
import { promotionPop } from '../../reducer/actions/popup.jsx'

const Pieces = () => {

    const ref = useRef()

    const {appState, dispatch} = useAppContext()

    const currentPosition = appState.position[appState.position.length-1]

    const movecalc = e => {
        const {width, left, top} = ref.current.getBoundingClientRect()
        const size = width / 8
        const y = Math.floor((e.clientX - left) / size)
        const x = 7 - Math.floor((e.clientY - top) / size)
        return {x, y}
    }

    const popPromotionUp = ({row, column, x, y}) =>{
        dispatch(promotionPop({
            row : Number(row), 
            column : Number(column), 
            x, 
            y
        }))
    }

    const mew = e => {
        const {x, y} = movecalc(e)
        const [piece , row, column] = e.dataTransfer.getData('text').split(',')
        if(appState.posMoves.find(m => m[0] === x && m[1] ===y)){
            if((piece == 'wp' && x === 7) || (piece === 'bp' && x ===0)){
                popPromotionUp({row, column, x, y})
                return 
            }
            const newPosition = engine.move({
                pos : currentPosition,
                piece , row, column,
                x, y
            })
            if(piece.endsWith('k')) dispatch(disableCastle({kind : 'none'}))
            if(piece.endsWith('r') && column === 7) dispatch(disableCastle({kind : 'l'}))
            if(piece.endsWith('r') && column === 0) dispatch(disableCastle({kind : 'r'}))
            dispatch(makeNewMove({newPosition}))
        }
        dispatch(clearPos())
    }

    const onDrop = e => {
        e.preventDefault()
        mew(e)
    }


    const onDragOver = e => {
        e.preventDefault()
    }

    return <div 
        ref={ref}
        className='pieces'
        onDrop={onDrop}
        onDragOver={onDragOver}
    >
        {currentPosition.map((r, row) =>
            r.map((c, column) => 
                currentPosition[row][column]
                ? <Piece
                    key={row + ' ' + column}
                    row = {row}
                    column = {column}
                    piece = {currentPosition[row][column]}
                />
                :null
        )
    )}
    </div>
}


export default Pieces
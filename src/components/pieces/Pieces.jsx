import './Pieces.css'
import Piece from './Piece.jsx'
import { useState, useRef } from 'react'
import { createPosition, copyPosition } from '../../helper.jsx'
import { useAppContext } from '../../contexts/Context.jsx'
import { makeNewMove } from '../../reducer/actions/move.jsx'

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

    const onDrop = e => {
        const newPosition = copyPosition(currentPosition)
        const [p, rank, file] = e.dataTransfer.getData('text').split(',')
        const {x, y} = movecalc(e)
        
        newPosition[Number(rank)][Number(file)] = ''
        newPosition[x][y] = p

        dispatch(makeNewMove({newPosition}))

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
        {currentPosition.map((r, rank) =>
            r.map((f, file) => 
                currentPosition[rank][file]
                ? <Piece
                    key={rank + ' ' + file}
                    rank = {rank}
                    file = {file}
                    piece = {currentPosition[rank][file]}
                />
                :null
        )
    )}
    </div>
}


export default Pieces
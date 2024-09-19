
export const getCharacter = file => String.fromCharCode(file+96)

export const createPosition = () => {
    const position = new Array(8).fill('').map(x => new Array(8).fill(''))

    for (let i = 0; i < 8; i++){
        position[1][i] = 'wp'
        position[6][i] = 'bp'
    }

    position[0][0] = position[0][7] = 'wr'
    position[0][1] = position[0][6] = 'wn'
    position[0][2] = position[0][5] = 'wb'
    position[0][3] = 'wq'
    position[0][4] = 'wk'

    position[7][0] = position[7][7] = 'br'
    position[7][1] = position[7][6] = 'bn'
    position[7][2] = position[7][5] = 'bb'
    position[7][3] = 'bq'
    position[7][4] = 'bk'

    return position

}

export const copyPosition = (position) => {
    const newposition = new Array(8).fill('').map(x => new Array(8).fill(''))

    for(let rank = 0; rank < 8; rank++){
        for(let file =0; file < 8;file++){
            newposition[rank][file] = position[rank][file]
        }
    }
    return newposition
}
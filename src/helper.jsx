
export const getCharacter = column => String.fromCharCode(column+96)

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

export const createBlackTurnPosition = () => {
    const position = new Array(8).fill('').map(x => new Array(8).fill(''))

    for (let i = 0; i < 8; i++){
        position[1][i] = 'wp'
        position[6][i] = 'bp'
    }
    position[1][4] = ''
    position[3][4] = 'wp'
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

    for(let row = 0; row < 8; row++){
        for(let column =0; column < 8;column++){
            newposition[row][column] = position[row][column]
        }
    }
    return newposition
}
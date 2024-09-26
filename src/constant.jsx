import { createPosition } from "./helper"

export const Status = {
    'ongoing' : 'Ongoing',
    'promote' : 'Promote',
    'white_won' : 'White_won',
    'black_won' : 'Black_won',
    'stalemate' : 'Stalemate',
    'insuffisient' : 'Insuffisient',
    'settingup' : 'Settingup'
}

export const initGameState = {
    position : [createPosition()],
    turn : 'w',
    posMoves : [],
    status : Status.settingup,
    promotingLocation : null,
    allowedCastle: {
        w : 'lr',
        b : 'lr'
    },
    flipped : false
}
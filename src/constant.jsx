import { createPosition } from "./helper"

export const Status = {
    'ongoing' : 'Ongoing',
    'promote' : 'Promote',
    'white_won' : 'White_won',
    'black_won' : 'Black_won'
}

export const initGameState = {
    position : [createPosition()],
    turn : 'w',
    posMoves : [],
    status : Status.ongoing,
    promotingLocation : null,
    allowedCastle: {
        w : 'lr',
        b : 'lr'
    }
}
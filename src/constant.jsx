import { createBlackTurnPosition, createPosition } from "./helper"

export const Status = {
    'ongoing' : 'Ongoing',
    'promote' : 'Promote',
    'white_won' : 'White_won',
    'black_won' : 'Black_won',
    'stalemate' : 'Stalemate',
    'insuffisient' : 'Insuffisient',
    'settingup' : 'Settingup'
}

export const Mode = {
    'pass_and_play' : 'Pass_and_play',
    'play_as_white' : 'Play_ as_white',
    'play_as_black' : 'Play_as_black'
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
    flipped : false,
    mode : Mode.pass_and_play,
    select : ''
}
export const initBlackGameState = {
    position : [createBlackTurnPosition()],
    turn : 'b',
    posMoves : [],
    status : Status.ongoing,
    promotingLocation : null,
    allowedCastle: {
        w : 'lr',
        b : 'lr'
    },
    flipped : true,
    mode : Mode.play_as_black,
    select : ''
}
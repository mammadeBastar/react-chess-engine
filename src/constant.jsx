import { createPosition } from "./helper"

export const Status = {
    'ongoing' : 'Ongoing',
    'wcheck' : 'White in check',
    'bcheck' : 'Black in check',
    'promote' : 'Promote',
    'ggw' : 'White wins',
    'ggb' : 'Black wins'
}

export const initGameState = {
    position : [createPosition()],
    turn : 'w',
    posMoves : [],
    status : Status.ongoing,
    promotingLocation : null
}
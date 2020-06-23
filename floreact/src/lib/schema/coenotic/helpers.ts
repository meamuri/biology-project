import {Coenotic} from './core'

export function coenoticToLocaleName(coenotic: Coenotic): string {
    switch (coenotic) {
        case Coenotic.STEPPE:
            return "Степной"
        case Coenotic.MEADOW:
            return "Луговые"
        case Coenotic.FOREST:
            return "Лесные"
        case Coenotic.COASTAL_WATER:
            return "Прибрежно-водные"
        case Coenotic.MARSHY:
            return "Болотные"
        case Coenotic.WATER:
            return "Водные"
        case Coenotic.WEEDY:
            return "Сорные"
        case Coenotic.UNDEFINED:
        default:
            return "Неизвестный"
    }
}

export function toCoenotic(coenotic: string): Coenotic | null {
    if (coenotic === Coenotic.STEPPE) {
        return Coenotic.STEPPE
    } else if (coenotic === Coenotic.MEADOW) {
        return Coenotic.MEADOW
    } else if (coenotic === Coenotic.FOREST) {
        return Coenotic.FOREST
    } else if (coenotic === Coenotic.COASTAL_WATER) {
        return Coenotic.COASTAL_WATER
    } else if (coenotic === Coenotic.MARSHY) {
        return Coenotic.MARSHY
    } else if (coenotic === Coenotic.WATER) {
        return Coenotic.WATER
    } else if (coenotic === Coenotic.WEEDY) {
        return Coenotic.WEEDY
    } else if (coenotic === Coenotic.UNDEFINED) {
        return Coenotic.UNDEFINED
    }
    return null
}

import {Complexes} from './core'

export function toComplex(name: String): Complexes {
    if (name === Complexes.PSAMOPHILES) {
        return Complexes.PSAMOPHILES
    } else if (name === Complexes.HALOPHILES) {
        return Complexes.HALOPHILES
    } else if (name === Complexes.CALCIPHILES) {
        return Complexes.CALCIPHILES
    }
    return Complexes.UNKNOWN
}

export function toLocaleName(complex: String): string | undefined {
    switch (complex) {
        case Complexes.CALCIPHILES:
            return 'Кальцефиты'
        case Complexes.PSAMOPHILES:
            return 'Псаммофиты'
        case Complexes.HALOPHILES:
            return 'Галофиты'
        case Complexes.UNKNOWN:
        default:
            return 'Неизвестный'
    }
}

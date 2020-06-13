import {Complexes} from './core'

export function toComplex(name: String): Complexes {
    if (name === Complexes.STEPPE) {
        return Complexes.STEPPE
    } else if (name === Complexes.PSAMOPHILES) {
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
        case Complexes.STEPPE:
            return 'Cтепной'
        case Complexes.CALCIPHILES:
            return 'Кальцефильный'
        case Complexes.PSAMOPHILES:
            return 'Псаммофил'
        case Complexes.HALOPHILES:
            return 'Галофильный'
        case Complexes.UNKNOWN:
        default:
            return 'Неизвестный'
    }
}

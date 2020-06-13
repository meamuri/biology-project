import {Complexes} from './core'

export function toComplex(name: String): Complexes | undefined {
    if (name === 'STEPPE') {
        return Complexes.STEPPE
    } else if (name === 'PSAMOPHILES') {
        return Complexes.PSAMOPHILES
    } else if (name === 'HALOPHILES') {
        return Complexes.HALOPHILES
    } else if (name === 'CALCIPHILES') {
        return Complexes.CALCIPHILES
    }
    return undefined
}

export function toLocaleName(complex: String): string | undefined {
    switch (complex) {
        case Complexes.STEPPE:
            return 'степной'
        case Complexes.CALCIPHILES:
            return 'кальцефильный'
        case Complexes.PSAMOPHILES:
            return 'псаммофил'
        case Complexes.HALOPHILES:
            return 'галофильный'
    }
}

import {Hydrophile} from './core'

export function toLocaleName(hydrophile: string): string {
    switch (hydrophile) {
        case Hydrophile.XEROPHYTE:
            return "Ксерофиты"
        case Hydrophile.SCLEROPHYTE:
            return "Склерофиты"
        case Hydrophile.MESOPHYTE:
            return "Мезофиты"
        case Hydrophile.HYGROPHYTE:
            return "Гигрофиты"
        case Hydrophile.HYDROPHYTE:
            return "Гидрофиты"
        case Hydrophile.MESOXEROPHYTE:
            return "Мезоксерофиты"
        case Hydrophile.MESOHYDROPHYTE:
            return "Месогидрофиты"
        case Hydrophile.MESOHYGROPHYTE:
            return "Месогигрофиты"
        case Hydrophile.UNDEFINED:
        default:
            return "Неизвестный"
    }
}

export function toHydrophile(hydrophile: string): Hydrophile {
    if (hydrophile === Hydrophile.XEROPHYTE) {
        return Hydrophile.XEROPHYTE
    } else if (hydrophile === Hydrophile.MESOPHYTE) {
        return Hydrophile.MESOPHYTE
    } else if (hydrophile === Hydrophile.SCLEROPHYTE) {
        return Hydrophile.SCLEROPHYTE
    } else if (hydrophile === Hydrophile.HYDROPHYTE) {
        return Hydrophile.HYDROPHYTE
    } else if (hydrophile === Hydrophile.HYGROPHYTE) {
        return Hydrophile.HYGROPHYTE
    } else if (hydrophile === Hydrophile.MESOXEROPHYTE) {
        return Hydrophile.MESOXEROPHYTE
    } else if (hydrophile === Hydrophile.MESOHYDROPHYTE) {
        return Hydrophile.MESOHYDROPHYTE
    } else if (hydrophile === Hydrophile.MESOHYGROPHYTE) {
        return Hydrophile.MESOHYGROPHYTE
    }
    return Hydrophile.UNDEFINED
}

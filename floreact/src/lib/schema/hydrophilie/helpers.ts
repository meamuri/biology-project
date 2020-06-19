import { Hydrophile } from './core'

export function toLocaleName(hydrophile: string): string {
    switch (hydrophile) {
        case Hydrophile.UNDEFINED:
        default:
            return "Неизвестный"
    }
}


export type FREQUENCY =
    'DISAPPEARED' |
    'ENDANGERED' |
    'SHRINKING' |
    'RARE' |
    'RECOVERING' |
    'UNDEFINED'

export function describeFrequency(f: string): string {
    switch (f) {
        case "DISAPPEARED":
            return "исчезнувший"
        case "ENDANGERED":
            return "исчезающий"
        case "RARE":
            return "редкий"
        case "RECOVERING":
            return "восстанавливающийся"
        case "SHRINKING":
            return "сокращающиеся"
        case "UNDEFINED":
        default:
            return "неопределенный"
    }
}

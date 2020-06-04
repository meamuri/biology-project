
export type FREQUENCY =
    'DISAPPEARED' |
    'ENDANGERED' |
    'SHRINKING' |
    'RARE' |
    'RECOVERING' |
    'UNDEFINED'

type frequencyDescription = {
    npp: number,
    name: string,
    digitSign: string,
    styleLabel: string,
    frequency: FREQUENCY,
}

const frequencies: {[key: string]: frequencyDescription } = {
    'DISAPPEARED': {
        npp: 0,
        name: "вероятно исчезнувшие",
        digitSign: "0",
        styleLabel: "statusDisappeared",
        frequency: "DISAPPEARED",
    },
    'ENDANGERED': {
        npp: 1,
        name: "находящиеся под угрозой исчезновения",
        digitSign: "I",
        styleLabel: "statusEndangered",
        frequency: "ENDANGERED",
    },
    'SHRINKING': {
        npp: 2,
        name: "сокращающиеся в численности",
        digitSign: "II",
        styleLabel: "statusShrinking",
        frequency: "SHRINKING",
    },
    'RARE': {
        npp: 3,
        name: "редкие",
        digitSign: "III",
        styleLabel: "statusRare",
        frequency: "RARE",
    },
    'UNDEFINED': {
        npp: 4,
        name: "неопределенные по статусу",
        digitSign: "IV",
        styleLabel: "statusUndefined",
        frequency: "UNDEFINED",
    },
    'RECOVERING': {
        npp: 5,
        name: "восстанавливаемые и восстанавливающиеся",
        digitSign: "V",
        styleLabel: "statusRecovering",
        frequency: "RECOVERING",
    }
}

export function toFrequency(f: string): FREQUENCY {
    return extractByKey(f, 'frequency')
}

export function signsToFrequency() {
    let res: {[key: string]: string} = {}
    for (let i in frequencies) {
        res[frequencies[i].digitSign] = i
    }
    return res
}

function extractByKey(f: string, key: 'npp' | 'name' | 'digitSign' | 'styleLabel' | 'frequency'): any {
    let expected = frequencies[f]
    let res = !expected ? frequencies['UNDEFINED'] : expected
    return res[key]
}

export function describeFrequency(f: string): string {
    return extractByKey(f, 'name')
}

export function frequencyToDigitSign(f: string): string {
    return extractByKey(f, 'digitSign')
}

export function frequencyToLabel(f: FREQUENCY) {
    return extractByKey(f, 'styleLabel')
}

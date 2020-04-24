
export type FREQUENCY =
    'DISAPPEARED' |
    'ENDANGERED' |
    'SHRINKING' |
    'RARE' |
    'RECOVERING' |
    'UNDEFINED'

const frequencies: {[key: string]: any } = {
    'DISAPPEARED': {
        npp: 0,
        name: "вероятно исчезнувшие",
        digitSign: "0",
        styleLabel: "statusDisappeared",
    },
    'ENDANGERED': {
        npp: 1,
        name: "находящиеся под угрозой исчезновения",
        digitSign: "I",
        styleLabel: "statusEndangered",
    },
    'SHRINKING': {
        npp: 2,
        name: "сокращающиеся в численности",
        digitSign: "II",
        styleLabel: "statusShrinking",
    },
    'RARE': {
        npp: 3,
        name: "редкие",
        digitSign: "III",
        styleLabel: "statusRare",
    },
    'RECOVERING': {
        npp: 5,
        name: "неопределенные по статусу",
        digitSign: "V",
        styleLabel: "statusRecovering",
    },
    'UNDEFINED': {
        npp: 4,
        name: "восстанавливаемые и восстанавливающиеся",
        digitSign: "IV",
        styleLabel: "statusUndefined",
    }
}

function extractByKey(f: string, key: string) {
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

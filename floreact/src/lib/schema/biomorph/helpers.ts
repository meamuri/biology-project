import { Biomorph } from './biomorph'

const mappings = {
    [Biomorph.HERBS]: {
        name: 'Малолетнее травянистое'
    },
    [Biomorph.PERENNIAL_HERBS]: {
        name: 'Многолетнее травянистое'
    },
    [Biomorph.TREES]: {
        name: 'Древесное'
    },
    [Biomorph.HALF_TREES]: {
        name: 'Полудревесное'
    },
}

export function stringToBiomorph(form: string): Biomorph | null {
    switch (form) {
        case 'TREES': {
            return Biomorph.TREES
        }
        case 'HALF_TREES': {
            return Biomorph.HALF_TREES
        }
        case 'PERENNIAL_HERBS': {
            return Biomorph.PERENNIAL_HERBS
        }
        case 'HERBS': {
            return Biomorph.HERBS
        }
    }
    return null
}

export function formToName(form: string): string | null {
    let biomorph = stringToBiomorph(form)
    if (biomorph === null) {
        return null
    }
    return mappings[biomorph!].name
}

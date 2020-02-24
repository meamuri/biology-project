import {
    SpeciesRecord,
    Phylum, Family,
} from '../lib/taxon'

type TaxonFamilyMapping = {
    [key: string]: Family
}

type TaxonPhylumMapping = {
    [key: string]: Phylum
}

export function woof(species: SpeciesRecord[]): Phylum[] {
    let families = species
        .reduce((acc: TaxonFamilyMapping, val: SpeciesRecord) => {
            if (!(val.family.id in acc)) {
                acc[val.family.id] = { ...val.family, children: []}
            }
            acc[val.family.id].children.push(val)
            return acc
        }, {})
    let familiesArr = Object.values(families)

    let phylum = species
        .reduce((acc: TaxonPhylumMapping, val: SpeciesRecord) => {
            if (!(val.phylum.id in acc)) {
                acc[val.phylum.id] = { ...val.phylum, children: []}
            }
            // acc[val.phylum.id].children.push(families[spe])
            return acc
        }, {})

    return []
}

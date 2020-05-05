import {
    FamilyTaxon,
    ParentTaxon,
    PhylumTaxon,
    SpeciesRecord,
    SpeciesTaxon,
} from '../../lib/taxon'

export type FloraClassification = {
    phylums: {
        families: Set<string>,
        species: Set<string>,
        items: {
            [key: string]: ParentTaxon
        }
    },
    families: {
        species: Set<string>,
        items: {
            [key: string]: ParentTaxon
        }
    },
    species: {
        [key: string]: SpeciesRecord
    }
}

export function fillClassifications(records: SpeciesRecord[]): PhylumTaxon[] {
    let speciesByFamily: Map<string, SpeciesTaxon[]> = records.reduce((acc, e) => {
        if (!acc.has(e.family.id!)) {
            acc.set(e.family.id!, [])
        }
        acc.get(e.family.id!)!.push({
            id: e.id,
            key: e.id,
            name: e.name,
            ruLocaleName: e.ruLocaleName,
            frequency: e.frequency || "UNDEFINED",
            children: undefined,
        })
        return acc
    }, new Map<string, SpeciesTaxon[]>())

    let groupedFamilies = records.reduce((acc: Map<string, SpeciesRecord>, e: SpeciesRecord) => {
        if (!acc.has(e.family.id!)) {
            acc.set(e.family.id!, e)
        }
        return acc
    }, new Map<string, SpeciesRecord>())

    let groupedPhylums = records.reduce((acc: Map<string, ParentTaxon>, e: SpeciesRecord) => {
        if (!acc.has(e.phylum.id!)) {
            acc.set(e.phylum.id!, e.phylum)
        }
        return acc
    }, new Map<string, ParentTaxon>())

    let familiesByPhylum = Array.from(groupedFamilies.entries()).map(e => e[1]).reduce((acc, e) => {
        if (!acc.has(e.phylum.id!)) {
            acc.set(e.phylum.id!, [])
        }

        let family: FamilyTaxon = {
            id: e.family.id,
            key: e.family.id,
            name: e.family.name,
            ruLocaleName: e.ruLocaleName,
            children: speciesByFamily.get(e.family.id!) || [],
        }
        acc.get(e.phylum.id!)!.push(family)
        return acc;
    }, new Map<string, FamilyTaxon[]>())

    return Array.from(familiesByPhylum.entries()).map(([id, b]) => {
        let cachedPhylum = groupedPhylums.get(id)!
        return {
            id,
            key: id,
            name: cachedPhylum.name,
            ruLocaleName: cachedPhylum.ruLocaleName,
            children: familiesByPhylum.get(id) || [],
        }
    })
}

export const initClassification: () => FloraClassification = () => ({
    phylums: {
        families: new Set<string>(),
        species: new Set<string>(),
        items: { }
    },
    families: {
        species: new Set<string>(),
        items: {}
    },
    species: {}
})

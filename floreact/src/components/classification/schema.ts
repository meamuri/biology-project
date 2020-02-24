import {ParentTaxon, SpeciesRecord} from "../../lib/taxon";

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

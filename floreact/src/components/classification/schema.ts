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

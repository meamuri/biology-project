import { FREQUENCY } from './frequency'
import { Area } from './location'
import Biomorph from './schema/biomorph'
import Complexes from './schema/complexes/'
import { Hydrophile } from './schema/hydrophilie/core'
import { Coenotic } from './schema/coenotic/core'

export abstract class Taxon<T extends Taxon<any>[] | void> {
    id: string;
    key: string;
    name: string;
    ruLocaleName?: string;
    children: T;

    constructor(id: string, name: string, children: T, ruLocaleName?: string,) {
        this.id = id;
        this.key = id;
        this.name = name;
        this.children = children;
        this.ruLocaleName = ruLocaleName
    }
}

export class PhylumTaxon extends Taxon<FamilyTaxon[]> {}
export class FamilyTaxon extends Taxon<SpeciesTaxon[]> {}
export class SpeciesTaxon extends Taxon<void> {
    frequency: FREQUENCY
    description?: string
    locations?: Area[]
    constructor(id: string,
                name: string,
                frequency: FREQUENCY,
                ruLocaleName?: string,
                description?: string,
                locations?: Area[]
    ) {
        super(id, name, undefined, ruLocaleName);
        this.frequency = frequency
        this.description = description
        this.locations = locations
    }
}

export type ParentTaxon = {
    id: string
    name: string
    ruLocaleName: string
    parentId?: string
}

export type ClassTaxon = {
    name?: string
    ruLocaleName?: string
}

export type SpeciesRecord = ParentTaxon & {
    hydrophile?: Hydrophile
    biomorph?: Biomorph
    frequency?: FREQUENCY
    complex?: Complexes
    coenotic?: Coenotic
    description: string | null
    family: ParentTaxon
    phylum: ParentTaxon
    locations?: Area[]
    classTaxon?: ClassTaxon
    areal?: string
}

export type BaseTaxon = ParentTaxon & {children: ParentTaxon[]}
export type Phylum = BaseTaxon
export type Family = ParentTaxon & {children: SpeciesRecord[]}

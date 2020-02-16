import { FREQUENCY } from './frequency';

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
    constructor(id: string, name: string, frequency: FREQUENCY, ruLocaleName?: string) {
        super(id, name, undefined, ruLocaleName);
        this.frequency = frequency
    }
}

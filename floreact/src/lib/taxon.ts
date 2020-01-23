
export abstract class Taxon<T extends Taxon<any>[] | void> {
    name: string;
    ruLocaleName?: string;
    children: T;

    constructor(name: string, children: T, ruLocaleName?: string,) {
        this.name = name;
        this.children = children;
        this.ruLocaleName = ruLocaleName
    }
}

export class PhylumTaxon extends Taxon<FamilyTaxon[]> {}
export class FamilyTaxon extends Taxon<SpeciesTaxon[]> {}
export class SpeciesTaxon extends Taxon<void> {}

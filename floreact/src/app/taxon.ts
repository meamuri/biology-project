
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

export class Phylum extends Taxon<Family[]> {}
export class Family extends Taxon<Species[]> {}
export class Species extends Taxon<void> {}

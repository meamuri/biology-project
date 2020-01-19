
export abstract class Taxon<T extends Taxon<any>[] | never> {
    name: string;
    children: T;

    constructor(name: string, children: T) {
        this.name = name;
        this.children = children;
    }
}

export class Phylum extends Taxon<Family[]> {}
export class Family extends Taxon<Species[]> {}
export class Species extends Taxon<never> {}

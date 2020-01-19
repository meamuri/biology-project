
export interface Taxon<T extends Taxon<any>> {
    name: string
    children?: T[]
}

export class Phylum implements Taxon<Family> {
    children?: Family[];
    name: string;

    constructor(name: string, children: Family[]) {
        this.children = children;
        this.name = name;
    }
}

export class Family implements Taxon<Species> {
    children: Species[];
    name: string;

    constructor(name: string, children: Species[]) {
        this.children = children;
        this.name = name;
    }
}

export class Species implements Taxon<never> {
    children? = undefined;
    name: string;

    constructor(name: string) {
        this.children = undefined;
        this.name = name;
    }

}

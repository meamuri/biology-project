import { Taxon } from '../../lib/taxon';

export class TaxonProps {
    key: string;
    name: string;
    ruLocaleName?: string;
    children: Taxon<any>[];

    constructor(t: Taxon<any>) {
        this.key = t.id;
        this.name = t.name;
        this.ruLocaleName = t.ruLocaleName;
        this.children = t.children;
    }
}

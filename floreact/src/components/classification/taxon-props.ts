import { Taxon, SpeciesTaxon } from '../../lib/taxon';
import { FREQUENCY } from '../../lib/frequency';

export class TaxonProps {
    id: string
    key: string;
    name: string;
    ruLocaleName?: string;
    children: Taxon<any>[];

    constructor(t: Taxon<any>) {
        this.id = t.id;
        this.key = t.id;
        this.name = t.name;
        this.ruLocaleName = t.ruLocaleName;
        this.children = t.children;
    }
}

export class SpeciesProps extends TaxonProps {
    frequency: FREQUENCY
    constructor(t: SpeciesTaxon) {
        super(t);
        this.frequency = t.frequency
    }
}

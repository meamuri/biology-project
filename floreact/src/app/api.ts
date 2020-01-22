import {Phylum, Family, Species} from './taxon';

export function getData(): Phylum[] {
    return [
        new Phylum('woof', [
            new Family(
                'au', [
                    new Species("Meeeh")
                ]
            )
        ])
    ]
}

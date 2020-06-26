import { SpeciesRecord } from '../../lib/taxon'
import Hydrophile, { toLocaleName } from '../../lib/schema/hydrophilie'
import { AbstractFilter } from './AbstractFilter'


export class HydrophileFilter extends AbstractFilter<Hydrophile> {
    protected filterKey: string = 'hydrophile'
    protected elements: Hydrophile[] = [

    ]
    protected extractField(e: SpeciesRecord): Hydrophile | undefined {
        return e.hydrophile
    }
    protected localizer(e: Hydrophile): string {
        return toLocaleName(e)
    }
}

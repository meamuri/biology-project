import { SpeciesRecord } from '../../lib/taxon'
import Coenotic, { coenoticToLocaleName } from '../../lib/schema/coenotic'
import { AbstractFilter } from './AbstractFilter'

export class CoenoticFilter extends AbstractFilter<Coenotic> {
    protected filterKey: string = 'coenotic'
    protected elements: Coenotic[] = [
        Coenotic.UNDEFINED, Coenotic.STEPPE, Coenotic.MEADOW, Coenotic.FOREST, Coenotic.COASTAL_WATER, Coenotic.MARSHY, Coenotic.WATER, Coenotic.WEEDY,
        Coenotic.EDGE_STEPPE, Coenotic.EDGE_MEADOW_STEPPE, Coenotic.MEADOW_EDGE, Coenotic.MEADOW_STEPPE,
    ]
    protected extractField(e: SpeciesRecord): Coenotic | undefined {
        return e.coenotic
    }
    protected localizer(e: Coenotic): string {
        return coenoticToLocaleName(e)
    }
}

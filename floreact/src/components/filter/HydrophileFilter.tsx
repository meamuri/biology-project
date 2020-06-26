import { SpeciesRecord } from '../../lib/taxon'
import Hydrophile, { toLocaleName } from '../../lib/schema/hydrophilie'
import { AbstractFilter } from './AbstractFilter'


export class HydrophileFilter extends AbstractFilter<Hydrophile> {
    protected filterKey: string = 'hydrophile'
    protected elements: Hydrophile[] = [
        Hydrophile.UNDEFINED, Hydrophile.HYDROPHYTE, Hydrophile.HYGROPHYTE, Hydrophile.MESOPHYTE, Hydrophile.SCLEROPHYTE, Hydrophile.XEROPHYTE,
        Hydrophile.MESOXEROPHYTE, Hydrophile.MESOHYGROPHYTE, Hydrophile.MESOHYDROPHYTE,
    ]
    protected extractField(e: SpeciesRecord): Hydrophile | undefined {
        return e.hydrophile
    }
    protected localizer(e: Hydrophile): string {
        return toLocaleName(e)
    }
}

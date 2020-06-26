import Biomorph, { formToName } from '../../lib/schema/biomorph'
import {AbstractFilter} from './AbstractFilter'
import { SpeciesRecord } from '../../lib/taxon'

export class BiomorphFilter extends AbstractFilter<Biomorph> {
    protected filterKey: string = 'biomorph'
    protected elements: Biomorph[] = [Biomorph.TREES, Biomorph.HALF_TREES, Biomorph.PERENNIAL_HERBS, Biomorph.HERBS]
    protected extractField(e: SpeciesRecord): Biomorph | undefined {
        return e.biomorph
    }
    protected localizer(e: Biomorph): string {
        return formToName(e) || ''
    }
}

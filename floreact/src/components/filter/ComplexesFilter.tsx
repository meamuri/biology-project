import { SpeciesRecord } from '../../lib/taxon'
import Complexes, { toLocaleName } from '../../lib/schema/complexes'
import { AbstractFilter } from './AbstractFilter'


export class ComplexesFilter extends AbstractFilter<Complexes> {
    protected filterKey: string = 'complexes'
    protected elements: Complexes[] = [
        Complexes.UNKNOWN, Complexes.CALCIPHILES, Complexes.HALOPHILES, Complexes.PSAMOPHILES,
    ]
    protected extractField(e: SpeciesRecord): Complexes | undefined {
        return e.complex
    }
    protected localizer(e: Complexes): string {
        return toLocaleName(e) || ''
    }
}

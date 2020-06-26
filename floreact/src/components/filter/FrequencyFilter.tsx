import { AbstractFilter } from './AbstractFilter'
import { FREQUENCY, frequencyToLabel } from '../../lib/frequency'
import { SpeciesRecord } from '../../lib/taxon'

export class FrequencyFilter extends AbstractFilter<FREQUENCY> {
    protected readonly elements: FREQUENCY[] = [

    ]

    protected extractField(e: SpeciesRecord): FREQUENCY | undefined {
        return e.frequency
    }

    protected readonly filterKey: string = 'frequency'

    protected localizer(e: FREQUENCY): string {
        return frequencyToLabel(e)
    }

}

import { AbstractFilter } from './AbstractFilter'
import { FREQUENCY, frequencyToDigitSign } from '../../lib/frequency'
import { SpeciesRecord } from '../../lib/taxon'

export class FrequencyFilter extends AbstractFilter<FREQUENCY> {
    protected readonly elements: FREQUENCY[] = [
        'DISAPPEARED',
        'ENDANGERED',
        'SHRINKING',
        'RARE',
        'RECOVERING',
        'UNDEFINED'
    ]

    protected extractField(e: SpeciesRecord): FREQUENCY | undefined {
        return e.frequency
    }

    protected readonly filterKey: string = 'frequency'

    protected localizer(e: FREQUENCY): string {
        return frequencyToDigitSign(e)
    }

}

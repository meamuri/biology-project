import { AbstractFilter } from './AbstractFilter'
import { Group, groupToLocaleName, arialToGroup } from '../../lib/schema/areal'
import { SpeciesRecord } from '../../lib/taxon'

export class ArialFilter extends AbstractFilter<Group> {
    protected readonly elements: Group[] = [
        Group.PLURAL,
        Group.EURO_ASIA,
        Group.EAST_EUROPE_ASIA,
        Group.SOUTH_EAST_EUROPE_ASIA,
        Group.EURO_SIBERIA_MIDDLE_ASIAN,
        Group.EURO_SIBERIA,
        Group.EUROPEAN,
        Group.ENDEMIC,
    ]

    protected extractField(e: SpeciesRecord): Group | undefined {
        if (!e.areal) {
            return undefined
        }
        return arialToGroup(e.areal) || undefined
    }

    protected readonly filterKey: string = 'areal'

    protected localizer(e: Group): string {
        return groupToLocaleName(e)
    }

}

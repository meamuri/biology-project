import { SpeciesRecord } from '../../lib/taxon'

export type TableActions = 'edit' | 'show' | 'map'

export type FilterPredicate = (s: SpeciesRecord) => boolean

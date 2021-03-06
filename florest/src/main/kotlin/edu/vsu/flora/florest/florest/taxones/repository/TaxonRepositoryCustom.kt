package edu.vsu.flora.florest.florest.taxones.repository

import edu.vsu.flora.florest.florest.taxones.schema.Complexes
import edu.vsu.flora.florest.florest.taxones.schema.Biomorph
import edu.vsu.flora.florest.florest.taxones.schema.Coenotic
import edu.vsu.flora.florest.florest.taxones.schema.Frequency
import edu.vsu.flora.florest.florest.taxones.schema.Hydrophile
import edu.vsu.flora.florest.florest.taxones.schema.Record

interface TaxonRepositoryCustom {
    fun findWithFilters(phylumName: String?, familyName: String?, speciesName: String?): List<Record>

    fun updateSpecies(id: String,
                      frequency: Frequency?,
                      biomorph: Biomorph?,
                      complex: Complexes?,
                      hydrophile: Hydrophile?,
                      coenotic: Coenotic?,
                      areal: String?,
                      description: String): Record?
}

package edu.vsu.flora.florest.florest.taxones.repository

import edu.vsu.flora.florest.florest.taxones.shema.Frequency
import edu.vsu.flora.florest.florest.taxones.shema.Record
import edu.vsu.flora.florest.florest.taxones.shema.UpdateDTO

interface TaxonRepositoryCustom {
    fun findWithFilters(phylumName: String?, familyName: String?, speciesName: String?): List<Record>

    fun updateSpecies(id: String,
                      frequency: Frequency,
                      description: String): Record?
}

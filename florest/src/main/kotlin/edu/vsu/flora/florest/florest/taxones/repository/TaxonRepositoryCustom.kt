package edu.vsu.flora.florest.florest.taxones.repository

import edu.vsu.flora.florest.florest.taxones.shema.Record

interface TaxonRepositoryCustom {
    fun findWithFilters(phylumName: String?, familyName: String?, speciesName: String?): List<Record>
}

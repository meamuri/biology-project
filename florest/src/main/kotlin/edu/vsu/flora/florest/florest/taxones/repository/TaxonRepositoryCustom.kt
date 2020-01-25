package edu.vsu.flora.florest.florest.taxones.repository

import edu.vsu.flora.florest.florest.taxones.Record

interface TaxonRepositoryCustom {
    fun findWithFilters(): List<Record>
}

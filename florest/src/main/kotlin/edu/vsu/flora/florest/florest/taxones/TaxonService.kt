package edu.vsu.flora.florest.florest.taxones

import edu.vsu.flora.florest.florest.taxones.repository.TaxonRepository
import org.springframework.stereotype.Service

@Service
class TaxonService(private val taxonRepository: TaxonRepository) {
    fun withFilters(phylumName: String?) = taxonRepository.findWithFilters(phylumName)
    fun all(): List<Record> = taxonRepository.findAll()
}

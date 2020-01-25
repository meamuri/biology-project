package edu.vsu.flora.florest.florest.taxones

import org.springframework.stereotype.Service

@Service
class TaxonService(private val taxonRepository: TaxonRepository) {
    fun findAll() = taxonRepository.findAll()
}

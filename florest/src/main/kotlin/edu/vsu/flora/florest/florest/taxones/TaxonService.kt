package edu.vsu.flora.florest.florest.taxones

import edu.vsu.flora.florest.florest.taxones.repository.TaxonRepository
import org.springframework.stereotype.Service

@Service
class TaxonService(private val taxonRepository: TaxonRepository) {
    fun withFilters(
            phylumName: String?,
            familyName: String?,
            speciesName: String?) = taxonRepository.findWithFilters(phylumName, familyName, speciesName)

    fun all(): List<Record> = taxonRepository.findAll()

    fun format(): Map<String, Phylum> = format(all())
    fun format(species: List<Record>): Map<String, Phylum> {
        val res = mutableMapOf<String, Phylum>()
        species.forEach { record ->
            val phylum = res.computeIfAbsent(record.phylum!!.id!!) {
                Phylum(it, mutableMapOf())
            }
            val family = phylum.children!!.computeIfAbsent(record.family!!.id!!) {
                Family(it, mutableMapOf())
            }
            family.children!![record.id!!] = Species(record.name!!)
        }
        return res
    }
}

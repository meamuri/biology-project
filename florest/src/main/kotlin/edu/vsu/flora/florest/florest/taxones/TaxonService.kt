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

    fun format(): List<Taxon.Phylum> = format(all())
    fun format(species: List<Record>): List<Taxon.Phylum> {
        val phylum = mutableMapOf<String, Taxon.Phylum>()
        species.forEach { r ->
            phylum.computeIfAbsent(r.phylum.id) {
                Taxon.Phylum(r.phylum.name, mutableListOf())
            }
        }
        val families = mutableMapOf<String, MutableMap<String, Taxon.Family>>()
        species.forEach { r ->
            val ph = families.computeIfAbsent(r.phylum.id) { mutableMapOf() }
            val family = ph.computeIfAbsent(r.family.id) { Taxon.Family(r.family.name, mutableListOf()) }
        }

        val speciesMap = mutableMapOf<String, MutableMap<String, MutableMap<String, Record>>>()
        species.forEach { r ->
            val ph = speciesMap.computeIfAbsent(r.phylum.id) { mutableMapOf() }
            val family = ph.computeIfAbsent(r.family.id) { mutableMapOf() }
            family[r.id] = r
        }
        return emptyList()
    }
}

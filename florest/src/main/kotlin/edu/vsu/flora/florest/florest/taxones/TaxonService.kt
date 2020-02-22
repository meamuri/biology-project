package edu.vsu.flora.florest.florest.taxones

import edu.vsu.flora.florest.florest.taxones.repository.TaxonRepository
import edu.vsu.flora.florest.florest.taxones.shema.Record
import edu.vsu.flora.florest.florest.taxones.shema.Taxon
import edu.vsu.flora.florest.florest.taxones.shema.UpdateDTO
import edu.vsu.flora.florest.florest.tools.Logging
import org.springframework.http.HttpStatus
import org.springframework.stereotype.Service
import org.springframework.web.server.ResponseStatusException

@Service
class TaxonService(private val taxonRepository: TaxonRepository) : Logging {
    fun withFilters(
            phylumName: String?,
            familyName: String?,
            speciesName: String?) = taxonRepository.findWithFilters(phylumName, familyName, speciesName)

    fun all(): List<Record> = taxonRepository.findAll()

    fun format(): List<Taxon.Phylum> = format(all())
    fun format(records: List<Record>): List<Taxon.Phylum> {
        val species = records
                .map {
                    Taxon.Species(it.id, it.name, it.family.id, it.ruLocaleName, it.frequency)
                }
                .groupBy { it.parentId }

        val family = records
                .groupBy { it.family }
                .map { Taxon.Family(it.key.id, it.key.name, it.key.parentId!!, species[it.key.id] ?: error(""), it.key.ruLocaleName) }
                .groupBy { it.parentId }

        return records
                .groupBy { it.phylum }
                .map { Taxon.Phylum(it.key.id, it.key.name, family[it.key.id] ?: error(""), it.key.ruLocaleName) }

    }

    fun update(id: String, dto: UpdateDTO): Taxon.Species {
        val res = taxonRepository.updateSpecies(id, dto) ?:
            throw ResponseStatusException(HttpStatus.NOT_FOUND, "Unknown species id")
        return Taxon.Species(res.id, res.name, res.family.id, res.ruLocaleName, res.frequency, res.description, res.locations)
    }
}

package edu.vsu.flora.florest.florest.taxones

import edu.vsu.flora.florest.florest.taxones.repository.TaxonRepository
import edu.vsu.flora.florest.florest.taxones.schema.Biomorph
import edu.vsu.flora.florest.florest.taxones.schema.Coenotic
import edu.vsu.flora.florest.florest.taxones.schema.Complexes
import edu.vsu.flora.florest.florest.taxones.schema.Frequency
import edu.vsu.flora.florest.florest.taxones.schema.Hydrophile
import edu.vsu.flora.florest.florest.taxones.schema.Record
import edu.vsu.flora.florest.florest.taxones.schema.Taxon
import edu.vsu.flora.florest.florest.taxones.schema.UpdateDTO
import edu.vsu.flora.florest.florest.tools.Logging
import org.springframework.data.domain.Sort
import org.springframework.http.HttpStatus
import org.springframework.stereotype.Service
import org.springframework.web.server.ResponseStatusException

@Service
class TaxonService(private val taxonRepository: TaxonRepository) : Logging {
    fun withFilters(
            phylumName: String?,
            familyName: String?,
            speciesName: String?) = taxonRepository.findWithFilters(phylumName, familyName, speciesName)

    fun all(): List<Record> = taxonRepository.findAll(Sort.by("name"))

    fun format(): List<Taxon.Phylum> = format(all())
    fun format(records: List<Record>): List<Taxon.Phylum> {
        val species = records
                .map {
                    Taxon.Species(it.id, it.name, it.family.id, it.ruLocaleName, it.frequency, it.biomorph)
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
        val frequency = dto.frequency?.let { dtoFrequency ->
            Frequency.values()
                .find { it.name == dtoFrequency }
                ?: throw ResponseStatusException(HttpStatus.NOT_FOUND, "Unknown frequency field")
        }
        val biomorph = dto.biomorph?.let { biomorph ->
            Biomorph.values()
                .find { it.name == biomorph }
                ?: throw ResponseStatusException(HttpStatus.NOT_FOUND, "Unknown biomorph")
        }
        val complex = dto.complex?.let { complex ->
            Complexes.values()
                .find { it.name == complex }
                ?: throw ResponseStatusException(HttpStatus.NOT_FOUND, "Unknown complex")
        }
        val hydrophile = dto.hydrophile?.let { hydrophile ->
            Hydrophile.values()
                .find { it.name == hydrophile }
                ?: throw ResponseStatusException(HttpStatus.NOT_FOUND, "Unknown hydrophile")
        }
        val coenotic = dto.coenotic?.let { coenotic ->
            Coenotic.values()
                .find { it.name == coenotic }
                ?: throw ResponseStatusException(HttpStatus.BAD_REQUEST, "Unknown coenotic")
        }
        val res = taxonRepository.updateSpecies(id, frequency, biomorph, complex, hydrophile, coenotic, dto.areal, dto.description)
            ?: throw ResponseStatusException(HttpStatus.NOT_FOUND, "Unknown species id")
        return Taxon.Species(res.id, res.name, res.family.id, res.ruLocaleName, res.frequency, res.biomorph, res.description, res.locations)
    }
}

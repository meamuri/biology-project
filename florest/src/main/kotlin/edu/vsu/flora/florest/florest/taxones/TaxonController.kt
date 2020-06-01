package edu.vsu.flora.florest.florest.taxones

import edu.vsu.flora.florest.florest.taxones.exceptions.TaxonNotFoundException
import edu.vsu.flora.florest.florest.taxones.schema.Taxon
import edu.vsu.flora.florest.florest.taxones.schema.UpdateDTO
import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PutMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController
import org.springframework.web.server.ResponseStatusException

@RestController
@RequestMapping("/api/species")
class TaxonController(private val taxonService: TaxonService) {

    @GetMapping("")
    fun getSpecies() = taxonService.all()

    @GetMapping("/taxon")
    fun withFilters(
            @RequestParam phylumName: String?,
            @RequestParam familyName: String?,
            @RequestParam speciesName: String?) = taxonService.withFilters(phylumName, familyName, speciesName)

    @GetMapping("/tree")
    fun getTree(): Collection<Taxon.Phylum> = taxonService.format()

    @PutMapping("/{id}")
    fun updateSpecies(@PathVariable("id") id: String, @RequestBody dto: UpdateDTO): Taxon.Species =
        try {
            taxonService.update(id, dto)
        } catch (nfe: TaxonNotFoundException) {
            throw ResponseStatusException(HttpStatus.NOT_FOUND, "Unknown species id", nfe)
        }
}

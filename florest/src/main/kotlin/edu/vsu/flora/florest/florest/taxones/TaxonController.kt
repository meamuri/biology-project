package edu.vsu.flora.florest.florest.taxones

import edu.vsu.flora.florest.florest.taxones.shema.Taxon
import edu.vsu.flora.florest.florest.taxones.shema.UpdateDTO
import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.ResponseStatus
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api")
class TaxonController(private val taxonService: TaxonService) {

    @GetMapping("/all")
    fun all() = taxonService.all()

    @GetMapping("/species")
    fun withFilters(
            @RequestParam phylumName: String?,
            @RequestParam familyName: String?,
            @RequestParam speciesName: String?) = taxonService.withFilters(phylumName, familyName, speciesName)

    @GetMapping("")
    fun get(): Collection<Taxon.Phylum> = taxonService.format()

    @PostMapping("/api/species/{id}")
    @ResponseStatus(HttpStatus.ACCEPTED)
    fun updateSpecies(@PathVariable("id") id: String, @RequestBody dto: UpdateDTO) {
        taxonService.update(id, dto)
    }

}

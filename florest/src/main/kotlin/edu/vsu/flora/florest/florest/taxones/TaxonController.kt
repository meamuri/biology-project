package edu.vsu.flora.florest.florest.taxones

import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
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
    fun get(): Collection<Phylum> = taxonService.format().values
}

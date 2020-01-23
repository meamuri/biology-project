package edu.vsu.flora.florest.florest.taxones

import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api")
class TaxonController {
    @GetMapping("")
    fun get(): List<Phylum> {
        return listOf(
                Phylum().apply {
                    name = "woosh"
                    children = listOf(
                            Family().apply {
                                name = "justFamily"
                                children = listOf(
                                        Species().apply {
                                            name = "best of"
                                            children = listOf()
                                        }
                                )
                            }
                    )
                }
        )
    }
}

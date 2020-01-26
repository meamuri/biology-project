package edu.vsu.flora.florest.florest.taxones

interface TaxonProperties {
    val id: String
    val name: String
//    val ruLocaleName: String?
}

sealed class Taxon: TaxonProperties {
    data class Phylum(
            override val id: String,
            override val name: String,
            val children: Collection<Family>,
            val ruLocaleName: String?
    ) : Taxon()

    data class Family(
            override val id: String,
            override val name: String,
            val parentId: String,
            val children: Collection<Species>,
            val ruLocaleName: String?
    ) : Taxon()

    data class Species(
            override val id: String,
            override val name: String,
            val parentId: String,
            val ruLocaleName: String?
    ) : Taxon()
}

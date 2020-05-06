package edu.vsu.flora.florest.florest.taxones.schema

interface TaxonProperties {
    val id: String
    val name: String
    val ruLocaleName: String?
}

sealed class Taxon: TaxonProperties {
    data class Phylum(
            override val id: String,
            override val name: String,
            val children: Collection<Family>,
            override val ruLocaleName: String?
    ) : Taxon()

    data class Family(
            override val id: String,
            override val name: String,
            val parentId: String,
            val children: Collection<Species>,
            override val ruLocaleName: String?
    ) : Taxon()

    data class Species(
        override val id: String,
        override val name: String,
        val parentId: String,
        override val ruLocaleName: String?,
        val frequency: Frequency? = Frequency.UNDEFINED,
        val description: String? = null,
        var locations: List<Location>? = null
    ) : Taxon()
}

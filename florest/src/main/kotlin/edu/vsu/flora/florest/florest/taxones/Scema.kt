package edu.vsu.flora.florest.florest.taxones

sealed class Taxon<T>(
    var name: String? = null,
    var children: MutableMap<String, T>? = null
)

class Phylum(
        name: String,
        children: MutableMap<String, Family>
) : Taxon<Family>(name, children)

class Family(
        name: String,
        children: MutableMap<String, Species>
) : Taxon<Species>(name, children)


class Species(
        name: String
) : Taxon<None>(name, null)

class None: Taxon<Nothing>()

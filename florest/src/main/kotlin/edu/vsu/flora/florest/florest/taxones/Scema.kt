package edu.vsu.flora.florest.florest.taxones

sealed class Taxon<T> {
    var name: String? = null
    var children: List<T>? = null
}

class Phylum : Taxon<Family>()
class Family: Taxon<Species>()
class Species: Taxon<None>()
class None: Taxon<Nothing>()

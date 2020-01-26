package edu.vsu.flora.florest.florest.taxones

sealed class Taxon {
    data class Phylum(val name: String, val children: MutableCollection<Family>) : Taxon()
    data class Family(val name: String, val children: MutableCollection<Species>) : Taxon()
    data class Species(val name: String) : Taxon()
}

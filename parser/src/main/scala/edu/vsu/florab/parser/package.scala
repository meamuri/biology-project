package edu.vsu.florab

package object parser {
  case class Taxon(name: String, rusLocaleName: String)
  case class Row(phylum: Taxon, family: Taxon, species: Taxon)
}

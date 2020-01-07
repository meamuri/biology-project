package edu.vsu.florab

package object parser {
  case class Taxon(name: String, rusLocaleName: String)
  case class Phylum(name: String, rusLocaleName: String)
  case class Family(name: String, rusLocaleName: String)
  case class Species(name: String, rusLocaleName: String)
}

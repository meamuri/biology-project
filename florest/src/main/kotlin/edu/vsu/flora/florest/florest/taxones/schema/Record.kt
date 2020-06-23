package edu.vsu.flora.florest.florest.taxones.schema

import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.mapping.Document

@Document(collection = "species")
data class Record(
    @Id var id: String,
    var phylum: SubRecord,
    var family: SubRecord,
    var name: String,
    var ruLocaleName: String? = null,
    var frequency: Frequency = Frequency.UNDEFINED,
    var description: String? = null,
    var locations: List<Location>? = null,
    var biomorph: Biomorph? = null,
    var hydrophile: Hydrophile? = null,
    var complex: Complexes? = null,
    var classTaxon: ClassTaxon? = null,
    var coenotic: Coenotic? = null
)

data class ClassTaxon(var name: String?, var ruLocaleName: String? = null)

data class SubRecord(
        // https://docs.spring.io/spring-data/data-mongo/docs/1.5.1.RELEASE/reference/html/mapping-chapter.html
        @Id var id: String,
        var name: String,
        var ruLocaleName: String? = null,
        var parentId: String? = null
)

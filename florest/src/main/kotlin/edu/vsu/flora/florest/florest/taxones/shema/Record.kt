package edu.vsu.flora.florest.florest.taxones.shema

import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.mapping.Document

@Document(collection = "species")
data class Record(
        @Id var id: String,
        var phylum: SubRecord,
        var family: SubRecord,
        var name: String,
        var ruLocaleName: String? = null,
        var frequency: Frequency = Frequency.UNKNOWN,
        var description: String? = null,
        var locations: List<Location>? = null
)

data class SubRecord(
        // https://docs.spring.io/spring-data/data-mongo/docs/1.5.1.RELEASE/reference/html/mapping-chapter.html
        @Id var id: String,
        var name: String,
        var ruLocaleName: String? = null,
        var parentId: String? = null
)
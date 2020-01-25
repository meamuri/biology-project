package edu.vsu.flora.florest.florest.taxones.repository

import edu.vsu.flora.florest.florest.taxones.Record
import org.springframework.data.mongodb.core.MongoTemplate
import org.springframework.data.mongodb.core.query.Criteria
import org.springframework.data.mongodb.core.query.Query

class TaxonRepositoryCustomImpl(private val mongoTemplate: MongoTemplate) : TaxonRepositoryCustom {
    override fun findWithFilters(): List<Record> {
        val criteria = Criteria("family.name").`is`("Lycopodiaceae")
        val query = Query().addCriteria(criteria)
        return mongoTemplate.find(query, Record::class.java)
    }
}

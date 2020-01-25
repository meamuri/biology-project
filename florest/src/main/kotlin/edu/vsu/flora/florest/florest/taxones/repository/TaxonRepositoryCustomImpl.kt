package edu.vsu.flora.florest.florest.taxones.repository

import edu.vsu.flora.florest.florest.taxones.Record
import org.springframework.data.mongodb.core.MongoTemplate
import org.springframework.data.mongodb.core.query.Criteria
import org.springframework.data.mongodb.core.query.Query
import org.springframework.data.mongodb.core.query.isEqualTo

class TaxonRepositoryCustomImpl(private val mongoTemplate: MongoTemplate) : TaxonRepositoryCustom {
    override fun findWithFilters(phylumName: String?): List<Record> {
        val query = Query()
        phylumName?.let {
            val criteria = Criteria("phylum.name").isEqualTo(it)
            query.addCriteria(criteria)
        }
        return mongoTemplate.find(query, Record::class.java)
    }
}

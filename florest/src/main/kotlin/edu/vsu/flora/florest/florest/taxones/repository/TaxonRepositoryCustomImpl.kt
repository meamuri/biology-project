package edu.vsu.flora.florest.florest.taxones.repository

import edu.vsu.flora.florest.florest.taxones.shema.Record
import org.springframework.data.mongodb.core.MongoTemplate
import org.springframework.data.mongodb.core.query.Criteria
import org.springframework.data.mongodb.core.query.Query

class TaxonRepositoryCustomImpl(private val mongoTemplate: MongoTemplate) : TaxonRepositoryCustom {
    override fun findWithFilters(phylumName: String?, familyName: String?, speciesName: String?): List<Record> {
        val query = Query()
        phylumName?.let {
            val criteria = Criteria("phylum.name").regex(it)
            query.addCriteria(criteria)
        }
        speciesName?.let {
            val criteria = Criteria("name").regex(it)
            query.addCriteria(criteria)
        }
        familyName?.let {
            val criteria = Criteria("family.name").regex(it)
            query.addCriteria(criteria)
        }
        return mongoTemplate.find(query, Record::class.java)
    }
}

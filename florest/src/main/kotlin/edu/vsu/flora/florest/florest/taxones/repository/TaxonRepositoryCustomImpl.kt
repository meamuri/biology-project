package edu.vsu.flora.florest.florest.taxones.repository

import edu.vsu.flora.florest.florest.taxones.schema.Complexes
import edu.vsu.flora.florest.florest.taxones.schema.Biomorph
import edu.vsu.flora.florest.florest.taxones.schema.Coenotic
import edu.vsu.flora.florest.florest.taxones.schema.Frequency
import edu.vsu.flora.florest.florest.taxones.schema.Hydrophile
import edu.vsu.flora.florest.florest.taxones.schema.Record
import org.springframework.data.mongodb.core.FindAndModifyOptions
import org.springframework.data.mongodb.core.MongoTemplate
import org.springframework.data.mongodb.core.query.Criteria
import org.springframework.data.mongodb.core.query.Query
import org.springframework.data.mongodb.core.query.Update

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

    override fun updateSpecies(
        id: String,
        frequency: Frequency?,
        biomorph: Biomorph?,
        complex: Complexes?,
        hydrophile: Hydrophile?,
        coenotic: Coenotic?,
        description: String
    ): Record? {
        val query = Query(Criteria.where("_id").`is`(id))
        val update = Update()
            .set("description", description)

        frequency?.let {
            update.set("frequency", frequency)
        }
        biomorph?.let {
            update.set("biomorph", biomorph)
        }
        complex?.let {
            update.set("complex", complex)
        }
        hydrophile?.let {
            update.set("hydrophile", hydrophile)
        }
        coenotic?.let {
            update.set("coenotic", coenotic)
        }

        return mongoTemplate.findAndModify(
            query,
            update,
            FindAndModifyOptions().returnNew(true),
            Record::class.java
        )
    }
}

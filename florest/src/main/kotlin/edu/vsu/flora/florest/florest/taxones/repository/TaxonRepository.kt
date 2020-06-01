package edu.vsu.flora.florest.florest.taxones.repository

import edu.vsu.flora.florest.florest.taxones.schema.Record
import org.springframework.data.mongodb.repository.MongoRepository

interface TaxonRepository : MongoRepository<Record, String>, TaxonRepositoryCustom

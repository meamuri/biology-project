package edu.vsu.flora.florest.florest.taxones.repository

import edu.vsu.flora.florest.florest.taxones.Record
import org.bson.types.ObjectId
import org.springframework.data.mongodb.repository.MongoRepository

interface TaxonRepository : MongoRepository<Record, ObjectId>, TaxonRepositoryCustom

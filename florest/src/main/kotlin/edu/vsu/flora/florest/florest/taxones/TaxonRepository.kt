package edu.vsu.flora.florest.florest.taxones

import org.bson.types.ObjectId
import org.springframework.data.mongodb.repository.MongoRepository

interface TaxonRepository : MongoRepository<Record, ObjectId>

package edu.vsu.flora.florest.florest.taxones.repository

import edu.vsu.flora.florest.florest.taxones.shema.Record
import org.springframework.data.mongodb.repository.MongoRepository

interface TaxonRepository : MongoRepository<Record, String>, TaxonRepositoryCustom

package edu.vsu.flora.florest.florest.taxones.schema

data class Location(
    var latitude: Long,
    var longitude: Long,
    var radiusM: Int,
    var areaName: String
)

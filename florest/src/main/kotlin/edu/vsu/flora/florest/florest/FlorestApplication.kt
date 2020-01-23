package edu.vsu.flora.florest.florest

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class FlorestApplication

fun main(args: Array<String>) {
	runApplication<FlorestApplication>(*args)
}

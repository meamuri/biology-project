package edu.vsu.flora.florest.florest.tools

import org.slf4j.Logger
import org.slf4j.LoggerFactory

inline fun <reified T> T.logger(): Logger = LoggerFactory.getLogger(T::class.java)

interface Logging {
    val logger
        get() = logger()
}

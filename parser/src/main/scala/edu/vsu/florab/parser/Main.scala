package edu.vsu.florab.parser

import java.io.File

import com.github.tototoshi.csv.CSVReader

object Main extends App {
  val reader = CSVReader.open(new File("data/Classification.csv"))
  reader.all().foreach(println)
}

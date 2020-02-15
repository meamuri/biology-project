package edu.vsu.florab.migrations.process

trait Migration {
  protected val scripts: List[MigrationUnit]
}

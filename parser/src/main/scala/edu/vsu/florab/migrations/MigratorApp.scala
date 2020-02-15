package edu.vsu.florab.migrations

import edu.vsu.florab.migrations.scripts.M000InitialMigration
import edu.vsu.florab.migrations.process.metadataCollection

object MigratorApp extends App {
  (
    new M000InitialMigration
      :: Nil
  ).foreach { i => i.migrate(metadataCollection) }
}

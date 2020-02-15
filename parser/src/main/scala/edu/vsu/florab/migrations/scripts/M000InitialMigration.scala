package edu.vsu.florab.migrations.scripts

import edu.vsu.florab.migrations.process.{Metadata, MetadataCollection, MigrationScript, MigrationUnit}

class M000InitialMigration extends MigrationScript {
  override val n: Int = 0

  val initial: MigrationUnit = (metadataCollection: MetadataCollection, migrationData: Metadata) => {
    throw new RuntimeException("initial migration is required")
  }

  override protected val scripts: List[MigrationUnit] =
    initial :: Nil

}

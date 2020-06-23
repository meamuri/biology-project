package edu.vsu.flora.migrator.scripts

import edu.vsu.flora.migrator.process.Migration
import edu.vsu.flora.migrator.schema.MigrationDescription
import org.litote.kmongo.coroutine.CoroutineDatabase
import org.litote.kmongo.eq
import org.litote.kmongo.setTo

class M007TyposFixes2(database: CoroutineDatabase) : Migration(
    database, 7, listOf(
        renameAegonychonPurpureocaeruleum,
        renamoeAdenophoraLilifoliaToAdenophoraLiliifolia
    )
) {
    companion object {
        data class Species(val name: String)
        val renameAegonychonPurpureocaeruleum = MigrationDescription("Aegonychon purpureo-caeruleum S.F. Gray. без \"-\"") { db ->
            val filter = Species::name eq "Aegonychon purpureo-caeruleum S.F. Gray."
            val update = Species::name setTo "Aegonychon purpureocaeruleum S.F. Gray."
            db.getCollection<Species>().updateMany(filter, update)
        }
        val renamoeAdenophoraLilifoliaToAdenophoraLiliifolia = MigrationDescription("Adenophora lilifolia (L.) A. DC. to Adenophora liliifolia (L.) A. DC.") { db ->
            val filter = Species::name eq "Adenophora lilifolia (L.) A. DC."
            val update = Species::name setTo "Adenophora liliifolia (L.) A. DC."
            db.getCollection<Species>().updateMany(filter, update)
        }
    }
}

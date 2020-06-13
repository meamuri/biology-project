package edu.vsu.flora.migrator.scripts

import edu.vsu.flora.migrator.process.Migration
import edu.vsu.flora.migrator.schema.MigrationDescription
import org.litote.kmongo.coroutine.CoroutineDatabase
import org.litote.kmongo.eq
import org.litote.kmongo.setTo

class M005TyposFixes(database: CoroutineDatabase) : Migration(
    database, 5, listOf(
        renameDianthusPseudoarmeria,
        renameConvolvolusToConvolvUlus,
        renameAsragalusTesticulatusToAsTragalus,
        renameLimoniumPlathyphyllumToPlatyphyllum,
        renamePolemoniumCoeruleumCaeruleum,
        renameCoeloglossum
    )
) {
    companion object {
        data class Species(val name: String)
        val renameDianthusPseudoarmeria = MigrationDescription("Dianthus pseudoarmeria без \"о\"") { db ->
            val filter = Species::name eq ""
            val update = Species::name setTo ""
            db.getCollection<Species>().updateMany(filter, update)
        }
        val renameConvolvolusToConvolvUlus = MigrationDescription("Dianthus ConvolvolusToConvolvUlus") { db ->

        }

        val renameAsragalusTesticulatusToAsTragalus = MigrationDescription("rename AsragalusTesticulatus to AsTragalus") { db ->

        }

        val renameLimoniumPlathyphyllumToPlatyphyllum = MigrationDescription("rename Limonium plathyphyllum -> platyphyllum") { db ->

        }

        val renamePolemoniumCoeruleumCaeruleum = MigrationDescription("rename Polemonium coeruleum -> cAeruleum") { db ->

        }

        val renameCoeloglossum = MigrationDescription("Coeloglossum viride -> заменить C на англ раскладку") { db ->

        }
    }
}

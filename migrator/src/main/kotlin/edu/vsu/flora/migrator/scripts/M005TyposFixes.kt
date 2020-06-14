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
            val filter = Species::name eq "Dianthus pseudoarmeria Bieb."
            val update = Species::name setTo "Dianthus pseudarmeria Bieb."
            db.getCollection<Species>().updateMany(filter, update)
        }
        val renameConvolvolusToConvolvUlus = MigrationDescription("Convolvolus to ConvolvUlus") { db ->
            val filter = Species::name eq "Convolvolus lineatus L."
            val update = Species::name setTo "Convolvulus lineatus L."
            db.getCollection<Species>().updateMany(filter, update)
        }

        val renameAsragalusTesticulatusToAsTragalus = MigrationDescription("rename AsragalusTesticulatus to AsTragalus") { db ->
            val filter = Species::name eq "Asragalus testiculatus Pall."
            val update = Species::name setTo "Astragalus testiculatus Pall."
            db.getCollection<Species>().updateMany(filter, update)
        }

        val renameLimoniumPlathyphyllumToPlatyphyllum = MigrationDescription("rename Limonium plathyphyllum -> platyphyllum") { db ->
            val filter = Species::name eq "Limonium plathyphyllum Lincz."
            val update = Species::name setTo "Limonium platyphyllum Lincz."
            db.getCollection<Species>().updateMany(filter, update)
        }

        val renamePolemoniumCoeruleumCaeruleum = MigrationDescription("rename Polemonium coeruleum -> cAeruleum") { db ->
            val filter = Species::name eq "Polemonium coeruleum L."
            val update = Species::name setTo "Polemonium caeruleum L."
            db.getCollection<Species>().updateMany(filter, update)
        }

        val renameCoeloglossum = MigrationDescription("Coeloglossum viride -> заменить C на англ раскладку") { db ->
            val filter = Species::name eq "Сoeloglossum viride (L.) C. Hartm."
            val update = Species::name setTo "Coeloglossum viride (L.) C. Hartm."
            db.getCollection<Species>().updateMany(filter, update)
        }
    }
}

import { MigrationInterface, QueryRunner } from "typeorm";

export class guestsNonNullable1658942944454 implements MigrationInterface {
    name = 'guestsNonNullable1658942944454'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`UPDATE "commitment" SET "guests" = '{}' WHERE "guests" IS NULL`);
        await queryRunner.query(`ALTER TABLE "commitment" ALTER COLUMN "guests" SET NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "commitment" ALTER COLUMN "guests" DROP NOT NULL`);
    }

}

import { MigrationInterface, QueryRunner } from "typeorm";

export class guestsDefaultValue1658944477994 implements MigrationInterface {
    name = 'guestsDefaultValue1658944477994'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "commitment" ALTER COLUMN "guests" SET DEFAULT '{}'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "commitment" ALTER COLUMN "guests" DROP DEFAULT`);
    }

}

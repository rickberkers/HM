import { MigrationInterface, QueryRunner } from "typeorm";

export class addLcUsernameToUser1659266265160 implements MigrationInterface {
    name = 'addLcUsernameToUser1659266265160'

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.query(`ALTER TABLE "user" ADD "lowerCaseName" character varying`);

        await queryRunner.query(`UPDATE "user" SET "lowerCaseName" = lower("name")`)
    
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "lowerCaseName" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_4e1051d5449c394ee5757a79f85" UNIQUE ("lowerCaseName")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_4e1051d5449c394ee5757a79f85"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "lowerCaseName"`);
    }

}

import { MigrationInterface, QueryRunner } from "typeorm";

export class resetMigrations1659562594037 implements MigrationInterface {
    name = 'resetMigrations1659562594037'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "lowerCaseName" character varying NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying, "hash" character varying NOT NULL, "refreshToken" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_065d4d8f3b5adb4a08841eae3c8" UNIQUE ("name"), CONSTRAINT "UQ_4e1051d5449c394ee5757a79f85" UNIQUE ("lowerCaseName"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "household" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_26e9111eab2b8908fefe3c645f5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "commitment" ("day" date NOT NULL, "householdId" uuid NOT NULL, "userId" uuid NOT NULL, "guests" text array NOT NULL DEFAULT '{}', "committed" boolean NOT NULL, CONSTRAINT "PK_17556bfa9378e50ce9e25eeeba5" PRIMARY KEY ("day", "householdId", "userId"))`);
        await queryRunner.query(`CREATE TABLE "day_info" ("day" date NOT NULL, "householdId" uuid NOT NULL, "note" character varying, CONSTRAINT "PK_6fb171e6cba6aad284ba558286e" PRIMARY KEY ("day", "householdId"))`);
        await queryRunner.query(`CREATE TABLE "household_members_user" ("householdId" uuid NOT NULL, "userId" uuid NOT NULL, CONSTRAINT "PK_a2bb90c5dc920e6cf9004b7ddd9" PRIMARY KEY ("householdId", "userId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_610e2726cfdd11d730d41b4552" ON "household_members_user" ("householdId") `);
        await queryRunner.query(`CREATE INDEX "IDX_31d64549deef89e8b1dfe6eebe" ON "household_members_user" ("userId") `);
        await queryRunner.query(`ALTER TABLE "commitment" ADD CONSTRAINT "FK_4a42fa35029a83586ee7486b12c" FOREIGN KEY ("householdId") REFERENCES "household"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "commitment" ADD CONSTRAINT "FK_04b765c427cece7879a1c62bab3" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "day_info" ADD CONSTRAINT "FK_a92d02656c91ed1b0d657a67b10" FOREIGN KEY ("householdId") REFERENCES "household"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "household_members_user" ADD CONSTRAINT "FK_610e2726cfdd11d730d41b4552b" FOREIGN KEY ("householdId") REFERENCES "household"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "household_members_user" ADD CONSTRAINT "FK_31d64549deef89e8b1dfe6eebe8" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "household_members_user" DROP CONSTRAINT "FK_31d64549deef89e8b1dfe6eebe8"`);
        await queryRunner.query(`ALTER TABLE "household_members_user" DROP CONSTRAINT "FK_610e2726cfdd11d730d41b4552b"`);
        await queryRunner.query(`ALTER TABLE "day_info" DROP CONSTRAINT "FK_a92d02656c91ed1b0d657a67b10"`);
        await queryRunner.query(`ALTER TABLE "commitment" DROP CONSTRAINT "FK_04b765c427cece7879a1c62bab3"`);
        await queryRunner.query(`ALTER TABLE "commitment" DROP CONSTRAINT "FK_4a42fa35029a83586ee7486b12c"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_31d64549deef89e8b1dfe6eebe"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_610e2726cfdd11d730d41b4552"`);
        await queryRunner.query(`DROP TABLE "household_members_user"`);
        await queryRunner.query(`DROP TABLE "day_info"`);
        await queryRunner.query(`DROP TABLE "commitment"`);
        await queryRunner.query(`DROP TABLE "household"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}

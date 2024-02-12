import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1707211407604 implements MigrationInterface {
  name = "Initial1707211407604";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "userName" character varying NOT NULL, "password" character varying NOT NULL, "address" character varying NOT NULL, "roles" "public"."user_role_enum" array NOT NULL DEFAULT '{user}', CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "user"`);
  }
}

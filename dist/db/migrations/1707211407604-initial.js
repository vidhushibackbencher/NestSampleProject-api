"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Initial1707211407604 = void 0;
class Initial1707211407604 {
    constructor() {
        this.name = 'Initial1707211407604';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "address" character varying NOT NULL, "role" "public"."user_role_enum" array NOT NULL DEFAULT '{user}', CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE "user"`);
    }
}
exports.Initial1707211407604 = Initial1707211407604;
//# sourceMappingURL=1707211407604-initial.js.map
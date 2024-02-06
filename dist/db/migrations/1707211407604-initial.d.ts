import { MigrationInterface, QueryRunner } from "typeorm";
export declare class Initial1707211407604 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}

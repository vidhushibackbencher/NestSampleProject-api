"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const config_1 = require("@nestjs/config");
const user_entity_1 = require("../src/users/entities/user.entity");
const configService = new config_1.ConfigService();
const config = () => ({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'password',
    database: 'crudOperation',
    entities: [user_entity_1.User],
});
exports.config = config;
//# sourceMappingURL=orm.config.js.map
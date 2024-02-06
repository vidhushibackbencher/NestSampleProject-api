"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RefreshJwtStrategy = void 0;
const passport_1 = require("@nestjs/passport");
const passport_jwt_1 = require("passport-jwt");
class RefreshJwtStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy, 'jwt-refresh') {
    constructor() {
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromBodyField('refresh'),
            ignoreExpiration: false,
            secretOrKey: `${process.env.jwt_secret}`,
        });
    }
    async validate(payload) {
        return { user: payload.sub, email: payload.email };
    }
}
exports.RefreshJwtStrategy = RefreshJwtStrategy;
//# sourceMappingURL=refreshTokenStrategies.js.map
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

export class RefreshJwtStrategy extends PassportStrategy(
  Strategy,
  "jwt-refresh",
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromBodyField("refreshToken"),
      ignoreExpiration: false,
      secretOrKey: "secret",
    });
  }

  async validate(payload: any) {
    return {
      id: payload.sub,
      userName: payload.userName,
      isAdmin: payload.isAdmin,
      address: payload.address,
      name: payload.name,
    };
  }
}

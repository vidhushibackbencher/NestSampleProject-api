import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { AuthService } from "src/services/auth/auth.services";

export class JwtStrategy extends PassportStrategy(Strategy, "jwt") {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
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

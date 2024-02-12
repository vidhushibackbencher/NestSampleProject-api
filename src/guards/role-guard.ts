// // RolesGuard
// import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
// import { Reflector } from "@nestjs/core";
// import { Observable } from "rxjs";
// import { ROLES_KEY } from "src/decorates/role-decorated";
// import { User } from "src/models/user.entity";
// import { Roles } from "src/utillity/common/user-roles-enum";
// import { Logger } from "@nestjs/common";

// @Injectable()
// export class RolesGuard implements CanActivate {
//   private readonly logger = new Logger(RolesGuard.name);

//   constructor(private reflector: Reflector) {}

//   canActivate(
//     context: ExecutionContext,
//   ): boolean | Promise<boolean> | Observable<boolean> {
//     try {
//       const requiredRoles = this.reflector.getAllAndOverride<Roles[]>(
//         ROLES_KEY,
//         [context.getHandler(), context.getClass()],
//       );

//       if (!requiredRoles) {
//         return true;
//       }

//       const request = context.switchToHttp().getRequest();
//       const user: User = request.user;

//       console.log(user);

//       if (!user || !user.roles) {
//         return false;
//       }

//       return requiredRoles.some((role) => user.roles.includes(role));
//     } catch (error) {
//       console.log(error);
//       this.logger.error(`Error in RolesGuard: ${error.message}`, error.stack);
//       return false; // Deny access in case of an error
//     }
//   }
// }

import { User } from "src/models/user.entity";
import {
  Ability,
  AbilityBuilder,
  ExtractSubjectType,
  InferSubjects,
  PureAbility,
} from "@casl/ability";
import { Injectable } from "@nestjs/common";

export enum Action {
  Manage = "manage",
  Create = "create",
  Read = "read",
  Update = "update",
  Delete = "delete",
}

export type Subjects = InferSubjects<typeof User> | "all";
export type AppAbility = PureAbility<[Action, Subjects]>;

@Injectable()
export class CaslAbilityFactory {
  defineAbility(user: User) {
    const { can, cannot, build } = new AbilityBuilder<AppAbility>(
      Ability as any,
    );

    if (user.isAdmin) {
      can(Action.Manage, "all");
    } else {
      can(Action.Create, User);
      cannot(Action.Create, User).because("your special message:only admin!!!"); // read-only access to everything
    }

    return build({
      // Read https://casl.js.org/v6/en/guide/subject-type-detection#use-classes-as-subject-types for details
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}

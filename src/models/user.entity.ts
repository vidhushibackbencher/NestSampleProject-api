import { Roles } from "src/utillity/common/user-roles-enum";
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Timestamp,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  userName: string;

  @Column()
  password: string;

  @Column()
  address: string;

  // @Column({ type: "enum", enum: Roles, array: true, default: [Roles.User] })
  @Column({ default: false })
  isAdmin: boolean;

  @CreateDateColumn()
  createdAt: Timestamp;

  @UpdateDateColumn()
  updatedAt: Timestamp;
}

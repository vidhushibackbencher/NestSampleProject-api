import { Roles } from 'src/utillity/common/user-roles-enum';
import { Timestamp } from 'typeorm';
export declare class User {
    id: number;
    name: string;
    email: string;
    password: string;
    address: string;
    role: Roles;
    createdAt: Timestamp;
    updatedAt: Timestamp;
}

import { Strategy } from 'passport-jwt';
declare const RefreshJwtStrategy_base: new (...args: any[]) => Strategy;
export declare class RefreshJwtStrategy extends RefreshJwtStrategy_base {
    constructor();
    validate(payload: any): Promise<{
        user: any;
        email: any;
    }>;
}
export {};

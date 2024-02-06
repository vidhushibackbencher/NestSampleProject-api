"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../users/entities/user.entity");
const typeorm_2 = require("typeorm");
const bcryptjs = require("bcryptjs");
const jwt_1 = require("@nestjs/jwt");
const dotenv = require("dotenv");
dotenv.config();
let AuthService = class AuthService {
    constructor(userRepository, jwtService) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
    }
    async registerUser(userRegister) {
        const existingUser = await this.userRepository.findOne({
            where: { email: userRegister.email },
        });
        if (existingUser) {
            throw new common_1.BadRequestException('Email already registered!');
        }
        try {
            const { name, email, password, address } = userRegister;
            const user = await this.userRepository.save({
                name,
                email,
                password: await bcryptjs.hash(password, 12),
                address,
            });
            delete user.password;
            return user;
        }
        catch (error) {
            console.error(error);
            if (error === '23505') {
                console.error(`Unique constraint ${error.constraint} failed`);
                throw new common_1.HttpException('There is already a user with this email.', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
            throw new common_1.HttpException('Internal Server Error', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async loginUser(loginUserDto) {
        const { email, password } = loginUserDto;
        if (!email?.trim() || !password?.trim()) {
            throw new common_1.BadRequestException({ message: 'Not all required fields have been filled in.' });
        }
        const user = await this.userRepository.findOne({ where: { email } });
        if (!user || !(await bcryptjs.compare(password, user.password))) {
            throw new common_1.BadRequestException({ message: 'Invalid Credentials.' });
        }
        delete user.password;
        const payload = { sub: user.id, email: user.email };
        const refreshTokenPayload = { sub: user.id };
        return {
            user,
            access_token: await this.jwtService.signAsync(payload),
            refresh_token: await this.jwtService.signAsync(refreshTokenPayload, { expiresIn: '7d' })
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.services.js.map
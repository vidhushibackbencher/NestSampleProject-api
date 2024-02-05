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
const jsonwebtoken_1 = require("jsonwebtoken");
let AuthService = class AuthService {
    constructor(userRepository, jwtService) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
    }
    async registerUser(createUserDto) {
        const existingUser = await this.userRepository.findOne({
            where: { email: createUserDto.email },
        });
        if (existingUser) {
            throw new common_1.HttpException('Email already registered!', common_1.HttpStatus.BAD_REQUEST);
        }
        try {
            const { name, email, password, address } = createUserDto;
            const user = await this.userRepository.save({
                name,
                email,
                password: await bcryptjs.hash(password, 12),
                address,
            });
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
    async loginUser(loginUserDto, resp) {
        const { email, password } = loginUserDto;
        if (!email?.trim() || !password?.trim()) {
            return resp
                .status(500)
                .send({ message: 'Not all required fields have been filled in.' });
        }
        const userDB = await this.userRepository.findOne({ where: { email } });
        if (!userDB || !(await bcryptjs.compare(password, userDB.password))) {
            return resp.status(500).send({ message: 'Invalid Credentials.' });
        }
        const accessToken = (0, jsonwebtoken_1.sign)({ id: userDB.id }, 'access_secret', {
            expiresIn: 60 * 60,
        });
        const refreshToken = (0, jsonwebtoken_1.sign)({ id: userDB.id }, 'refresh_secret', {
            expiresIn: 24 * 60 * 60,
        });
        resp.cookie('accessToken', accessToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
        });
        resp.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        resp.status(200).send({ message: 'Login success.' });
    }
    async authUser(req, resp) {
        try {
            const accessToken = req.cookies['accessToken'];
            const payload = (0, jsonwebtoken_1.verify)(accessToken, 'access_secret');
            if (!payload) {
                return resp.status(401).send({ message: 'Unauthenticated.' });
            }
            const user = await this.userRepository.findOne({
                where: { id: payload.id },
            });
            if (!user) {
                return resp.status(401).send({ message: 'Unauthenticated.' });
            }
            return resp.status(200).send(user);
        }
        catch (error) {
            console.error(error);
            return resp.status(500).send({ message: error });
        }
    }
    async refreshUser(req, resp) {
        try {
            const refreshToken = req.cookies['refreshToken'];
            const payload = (0, jsonwebtoken_1.verify)(refreshToken, 'refresh_secret');
            console.log(payload, 'payload');
            if (!payload) {
                return resp.status(401).send({ message: 'Unauthenticated.' });
            }
            const accessToken = (0, jsonwebtoken_1.sign)({ id: payload.id }, 'access_secret', {
                expiresIn: 60 * 60,
            });
            resp.cookie('accessToken', accessToken, {
                httpOnly: true,
                maxAge: 24 * 60 * 60 * 1000,
            });
            resp.status(200).send({ message: 'refresh success.',
                refreshToken });
        }
        catch (error) {
            console.error(error);
            return resp.status(500).send({ message: error });
        }
    }
    findAll() {
        return this.userRepository.find();
    }
    findOne(id) {
        return this.userRepository.findOne({ where: { id } });
    }
    update(id, updateUserDto) {
    }
    remove(id) {
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
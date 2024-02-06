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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRegister = void 0;
const class_validator_1 = require("class-validator");
class UserRegister {
}
exports.UserRegister = UserRegister;
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Name can not be null.' }),
    (0, class_validator_1.IsString)({ message: 'Name shoul be string.' }),
    __metadata("design:type", String)
], UserRegister.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'email can not be null.' }),
    (0, class_validator_1.IsEmail)({}, { message: 'please provide a valid email.' }),
    __metadata("design:type", String)
], UserRegister.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Password can not be empty.' }),
    (0, class_validator_1.MinLength)(8, { message: 'Password minimum  character should be 8.' }),
    __metadata("design:type", String)
], UserRegister.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'email can not be null' }),
    (0, class_validator_1.IsString)({ message: "message should be string" }),
    __metadata("design:type", String)
], UserRegister.prototype, "address", void 0);
//# sourceMappingURL=register.dto.js.map
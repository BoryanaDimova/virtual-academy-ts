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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserResolver = void 0;
const type_graphql_1 = require("type-graphql");
const UserEntity_1 = require("../entitities/UserEntity");
const UserArgs_1 = require("../inputsAndArgs/UserArgs");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
// import { UserRoles } from "./user-roles";
let UserResolver = class UserResolver {
    async users() {
        return await UserEntity_1.UserModel.find({});
    }
    async user(_id) {
        return await UserEntity_1.UserModel.findById(_id);
    }
    async createUser(data) {
        const userData = { ...data, password: bcryptjs_1.default.hashSync(data.password, 10) };
        const newUser = new UserEntity_1.UserModel(userData);
        await newUser.save();
        return newUser;
    }
    // @Authorized([UserRoles.SUPER_ADMIN])
    async deleteUser(_id) {
        return await UserEntity_1.UserModel.findByIdAndRemove(_id);
    }
    async editUser(_id, data) {
        const userData = data.password ? { ...data, password: bcryptjs_1.default.hashSync(data.password, 10) } : data;
        return await UserEntity_1.UserModel.findByIdAndUpdate(_id, userData, { new: true });
    }
};
__decorate([
    (0, type_graphql_1.Query)(returns => [UserEntity_1.User]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "users", null);
__decorate([
    (0, type_graphql_1.Query)(returns => UserEntity_1.User),
    __param(0, (0, type_graphql_1.Arg)("_id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "user", null);
__decorate([
    (0, type_graphql_1.Mutation)(returns => UserEntity_1.User),
    __param(0, (0, type_graphql_1.Arg)("data")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [UserArgs_1.CreateUserInput]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "createUser", null);
__decorate([
    (0, type_graphql_1.Mutation)(returns => UserEntity_1.User),
    __param(0, (0, type_graphql_1.Arg)("_id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "deleteUser", null);
__decorate([
    (0, type_graphql_1.Mutation)(returns => UserEntity_1.User),
    __param(0, (0, type_graphql_1.Arg)("_id")),
    __param(1, (0, type_graphql_1.Arg)("data")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, UserArgs_1.EditUserInput]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "editUser", null);
UserResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], UserResolver);
exports.UserResolver = UserResolver;

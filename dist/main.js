/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((module) => {

module.exports = require("@nestjs/core");

/***/ }),
/* 2 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppModule = void 0;
const config_1 = __webpack_require__(3);
const logger_1 = __webpack_require__(9);
const common_1 = __webpack_require__(5);
const core_1 = __webpack_require__(1);
const nestjs_zod_1 = __webpack_require__(15);
const profile_module_1 = __webpack_require__(16);
const nestjs_redis_1 = __webpack_require__(20);
const auth_module_1 = __webpack_require__(30);
const auth_guard_1 = __webpack_require__(33);
const nestjs_prisma_1 = __webpack_require__(18);
const fs_1 = __webpack_require__(22);
const path_1 = __webpack_require__(21);
let AppModule = class AppModule {
    config;
    constructor(config) {
        this.config = config;
    }
    async onModuleInit() { }
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                loader: () => {
                    return JSON.parse((0, fs_1.readFileSync)((0, path_1.join)(__dirname, '../config/config.json')).toString());
                },
                global: true,
            }),
            nestjs_redis_1.RedisModule.forRootAsync({
                useFactory() {
                    return {
                        config: {
                            path: process.env.REDIS,
                        },
                    };
                },
            }),
            logger_1.LoggerModule,
            profile_module_1.ProfileModule,
            auth_module_1.AuthModule,
            nestjs_prisma_1.PrismaModule.forRoot({ isGlobal: true }),
        ],
        providers: [
            {
                provide: core_1.APP_PIPE,
                useClass: nestjs_zod_1.ZodValidationPipe,
            },
            {
                provide: core_1.APP_GUARD,
                useClass: auth_guard_1.default,
            },
        ],
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _a : Object])
], AppModule);


/***/ }),
/* 3 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(4), exports);
__exportStar(__webpack_require__(6), exports);


/***/ }),
/* 4 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ConfigModule = void 0;
const common_1 = __webpack_require__(5);
const config_service_1 = __webpack_require__(6);
const config_options_1 = __webpack_require__(7);
let ConfigModule = class ConfigModule extends config_options_1.ConfigurableModuleClass {
};
exports.ConfigModule = ConfigModule;
exports.ConfigModule = ConfigModule = __decorate([
    (0, common_1.Module)({
        providers: [config_service_1.ConfigService],
        exports: [config_service_1.ConfigService],
    })
], ConfigModule);


/***/ }),
/* 5 */
/***/ ((module) => {

module.exports = require("@nestjs/common");

/***/ }),
/* 6 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ConfigService = void 0;
const common_1 = __webpack_require__(5);
const config_options_1 = __webpack_require__(7);
const object_standard_path_1 = __webpack_require__(8);
let ConfigService = class ConfigService {
    options;
    config;
    constructor(options) {
        this.options = options;
        this.config = this.options.loader();
    }
    async get(path) {
        const conf = await this.config;
        return (0, object_standard_path_1.pathGet)(conf, path);
    }
};
exports.ConfigService = ConfigService;
exports.ConfigService = ConfigService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(config_options_1.MODULE_OPTIONS_TOKEN)),
    __metadata("design:paramtypes", [typeof (_a = typeof config_options_1.ConfigOption !== "undefined" && config_options_1.ConfigOption) === "function" ? _a : Object])
], ConfigService);


/***/ }),
/* 7 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MODULE_OPTIONS_TOKEN = exports.ConfigurableModuleClass = void 0;
const common_1 = __webpack_require__(5);
_a = new common_1.ConfigurableModuleBuilder()
    .setClassMethodName('forRoot')
    .setExtras({ global: false }, (def, ext) => {
    return {
        ...def,
        global: ext.global,
    };
})
    .build(), exports.ConfigurableModuleClass = _a.ConfigurableModuleClass, exports.MODULE_OPTIONS_TOKEN = _a.MODULE_OPTIONS_TOKEN;


/***/ }),
/* 8 */
/***/ ((module) => {

module.exports = require("object-standard-path");

/***/ }),
/* 9 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(10), exports);
__exportStar(__webpack_require__(12), exports);


/***/ }),
/* 10 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LoggerModule = void 0;
const config_1 = __webpack_require__(3);
const common_1 = __webpack_require__(5);
const nest_winston_1 = __webpack_require__(11);
const logger_service_1 = __webpack_require__(12);
let LoggerModule = class LoggerModule {
    logger;
    constructor(logger) {
        this.logger = logger;
    }
    onModuleInit() {
        this.logger.log(`Winston Logger Init Success!`);
    }
};
exports.LoggerModule = LoggerModule;
exports.LoggerModule = LoggerModule = __decorate([
    (0, common_1.Module)({
        imports: [
            nest_winston_1.WinstonModule.forRootAsync({
                inject: [config_1.ConfigService],
                useClass: logger_service_1.WinstonLoggerService,
            }),
        ],
        providers: [logger_service_1.WinstonLoggerService],
        exports: [logger_service_1.WinstonLoggerService],
    }),
    __param(0, (0, common_1.Inject)(nest_winston_1.WINSTON_MODULE_NEST_PROVIDER)),
    __metadata("design:paramtypes", [typeof (_a = typeof common_1.LoggerService !== "undefined" && common_1.LoggerService) === "function" ? _a : Object])
], LoggerModule);


/***/ }),
/* 11 */
/***/ ((module) => {

module.exports = require("nest-winston");

/***/ }),
/* 12 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WinstonLoggerService = void 0;
const config_1 = __webpack_require__(3);
const common_1 = __webpack_require__(5);
const winston = __webpack_require__(13);
__webpack_require__(14);
const nest_winston_1 = __webpack_require__(11);
let WinstonLoggerService = class WinstonLoggerService {
    config;
    constructor(config) {
        this.config = config;
    }
    async createTransport(level) {
        return new winston.transports.DailyRotateFile({
            level,
            dirname: await this.config.get('logger.dirname'),
            filename: await this.config.get('logger.filename'),
            datePattern: await this.config.get('logger.datePattern'),
            maxSize: await this.config.get('logger.maxSize'),
        });
    }
    async createWinstonModuleOptions() {
        const levels = await this.config.get('logger.level');
        const appName = await this.config.get('appName');
        const transports = Promise.all(levels.map((level) => this.createTransport(level)));
        return {
            transports: [
                ...(await transports),
                new winston.transports.Console({
                    format: winston.format.combine(winston.format.timestamp(), winston.format.ms(), nest_winston_1.utilities.format.nestLike(appName ?? 'Nest', {
                        colors: true,
                        prettyPrint: true,
                        processId: true,
                        appName: true,
                    })),
                }),
            ],
        };
    }
};
exports.WinstonLoggerService = WinstonLoggerService;
exports.WinstonLoggerService = WinstonLoggerService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _a : Object])
], WinstonLoggerService);


/***/ }),
/* 13 */
/***/ ((module) => {

module.exports = require("winston");

/***/ }),
/* 14 */
/***/ ((module) => {

module.exports = require("winston-daily-rotate-file");

/***/ }),
/* 15 */
/***/ ((module) => {

module.exports = require("nestjs-zod");

/***/ }),
/* 16 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProfileModule = void 0;
const common_1 = __webpack_require__(5);
const profile_service_1 = __webpack_require__(17);
const profile_controller_1 = __webpack_require__(23);
let ProfileModule = class ProfileModule {
};
exports.ProfileModule = ProfileModule;
exports.ProfileModule = ProfileModule = __decorate([
    (0, common_1.Module)({
        controllers: [profile_controller_1.ProfileController],
        providers: [profile_service_1.ProfileService],
    })
], ProfileModule);


/***/ }),
/* 17 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProfileService = void 0;
const common_1 = __webpack_require__(5);
const nestjs_prisma_1 = __webpack_require__(18);
const ramda_1 = __webpack_require__(19);
const nestjs_redis_1 = __webpack_require__(20);
const config_1 = __webpack_require__(3);
const path_1 = __webpack_require__(21);
const fs_1 = __webpack_require__(22);
let ProfileService = class ProfileService {
    prisma;
    redisService;
    config;
    redis;
    constructor(prisma, redisService, config) {
        this.prisma = prisma;
        this.redisService = redisService;
        this.config = config;
        const r = this.redisService.getOrNil();
        if (!r) {
            throw new Error('Redis Can not connect');
        }
        this.redis = r;
    }
    async createProfile(data) {
        const profile = await this.prisma.profile.findFirst({
            where: {
                email: data.email,
            },
        });
        if ((0, ramda_1.isNotNil)(profile)) {
            return profile;
        }
        return this.prisma.profile.create({
            data: {
                ...data,
                avatar: '',
            },
        });
    }
    updateProfile(id, profile) {
        return this.prisma.profile.update({
            where: { id },
            data: {
                ...profile,
            },
        });
    }
    getProfile(id) {
        return this.prisma.profile.findFirst({
            where: { id },
        });
    }
    getRemoteProfileById(id) {
        const url = new URL(`${process.env.SSO_PATH}/api/get-user`);
        url.searchParams.set('clientId', process.env.CLIENT_ID);
        url.searchParams.set('clientSecret', process.env.CLIENT_SECRET);
        url.searchParams.set('userId', id);
        return fetch(url, {
            method: 'GET',
        })
            .then((resp) => resp.json())
            .then((body) => {
            if (body.status === 'error') {
                throw new common_1.HttpException('用户不存在', common_1.HttpStatus.BAD_REQUEST);
            }
            return body.data;
        })
            .then((user) => user);
    }
    async readAvatar(hash) {
        if (!(await this.redis.exists(`AVATAR::${hash}::REF`))) {
            throw new common_1.HttpException('资源不存在', common_1.HttpStatus.NOT_FOUND);
        }
        return (0, fs_1.readFileSync)((0, path_1.join)(__dirname, 'avatar', hash));
    }
    async uploadAvatar(id, file, hash) {
        if (!(await this.redis.exists(`AVATAR::${hash}::REF`))) {
            const path = (0, path_1.join)(__dirname, 'avatar', hash);
            (0, fs_1.writeFileSync)(path, file);
        }
        const profile = await this.prisma.profile.findFirst({
            where: { id },
            select: { avatar: true },
        });
        if ((0, ramda_1.isNil)(profile)) {
            throw new common_1.HttpException('账号不存在', common_1.HttpStatus.BAD_REQUEST);
        }
        if (profile.avatar.endsWith(hash)) {
            await this.redis.decr(`AVATAR::${hash}::REF`);
            const cur = await this.redis.get(`AVATAR::${hash}::REF`);
            if (!cur) {
                const path = (0, path_1.join)(__dirname, 'avatar', hash);
                (0, fs_1.unlinkSync)(path);
            }
        }
        await this.redis.incr(`AVATAR::${hash}::REF`);
        const url = await this.config.get('url');
        await this.prisma.profile.update({
            where: { id },
            data: {
                avatar: `${url}/avatar/${hash}`,
            },
        });
    }
};
exports.ProfileService = ProfileService;
exports.ProfileService = ProfileService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof nestjs_prisma_1.PrismaService !== "undefined" && nestjs_prisma_1.PrismaService) === "function" ? _a : Object, typeof (_b = typeof nestjs_redis_1.RedisService !== "undefined" && nestjs_redis_1.RedisService) === "function" ? _b : Object, typeof (_c = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _c : Object])
], ProfileService);


/***/ }),
/* 18 */
/***/ ((module) => {

module.exports = require("nestjs-prisma");

/***/ }),
/* 19 */
/***/ ((module) => {

module.exports = require("ramda");

/***/ }),
/* 20 */
/***/ ((module) => {

module.exports = require("@liaoliaots/nestjs-redis");

/***/ }),
/* 21 */
/***/ ((module) => {

module.exports = require("path");

/***/ }),
/* 22 */
/***/ ((module) => {

module.exports = require("fs");

/***/ }),
/* 23 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
var _a, _b, _c, _d, _e, _f, _g;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProfileController = void 0;
const common_1 = __webpack_require__(5);
const profile_service_1 = __webpack_require__(17);
const token_decorator_1 = __webpack_require__(24);
const ramda_1 = __webpack_require__(19);
const auth_decorator_1 = __webpack_require__(25);
const update_profile_dto_1 = __webpack_require__(26);
const platform_express_1 = __webpack_require__(28);
const crypto_1 = __webpack_require__(29);
let ProfileController = class ProfileController {
    profileService;
    constructor(profileService) {
        this.profileService = profileService;
    }
    async uploadAvatar(user, file) {
        const filehash = (0, crypto_1.createHash)('sha512')
            .update(file.buffer)
            .digest('hex')
            .toLowerCase();
        await this.profileService.uploadAvatar(user.id, file.buffer, filehash);
        return filehash;
    }
    getAvatar(hash) {
        return this.getAvatar(hash);
    }
    async patchProfile(user, body) {
        return this.profileService.updateProfile(user.id, body);
    }
    async getProfile(user) {
        const localProfile = await this.profileService.getProfile(user.id);
        if ((0, ramda_1.isNil)(localProfile)) {
            const remoteProfile = await this.profileService.getRemoteProfileById(user.id);
            if ((0, ramda_1.isNil)(remoteProfile)) {
                throw new common_1.HttpException('用户不存在', common_1.HttpStatus.BAD_REQUEST);
            }
            return this.profileService.createProfile({
                email: remoteProfile.email,
                id: remoteProfile.id,
                nick: remoteProfile.displayName ?? remoteProfile.email ?? '',
                bio: remoteProfile.bio ?? '',
            });
        }
        return localProfile;
    }
    async getProfileById(id) {
        const localProfile = await this.profileService.getProfile(id);
        if ((0, ramda_1.isNotNil)(localProfile)) {
            return localProfile;
        }
        const remoteProfile = await this.profileService.getRemoteProfileById(id);
        if ((0, ramda_1.isNil)(remoteProfile)) {
            throw new common_1.HttpException('用户不存在', common_1.HttpStatus.BAD_REQUEST);
        }
        await this.profileService.createProfile({
            email: remoteProfile.email,
            id: remoteProfile.id,
            nick: remoteProfile.displayName ?? remoteProfile.email ?? '',
            bio: remoteProfile.bio ?? '',
        });
        return localProfile;
    }
};
exports.ProfileController = ProfileController;
__decorate([
    (0, common_1.Post)('/avatar'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('file')),
    __param(0, (0, token_decorator_1.Token)()),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof UserPayload !== "undefined" && UserPayload) === "function" ? _b : Object, typeof (_d = typeof Express !== "undefined" && (_c = Express.Multer) !== void 0 && _c.File) === "function" ? _d : Object]),
    __metadata("design:returntype", Promise)
], ProfileController.prototype, "uploadAvatar", null);
__decorate([
    (0, common_1.Post)('/avatar/:hash'),
    (0, auth_decorator_1.Public)(),
    __param(0, (0, common_1.Param)('hash')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProfileController.prototype, "getAvatar", null);
__decorate([
    (0, common_1.Patch)('/'),
    __param(0, (0, token_decorator_1.Token)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_e = typeof UserPayload !== "undefined" && UserPayload) === "function" ? _e : Object, typeof (_f = typeof update_profile_dto_1.UpdateProfile !== "undefined" && update_profile_dto_1.UpdateProfile) === "function" ? _f : Object]),
    __metadata("design:returntype", Promise)
], ProfileController.prototype, "patchProfile", null);
__decorate([
    (0, common_1.Get)('/'),
    __param(0, (0, token_decorator_1.Token)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_g = typeof UserPayload !== "undefined" && UserPayload) === "function" ? _g : Object]),
    __metadata("design:returntype", Promise)
], ProfileController.prototype, "getProfile", null);
__decorate([
    (0, auth_decorator_1.Public)(),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProfileController.prototype, "getProfileById", null);
exports.ProfileController = ProfileController = __decorate([
    (0, common_1.Controller)('profile'),
    __metadata("design:paramtypes", [typeof (_a = typeof profile_service_1.ProfileService !== "undefined" && profile_service_1.ProfileService) === "function" ? _a : Object])
], ProfileController);


/***/ }),
/* 24 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Token = void 0;
const common_1 = __webpack_require__(5);
exports.Token = (0, common_1.createParamDecorator)((_, context) => {
    const http = context.switchToHttp();
    const req = http.getRequest();
    return req.user;
});


/***/ }),
/* 25 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Public = exports.IS_PUB = void 0;
const common_1 = __webpack_require__(5);
exports.IS_PUB = Symbol('');
const Public = () => (0, common_1.SetMetadata)(exports.IS_PUB, true);
exports.Public = Public;


/***/ }),
/* 26 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateProfile = exports.updateProfile = void 0;
const nestjs_zod_1 = __webpack_require__(15);
const zod_1 = __webpack_require__(27);
exports.updateProfile = zod_1.z.object({
    nick: zod_1.z.string(),
    bio: zod_1.z.string(),
});
class UpdateProfile extends (0, nestjs_zod_1.createZodDto)(exports.updateProfile) {
}
exports.UpdateProfile = UpdateProfile;


/***/ }),
/* 27 */
/***/ ((module) => {

module.exports = require("zod");

/***/ }),
/* 28 */
/***/ ((module) => {

module.exports = require("@nestjs/platform-express");

/***/ }),
/* 29 */
/***/ ((module) => {

module.exports = require("crypto");

/***/ }),
/* 30 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthModule = void 0;
const common_1 = __webpack_require__(5);
const auth_service_1 = __webpack_require__(31);
const auth_controller_1 = __webpack_require__(32);
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        controllers: [auth_controller_1.AuthController],
        providers: [auth_service_1.AuthService],
        exports: [auth_service_1.AuthService],
    })
], AuthModule);


/***/ }),
/* 31 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthService = void 0;
const nestjs_redis_1 = __webpack_require__(20);
const common_1 = __webpack_require__(5);
const crypto_1 = __webpack_require__(29);
let AuthService = class AuthService {
    redisService;
    SSO_PATH = process.env.SSO_PATH;
    redis;
    constructor(redisService) {
        this.redisService = redisService;
        this.redis = this.redisService.getOrThrow();
    }
    localTokenActive(token) {
        return this.redis.exists(`TK::AT::${token}`);
    }
    ssoTokenActive(token) {
        return this.redis.exists(`TK::AT::${token}`);
    }
    getToken(localToken) {
        return this.redis.get(`TK::AT::${localToken}`);
    }
    async introspectByLocalToken(token) {
        const accessToken = await this.getToken(token);
        if (!accessToken) {
            throw new common_1.HttpException('令牌过期', common_1.HttpStatus.UNAUTHORIZED);
        }
        return this.introspect(accessToken);
    }
    async introspect(token) {
        const headers = new Headers();
        headers.set('Content-Type', 'application/x-www-form-urlencoded');
        headers.set('Authorization', `Basic ${Buffer.from(`${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`).toString('base64url')}`);
        return fetch(`${process.env.SSO_PATH}/api/login/oauth/introspect`, {
            method: 'POST',
            headers,
            body: JSON.stringify({
                token: token,
                token_type_hint: 'access_token',
            }),
        })
            .then((resp) => resp.json())
            .then((body) => {
            return body;
        })
            .then((body) => {
            if (!body.active) {
                throw new common_1.HttpException('令牌过期', common_1.HttpStatus.UNAUTHORIZED);
            }
            return body;
        });
    }
    getTokenPair(code) {
        const url = new URL(`${this.SSO_PATH}/api/login/oauth/access_token`);
        return fetch(url.toString(), {
            method: 'POST',
            body: JSON.stringify({
                grant_type: process.env.grant_type ?? 'authorization_code',
                client_id: process.env.CLIENT_ID,
                client_secret: process.env.CLIENT_SECRET,
                code: code,
            }),
        })
            .then((resp) => resp.json())
            .then((body) => body)
            .catch((err) => {
            throw new common_1.HttpException(err.error_description, common_1.HttpStatus.BAD_REQUEST);
        });
    }
    async storageToken(id, accessToken, ttl) {
        const localToken = (0, crypto_1.randomBytes)(64).toString('base64url').slice(0, 32);
        await this.redis.psetex(`TK::AT::${accessToken}`, localToken, ttl);
        await this.redis.psetex(`TK::AT::${localToken}`, accessToken, ttl);
        await this.redis.psetex(`TOKEN::${localToken}`, id, ttl);
        await this.redis.psetex(`ID::TOKEN::${id}`, accessToken, ttl);
        return { localToken, ttl };
    }
    decodeToken(localToken) {
        return this.redis.get(`TOKEN::${localToken}`);
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof nestjs_redis_1.RedisService !== "undefined" && nestjs_redis_1.RedisService) === "function" ? _a : Object])
], AuthService);


/***/ }),
/* 32 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthController = void 0;
const common_1 = __webpack_require__(5);
const auth_service_1 = __webpack_require__(31);
const auth_decorator_1 = __webpack_require__(25);
let AuthController = class AuthController {
    authService;
    constructor(authService) {
        this.authService = authService;
    }
    async getToken(code) {
        const tokenPair = await this.authService.getTokenPair(code);
        const { id } = await this.authService.introspect(tokenPair.access_token);
        const localToken = await this.authService.storageToken(id, tokenPair.access_token, tokenPair.expires_in);
        return localToken;
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, auth_decorator_1.Public)(),
    (0, common_1.Get)('/token'),
    __param(0, (0, common_1.Query)('code')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "getToken", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [typeof (_a = typeof auth_service_1.AuthService !== "undefined" && auth_service_1.AuthService) === "function" ? _a : Object])
], AuthController);


/***/ }),
/* 33 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
const common_1 = __webpack_require__(5);
const core_1 = __webpack_require__(1);
const auth_service_1 = __webpack_require__(31);
const auth_decorator_1 = __webpack_require__(25);
let AuthGuard = class AuthGuard {
    refelctor;
    authService;
    constructor(refelctor, authService) {
        this.refelctor = refelctor;
        this.authService = authService;
    }
    async canActivate(context) {
        const isPublic = this.refelctor.getAllAndOverride(auth_decorator_1.IS_PUB, [
            context.getClass(),
            context.getHandler(),
        ]);
        if (isPublic) {
            return true;
        }
        const http = context.switchToHttp();
        const req = http.getRequest();
        const token = this.getToken(req);
        if (!token) {
            throw new common_1.HttpException('未登录', common_1.HttpStatus.UNAUTHORIZED);
        }
        const localTokenActive = await this.authService.localTokenActive(token);
        if (!localTokenActive) {
            throw new common_1.HttpException('令牌过期', common_1.HttpStatus.UNAUTHORIZED);
        }
        const ssoToken = await this.authService.getToken(token);
        if (!ssoToken) {
            throw new common_1.HttpException('令牌过期', common_1.HttpStatus.UNAUTHORIZED);
        }
        if (!(await this.authService.ssoTokenActive(ssoToken))) {
            throw new common_1.HttpException('令牌过期', common_1.HttpStatus.UNAUTHORIZED);
        }
        const id = await this.authService.decodeToken(token);
        if (!id) {
            throw new common_1.HttpException('令牌过期', common_1.HttpStatus.UNAUTHORIZED);
        }
        req.user = { id };
        return true;
    }
    getToken(req) {
        const auth = req.headers.authorization;
        if (!auth) {
            return null;
        }
        const [_, token] = auth.split(' ');
        return token;
    }
};
AuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof core_1.Reflector !== "undefined" && core_1.Reflector) === "function" ? _a : Object, typeof (_b = typeof auth_service_1.AuthService !== "undefined" && auth_service_1.AuthService) === "function" ? _b : Object])
], AuthGuard);
exports["default"] = AuthGuard;


/***/ }),
/* 34 */
/***/ ((module) => {

module.exports = require("dotenv");

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;

Object.defineProperty(exports, "__esModule", ({ value: true }));
const core_1 = __webpack_require__(1);
const app_module_1 = __webpack_require__(2);
const dotenv_1 = __webpack_require__(34);
const fs_1 = __webpack_require__(22);
const nest_winston_1 = __webpack_require__(11);
const path_1 = __webpack_require__(21);
if (false) {}
else {
    if ((0, fs_1.existsSync)('.prod.env')) {
        (0, dotenv_1.config)({ path: '.prod.env' });
    }
}
if ((0, fs_1.existsSync)((0, path_1.join)(__dirname, '../.env'))) {
    (0, dotenv_1.config)({ path: (0, path_1.join)(__dirname, '../.env'), debug: true });
}
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useLogger(app.get(nest_winston_1.WINSTON_MODULE_NEST_PROVIDER));
    await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

})();

/******/ })()
;
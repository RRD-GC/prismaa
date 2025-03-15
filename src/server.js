"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var prisma_1 = require("./prisma");
var app = (0, express_1.default)();
app.use(express_1.default.json());
// ✅ Create Account + Profile Together
app.post('/account', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, username, password, firstName, middleName, lastName, suffix, bio, picture, account, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, email = _a.email, username = _a.username, password = _a.password, firstName = _a.firstName, middleName = _a.middleName, lastName = _a.lastName, suffix = _a.suffix, bio = _a.bio, picture = _a.picture;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, prisma_1.default.account.create({
                        data: {
                            email: email,
                            username: username,
                            password: password,
                            profile: {
                                create: {
                                    firstName: firstName,
                                    middleName: middleName,
                                    lastName: lastName,
                                    suffix: suffix,
                                    bio: bio,
                                    picture: picture,
                                }
                            }
                        },
                        include: {
                            profile: true
                        }
                    })];
            case 2:
                account = _b.sent();
                res.status(201).json(account);
                return [3 /*break*/, 4];
            case 3:
                error_1 = _b.sent();
                res.status(500).json({ error: error_1.message });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
// ✅ Add Modules to an Existing Account
app.post('/account/:id/module', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, _a, moduleCode, moduleDetails, moduleDesc, account, module_1, error_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                id = req.params.id;
                _a = req.body, moduleCode = _a.moduleCode, moduleDetails = _a.moduleDetails, moduleDesc = _a.moduleDesc;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 4, , 5]);
                return [4 /*yield*/, prisma_1.default.account.findUnique({
                        where: { id: parseInt(id) }
                    })];
            case 2:
                account = _b.sent();
                if (!account) {
                    return [2 /*return*/, res.status(404).json({ error: 'Account not found' })];
                }
                return [4 /*yield*/, prisma_1.default.module.create({
                        data: {
                            accountCode: parseInt(id),
                            moduleCode: moduleCode,
                            moduleDetails: moduleDetails,
                            moduleDesc: moduleDesc
                        }
                    })];
            case 3:
                module_1 = _b.sent();
                res.status(201).json(module_1);
                return [3 /*break*/, 5];
            case 4:
                error_2 = _b.sent();
                res.status(500).json({ error: error_2.message });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
// ✅ Retrieve All Accounts with Profiles and Modules
app.get('/accounts', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var accounts, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, prisma_1.default.account.findMany({
                        include: {
                            profile: true,
                            modules: true
                        }
                    })];
            case 1:
                accounts = _a.sent();
                res.status(200).json(accounts);
                return [3 /*break*/, 3];
            case 2:
                error_3 = _a.sent();
                res.status(500).json({ error: error_3.message });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// ✅ Retrieve a Specific Account with Profile and Modules
app.get('/account/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, account, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, prisma_1.default.account.findUnique({
                        where: { id: parseInt(id) },
                        include: {
                            profile: true,
                            modules: true
                        }
                    })];
            case 2:
                account = _a.sent();
                if (!account) {
                    return [2 /*return*/, res.status(404).json({ error: 'Account not found' })];
                }
                res.status(200).json(account);
                return [3 /*break*/, 4];
            case 3:
                error_4 = _a.sent();
                res.status(500).json({ error: error_4.message });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
// ✅ Delete an Account
app.delete('/account/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, deletedAccount, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, prisma_1.default.account.delete({
                        where: { id: parseInt(id) }
                    })];
            case 2:
                deletedAccount = _a.sent();
                res.json({ message: 'Account deleted successfully', deletedAccount: deletedAccount });
                return [3 /*break*/, 4];
            case 3:
                error_5 = _a.sent();
                res.status(500).json({ error: error_5.message });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
// ✅ Start the server
var PORT = process.env.PORT || 3000;
app.listen(PORT, function () { return console.log("\uD83D\uDE80 Server running on http://localhost:".concat(PORT)); });

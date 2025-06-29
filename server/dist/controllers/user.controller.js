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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.update = exports.SignIn = exports.signUp = exports.getUsers = void 0;
const user_model_1 = require("../models/user.model");
const zod_1 = __importDefault(require("zod"));
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const account_model_1 = require("../models/account.model");
dotenv_1.default.config();
const userSchema = zod_1.default.object({
    username: zod_1.default.string(),
    email: zod_1.default.string().email(),
    password: zod_1.default.string().min(8),
});
const loginSchema = zod_1.default.object({
    username: zod_1.default.string(),
    password: zod_1.default.string().min(8),
});
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user_model_1.User.find();
        res.json({
            users: users,
        });
    }
    catch (error) {
        res.status(404).json({
            message: "here at get users"
        });
    }
});
exports.getUsers = getUsers;
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const { success } = userSchema.safeParse(body);
        if (!success) {
            return res.json({
                message: "check your inputs",
            });
        }
        console.log("Router loaded");
        const user = yield user_model_1.User.findOne({
            username: body.username,
        });
        if (user) {
            return res.json({
                message: "invalid",
            });
        }
        const createe = yield user_model_1.User.create(body);
        yield account_model_1.Account.create({
            userId: createe._id,
            balance: 1 + Math.random() * 1000,
        });
        const jwt1 = process.env.JWT_SECRET;
        if (!jwt1) {
            throw new Error("JWT_SECRET is not defined in environment variables.");
        }
        const token = jsonwebtoken_1.default.sign({ userId: createe._id }, jwt1);
        res.json({
            message: "user created",
            token: token,
        });
    }
    catch (err) {
        res.status(404).json({
            message: "here at signup"
        });
    }
});
exports.signUp = signUp;
const SignIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { success } = loginSchema.safeParse(req.body);
        if (!success) {
            res.status(301).json({
                message: "incorrect inputs",
            });
        }
        const user = yield user_model_1.User.findOne({
            username: req.body.username,
            password: req.body.password,
        });
        if (!user._id) {
            res.status(301).json({
                message: "user doesnt exist",
            });
        }
        if (!process.env.JWT_SECRET) {
            throw Error("HI");
        }
        const token = jsonwebtoken_1.default.sign({
            userId: user._id,
        }, process.env.JWT_SECRET);
        res.json({
            token: token,
        });
    }
    catch (e) {
        res.status(404).json({
            message: "here at signin"
        });
    }
});
exports.SignIn = SignIn;
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { success } = userSchema.safeParse(req.body);
    if (!success) {
        res.status(301).json({
            message: "incorrect inputs",
        });
    }
    const user = yield user_model_1.User.findOne({
        username: req.body.username,
    });
    if (user) {
        yield user_model_1.User.updateOne({ _id: req.userId }, req.body);
    }
});
exports.update = update;

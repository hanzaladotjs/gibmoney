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
exports.Send = exports.balance = void 0;
const account_model_1 = require("../models/account.model");
const mongoose_1 = __importDefault(require("mongoose"));
const balance = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const account = yield account_model_1.Account.findOne({
        userId: req.userId,
    });
    res.json({
        balance: account === null || account === void 0 ? void 0 : account.balance,
    });
});
exports.balance = balance;
const Send = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("hi from send ");
    const { amount, address } = req.body;
    const account = yield account_model_1.Account.findOne({
        userId: req.userId
    });
    if (account.balance < amount) {
        return res.status(301).json({
            message: "not enough balance"
        });
    }
    const trans = yield account_model_1.Account.findOne({
        userId: address
    });
    const transaction = yield mongoose_1.default.startSession();
    transaction.startTransaction();
    yield account_model_1.Account.updateOne({ userId: trans.userId }, {
        $inc: { balance: amount }
    });
    yield account_model_1.Account.updateOne({
        userId: req.userId
    }, {
        $inc: { balance: -amount }
    });
    yield transaction.commitTransaction();
    transaction.endSession();
    res.status(200).json({
        message: "success"
    });
});
exports.Send = Send;

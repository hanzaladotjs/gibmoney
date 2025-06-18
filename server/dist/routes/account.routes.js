"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const account_controller_1 = require("../controllers/account.controller");
const auth_1 = __importDefault(require("../middlewares/auth"));
const account_controller_2 = require("../controllers/account.controller");
const router = (0, express_1.default)();
router.get("/balance", auth_1.default, account_controller_1.balance);
router.put("/send/", auth_1.default, account_controller_2.Send);
exports.default = router;

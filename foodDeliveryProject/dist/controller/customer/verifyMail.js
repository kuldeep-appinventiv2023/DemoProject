"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const customerModel_1 = __importDefault(require("../../models/customerModel"));
async function verifyMail(req, res) {
    try {
        const findInfo = await customerModel_1.default.findOne({ _id: req.query.id, verified: true });
        if (findInfo) {
            res.status(200).json({
                message: 'Your email has been already verified.',
                next: 'Please Login! To the APP',
            });
        }
        else {
            const updateInfo = await customerModel_1.default.updateOne({ _id: req.query.id }, { $set: { verified: true } });
            console.log(updateInfo);
            res.status(200).json({
                message: 'Your email has been verified.',
                next: 'Please Login! To the APP',
            });
        }
    }
    catch (error) {
        console.log(error.message);
    }
}
exports.default = verifyMail;
//# sourceMappingURL=verifyMail.js.map
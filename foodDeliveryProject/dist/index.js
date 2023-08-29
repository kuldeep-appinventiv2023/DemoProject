"use strict";
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
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path = __importStar(require("path"));
const YAML = __importStar(require("yamljs"));
const connection_1 = require("./database/connection");
const profileRoutes_1 = __importDefault(require("./routes/admin/profileRoutes"));
const profileRoutes_2 = __importDefault(require("./routes/customer/profileRoutes"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const restaurantRoutes_1 = __importDefault(require("./routes/admin/restaurantRoutes"));
const restaurantRoutes_2 = __importDefault(require("./routes/customer/restaurantRoutes"));
const categoryRoutes_1 = __importDefault(require("./routes/admin/categoryRoutes"));
const categoryRoutes_2 = __importDefault(require("./routes/customer/categoryRoutes"));
const menuRoutes_1 = __importDefault(require("./routes/admin/menuRoutes"));
const restaurantRoutes_3 = __importDefault(require("./routes/customer/restaurantRoutes"));
const itemRoutes_1 = __importDefault(require("./routes/admin/itemRoutes"));
const itemRoutes_2 = __importDefault(require("./routes/customer/itemRoutes"));
const cartRoutes_1 = __importDefault(require("./routes/customer/cartRoutes"));
const deliveryStaffRoutes_1 = __importDefault(require("./routes/admin/deliveryStaffRoutes"));
const orderRoutes_1 = __importDefault(require("./routes/customer/orderRoutes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
(0, connection_1.connectToDatabase)();
const swaggerDocument = YAML.load(path.join(__dirname, '../swagger.yaml'));
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocument));
app.use(profileRoutes_1.default, profileRoutes_2.default, restaurantRoutes_1.default, restaurantRoutes_2.default, categoryRoutes_1.default, categoryRoutes_2.default, menuRoutes_1.default, restaurantRoutes_3.default, itemRoutes_1.default, itemRoutes_2.default, cartRoutes_1.default, deliveryStaffRoutes_1.default, orderRoutes_1.default);
app.get("/", (req, res) => {
    res.send("Hii.....");
});
const port = 4002;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
//# sourceMappingURL=index.js.map
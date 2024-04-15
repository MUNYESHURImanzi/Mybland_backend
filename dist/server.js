"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const Routers_1 = __importDefault(require("./src/Routers"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_json_1 = __importDefault(require("./src/Documentation/swagger.json"));
const DATABASE_URL = 'mongodb+srv://munyeshuri:Munyeshuri@cluster0.yqd0pr4.mongodb.net/mydatabase?retryWrites=true&w=majority';
mongoose_1.default.connect(DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB connected successfully.'))
    .catch((error) => console.error('MongoDB connection error:', error));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_json_1.default));
const cors = require("cors");
const corsOptions = {
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
const router = express_1.default.Router();
(0, Routers_1.default)(router);
app.use("/", router);
const port = 3000;
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

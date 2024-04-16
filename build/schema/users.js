"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const signInSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: [true, "Name is required"]
    },
    email: {
        type: String,
        required: [true, "Email is required"]
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    }
});
const SignInModel = mongoose_1.default.model("signIn", signInSchema);
exports.default = SignInModel;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlcnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvc2NoZW1hL3VzZXJzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsd0RBQTZEO0FBVTdELE1BQU0sWUFBWSxHQUFvQixJQUFJLGtCQUFRLENBQUMsTUFBTSxDQUFDO0lBQ3RELElBQUksRUFBRTtRQUNGLElBQUksRUFBRSxNQUFNO1FBQ1osUUFBUSxFQUFFLENBQUMsSUFBSSxFQUFFLGtCQUFrQixDQUFDO0tBQ3ZDO0lBQ0QsS0FBSyxFQUFFO1FBQ0gsSUFBSSxFQUFFLE1BQU07UUFDWixRQUFRLEVBQUUsQ0FBQyxJQUFJLEVBQUUsbUJBQW1CLENBQUM7S0FDeEM7SUFDRCxRQUFRLEVBQUU7UUFDTixJQUFJLEVBQUUsTUFBTTtRQUNaLFFBQVEsRUFBRSxDQUFDLElBQUksRUFBRSxzQkFBc0IsQ0FBQztLQUMzQztDQUNKLENBQUMsQ0FBQztBQUdILE1BQU0sV0FBVyxHQUFtQixrQkFBUSxDQUFDLEtBQUssQ0FBVSxRQUFRLEVBQUUsWUFBWSxDQUFDLENBQUM7QUFFcEYsa0JBQWUsV0FBVyxDQUFDIn0=
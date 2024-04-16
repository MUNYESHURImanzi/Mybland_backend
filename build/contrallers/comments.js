"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.readAllComments = exports.readCommentsById = exports.addComment = void 0;
const comments_1 = __importDefault(require("../schema/comments"));
const addComment = async (req, res) => {
    try {
        const { email, comment } = req.body;
        const articleId = req.params.id;
        const newComment = new comments_1.default({
            email,
            comment,
            articleId
        });
        const savedComment = await newComment.save();
        res.status(200).json({
            message: "Comment saved successfully",
            error: null,
            data: savedComment
        });
    }
    catch (error) {
        console.error("Error occurred while saving the comment:", error);
        res.status(500).json({
            message: "Failed to save the comment",
            error: error.message || "Internal Server Error"
        });
    }
};
exports.addComment = addComment;
const readCommentsById = async (req, res) => {
    try {
        const articleId = req.params.id;
        const comments = await comments_1.default.find({ articleId });
        res.status(200).json({
            message: "Comments retrieved successfully",
            error: null,
            data: comments
        });
    }
    catch (error) {
        console.error("Error occurred while reading comments:", error);
        res.status(500).json({
            message: "Failed to retrieve comments",
            error: error.message || "Internal Server Error"
        });
    }
};
exports.readCommentsById = readCommentsById;
const readAllComments = async (req, res) => {
    try {
        const comments = await comments_1.default.find();
        res.status(200).json({
            message: "All comments retrieved successfully",
            error: null,
            data: comments
        });
    }
    catch (error) {
        console.error("Error occurred while reading all comments:", error);
        res.status(500).json({
            message: "Failed to retrieve all comments",
            error: error.message || "Internal Server Error"
        });
    }
};
exports.readAllComments = readAllComments;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbWVudHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29udHJhbGxlcnMvY29tbWVudHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQ0Esa0VBQTBDO0FBRTFDLE1BQU0sVUFBVSxHQUFHLEtBQUssRUFBRSxHQUFZLEVBQUUsR0FBYSxFQUFpQixFQUFFO0lBQ3RFLElBQUksQ0FBQztRQUNILE1BQU0sRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQztRQUNwQyxNQUFNLFNBQVMsR0FBVyxHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQztRQUV4QyxNQUFNLFVBQVUsR0FBRyxJQUFJLGtCQUFRLENBQUM7WUFDOUIsS0FBSztZQUNMLE9BQU87WUFDUCxTQUFTO1NBQ1YsQ0FBQyxDQUFDO1FBRUgsTUFBTSxZQUFZLEdBQUcsTUFBTSxVQUFVLENBQUMsSUFBSSxFQUFFLENBQUM7UUFFN0MsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUM7WUFDbkIsT0FBTyxFQUFFLDRCQUE0QjtZQUNyQyxLQUFLLEVBQUUsSUFBSTtZQUNYLElBQUksRUFBRSxZQUFZO1NBQ25CLENBQUMsQ0FBQztJQUNMLENBQUM7SUFBQyxPQUFPLEtBQVMsRUFBRSxDQUFDO1FBQ25CLE9BQU8sQ0FBQyxLQUFLLENBQUMsMENBQTBDLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDakUsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUM7WUFDbkIsT0FBTyxFQUFFLDRCQUE0QjtZQUNyQyxLQUFLLEVBQUUsS0FBSyxDQUFDLE9BQU8sSUFBSSx1QkFBdUI7U0FDaEQsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztBQUNILENBQUMsQ0FBQztBQTJDUyxnQ0FBVTtBQXhDckIsTUFBTSxnQkFBZ0IsR0FBRyxLQUFLLEVBQUUsR0FBWSxFQUFFLEdBQWEsRUFBaUIsRUFBRTtJQUM1RSxJQUFJLENBQUM7UUFDSCxNQUFNLFNBQVMsR0FBVyxHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQztRQUd4QyxNQUFNLFFBQVEsR0FBRyxNQUFNLGtCQUFRLENBQUMsSUFBSSxDQUFDLEVBQUUsU0FBUyxFQUFFLENBQUMsQ0FBQztRQUVwRCxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQztZQUNuQixPQUFPLEVBQUUsaUNBQWlDO1lBQzFDLEtBQUssRUFBRSxJQUFJO1lBQ1gsSUFBSSxFQUFFLFFBQVE7U0FDZixDQUFDLENBQUM7SUFDTCxDQUFDO0lBQUMsT0FBTyxLQUFVLEVBQUUsQ0FBQztRQUNwQixPQUFPLENBQUMsS0FBSyxDQUFDLHdDQUF3QyxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQy9ELEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDO1lBQ25CLE9BQU8sRUFBRSw2QkFBNkI7WUFDdEMsS0FBSyxFQUFFLEtBQUssQ0FBQyxPQUFPLElBQUksdUJBQXVCO1NBQ2hELENBQUMsQ0FBQztJQUNMLENBQUM7QUFDSCxDQUFDLENBQUM7QUFxQnFCLDRDQUFnQjtBQW5CdkMsTUFBTSxlQUFlLEdBQUcsS0FBSyxFQUFFLEdBQVksRUFBRSxHQUFhLEVBQWlCLEVBQUU7SUFDekUsSUFBSSxDQUFDO1FBRUgsTUFBTSxRQUFRLEdBQUcsTUFBTSxrQkFBUSxDQUFDLElBQUksRUFBRSxDQUFDO1FBRXZDLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDO1lBQ25CLE9BQU8sRUFBRSxxQ0FBcUM7WUFDOUMsS0FBSyxFQUFFLElBQUk7WUFDWCxJQUFJLEVBQUUsUUFBUTtTQUNmLENBQUMsQ0FBQztJQUNMLENBQUM7SUFBQyxPQUFPLEtBQVMsRUFBRSxDQUFDO1FBQ25CLE9BQU8sQ0FBQyxLQUFLLENBQUMsNENBQTRDLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDbkUsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUM7WUFDbkIsT0FBTyxFQUFFLGlDQUFpQztZQUMxQyxLQUFLLEVBQUUsS0FBSyxDQUFDLE9BQU8sSUFBSSx1QkFBdUI7U0FDaEQsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztBQUNILENBQUMsQ0FBQztBQUVxQywwQ0FBZSJ9
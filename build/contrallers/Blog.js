"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.moreArticle = exports.addingComments = exports.deleteArticle = exports.updateArticle = exports.createArticle = exports.getSingleArticle = exports.getAllArticles = void 0;
const Blog_1 = __importDefault(require("../schema/Blog"));
const comments_1 = __importDefault(require("../schema/comments"));
const cloudinary_1 = __importDefault(require("cloudinary"));
require('dotenv').config();
cloudinary_1.default.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});
const getAllArticles = async (req, res) => {
    try {
        const articles = await Blog_1.default.find();
        res.status(200).json({
            message: 'All articles retrieved successfully',
            data: articles,
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({
            message: 'Failed to retrieve articles',
            error: err.message,
        });
    }
};
exports.getAllArticles = getAllArticles;
const createArticle = async (req, res) => {
    try {
        const { title, content, author } = req.body;
        let file = '';
        if (!req.file) {
            return res.status(400).json({
                message: 'file file is required',
            });
        }
        const result = await cloudinary_1.default.v2.uploader.upload(req.file.path);
        file = result.secure_url;
        console.log('Uploaded file:', file);
        const articleInstance = new Blog_1.default({
            title,
            content,
            author: author || 'munyeshuyi',
            file,
        });
        const savedArticle = await articleInstance.save();
        res.status(200).json({
            message: 'Article saved successfully',
            data: savedArticle,
        });
    }
    catch (err) {
        console.error(err);
        const failedData = {
            title: req.body.title,
            content: req.body.content,
            author: req.body.author,
            file: req.file ? req.file : 'File data missing',
        };
        console.error('Error uploading file:', err);
        res.status(500).json({
            message: 'Failed to save the article',
            error: err.message,
            failedData: failedData,
        });
    }
};
exports.createArticle = createArticle;
const updateArticle = async (req, res) => {
    try {
        const articleId = req.params.articleId;
        const updates = req.body;
        let fileUrl = '';
        if (req.file) {
            const result = await cloudinary_1.default.v2.uploader.upload(req.file.path);
            fileUrl = result.secure_url;
            updates.file = fileUrl;
        }
        const updatedArticle = await Blog_1.default.findByIdAndUpdate(articleId, updates, { new: true });
        if (!updatedArticle) {
            return res.status(404).json({
                message: 'Article not found',
            });
        }
        // Article updated successfully
        res.status(200).json({
            message: 'Article updated successfully',
            data: updatedArticle,
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({
            message: 'Failed to update the article',
            error: err.message,
        });
    }
};
exports.updateArticle = updateArticle;
const deleteArticle = async (req, res) => {
    try {
        const articleId = req.params.articleId;
        const deletedArticle = await Blog_1.default.findByIdAndDelete(articleId);
        if (!deletedArticle) {
            res.status(404).json({
                message: 'Article not found',
            });
            return;
        }
        res.status(200).json({
            message: 'Article deleted successfully',
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({
            message: 'Failed to delete the article',
            error: err.message,
        });
    }
};
exports.deleteArticle = deleteArticle;
const addingComments = async (req, res) => {
    try {
        const { email, comment } = req.body;
        const commentInstance = new comments_1.default({
            email,
            comment,
            articleId: req.params.articleId,
        });
        const savedComment = await commentInstance.save();
        res.status(200).json({
            message: 'Comment saved successfully',
            data: savedComment,
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({
            message: 'Failed to save the comment',
            error: err.message,
        });
    }
};
exports.addingComments = addingComments;
const getSingleArticle = async (req, res) => {
    try {
        const articleId = req.params.articleId;
        const article = await Blog_1.default.findById(articleId);
        if (!article) {
            res.status(404).json({
                message: 'Article not found',
            });
            return;
        }
        res.status(200).json({
            message: 'Article retrieved successfully',
            data: article,
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({
            message: 'Failed to retrieve the article',
            error: err.message,
        });
    }
};
exports.getSingleArticle = getSingleArticle;
const moreArticle = (req, res) => {
};
exports.moreArticle = moreArticle;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQmxvZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250cmFsbGVycy9CbG9nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUNBLDBEQUEwQztBQUMxQyxrRUFBMEM7QUFDMUMsNERBQW9DO0FBRXBDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztBQUszQixvQkFBVSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7SUFDakIsVUFBVSxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMscUJBQXFCO0lBQzdDLE9BQU8sRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLGtCQUFrQjtJQUN2QyxVQUFVLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxxQkFBcUI7Q0FDaEQsQ0FBQyxDQUFDO0FBRUgsTUFBTSxjQUFjLEdBQUcsS0FBSyxFQUFFLEdBQVksRUFBRSxHQUFhLEVBQUUsRUFBRTtJQUN6RCxJQUFJLENBQUM7UUFDRCxNQUFNLFFBQVEsR0FBRyxNQUFNLGNBQVksQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUMzQyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQztZQUNqQixPQUFPLEVBQUUscUNBQXFDO1lBQzlDLElBQUksRUFBRSxRQUFRO1NBQ2pCLENBQUMsQ0FBQztJQUNQLENBQUM7SUFBQyxPQUFPLEdBQVEsRUFBRSxDQUFDO1FBQ2hCLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDbkIsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUM7WUFDakIsT0FBTyxFQUFFLDZCQUE2QjtZQUN0QyxLQUFLLEVBQUUsR0FBRyxDQUFDLE9BQU87U0FDckIsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztBQUNMLENBQUMsQ0FBQztBQTJKTyx3Q0FBYztBQXpKdkIsTUFBTSxhQUFhLEdBQUcsS0FBSyxFQUFFLEdBQWtCLEVBQUUsR0FBYSxFQUFFLEVBQUU7SUFDOUQsSUFBSSxDQUFDO1FBQ0QsTUFBTSxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQztRQUM1QyxJQUFJLElBQUksR0FBRyxFQUFFLENBQUM7UUFHZCxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ1osT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQztnQkFDeEIsT0FBTyxFQUFFLHVCQUF1QjthQUVuQyxDQUFDLENBQUM7UUFDUCxDQUFDO1FBRUQsTUFBTSxNQUFNLEdBQUcsTUFBTSxvQkFBVSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFbEUsSUFBSSxHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUM7UUFDekIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUVwQyxNQUFNLGVBQWUsR0FBRyxJQUFJLGNBQVksQ0FBQztZQUNyQyxLQUFLO1lBQ0wsT0FBTztZQUNQLE1BQU0sRUFBRSxNQUFNLElBQUksWUFBWTtZQUM5QixJQUFJO1NBQ1AsQ0FBQyxDQUFDO1FBRUgsTUFBTSxZQUFZLEdBQUcsTUFBTSxlQUFlLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDbEQsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUM7WUFDakIsT0FBTyxFQUFFLDRCQUE0QjtZQUNyQyxJQUFJLEVBQUUsWUFBWTtTQUNyQixDQUFDLENBQUM7SUFDUCxDQUFDO0lBQUMsT0FBTyxHQUFRLEVBQUUsQ0FBQztRQUNoQixPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ25CLE1BQU0sVUFBVSxHQUFHO1lBQ2YsS0FBSyxFQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSztZQUNyQixPQUFPLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPO1lBQ3pCLE1BQU0sRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU07WUFDdkIsSUFBSSxFQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLG1CQUFtQjtTQUNsRCxDQUFDO1FBQ0YsT0FBTyxDQUFDLEtBQUssQ0FBQyx1QkFBdUIsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUM1QyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQztZQUNqQixPQUFPLEVBQUUsNEJBQTRCO1lBQ3JDLEtBQUssRUFBRSxHQUFHLENBQUMsT0FBTztZQUNsQixVQUFVLEVBQUUsVUFBVTtTQUV6QixDQUFDLENBQUM7SUFDUCxDQUFDO0FBQ0wsQ0FBQyxDQUFDO0FBMkd3QyxzQ0FBYTtBQXpHdkQsTUFBTSxhQUFhLEdBQW1CLEtBQUssRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEVBQUU7SUFDckQsSUFBSSxDQUFDO1FBQ0QsTUFBTSxTQUFTLEdBQVcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUM7UUFDL0MsTUFBTSxPQUFPLEdBQWlCLEdBQUcsQ0FBQyxJQUFJLENBQUM7UUFFdkMsSUFBSSxPQUFPLEdBQUcsRUFBRSxDQUFDO1FBQ2pCLElBQUksR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ1gsTUFBTSxNQUFNLEdBQUcsTUFBTSxvQkFBVSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDbEUsT0FBTyxHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUM7WUFDNUIsT0FBTyxDQUFDLElBQUksR0FBRyxPQUFPLENBQUM7UUFDM0IsQ0FBQztRQUNELE1BQU0sY0FBYyxHQUFHLE1BQU0sY0FBWSxDQUFDLGlCQUFpQixDQUFDLFNBQVMsRUFBRSxPQUFPLEVBQUUsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztRQUUvRixJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7WUFDbEIsT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQztnQkFDeEIsT0FBTyxFQUFFLG1CQUFtQjthQUMvQixDQUFDLENBQUM7UUFDUCxDQUFDO1FBRUQsK0JBQStCO1FBQy9CLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDO1lBQ2pCLE9BQU8sRUFBRSw4QkFBOEI7WUFDdkMsSUFBSSxFQUFFLGNBQWM7U0FDdkIsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUFDLE9BQU8sR0FBUSxFQUFFLENBQUM7UUFDaEIsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNuQixHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQztZQUNqQixPQUFPLEVBQUUsOEJBQThCO1lBQ3ZDLEtBQUssRUFBRSxHQUFHLENBQUMsT0FBTztTQUNyQixDQUFDLENBQUM7SUFDUCxDQUFDO0FBQ0wsQ0FBQyxDQUFDO0FBMEV1RCxzQ0FBYTtBQXZFdEUsTUFBTSxhQUFhLEdBQUcsS0FBSyxFQUFFLEdBQVksRUFBRSxHQUFhLEVBQUUsRUFBRTtJQUN4RCxJQUFJLENBQUM7UUFDRCxNQUFNLFNBQVMsR0FBVyxHQUFHLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQztRQUUvQyxNQUFNLGNBQWMsR0FBRyxNQUFNLGNBQVksQ0FBQyxpQkFBaUIsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUN2RSxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7WUFDbEIsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUM7Z0JBQ2pCLE9BQU8sRUFBRSxtQkFBbUI7YUFDL0IsQ0FBQyxDQUFDO1lBQ0gsT0FBTztRQUNYLENBQUM7UUFDRCxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQztZQUNqQixPQUFPLEVBQUUsOEJBQThCO1NBQzFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFBQyxPQUFPLEdBQVEsRUFBRSxDQUFDO1FBQ2hCLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDbkIsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUM7WUFDakIsT0FBTyxFQUFFLDhCQUE4QjtZQUN2QyxLQUFLLEVBQUUsR0FBRyxDQUFDLE9BQU87U0FDckIsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztBQUNMLENBQUMsQ0FBQztBQWtEc0Usc0NBQWE7QUFoRHJGLE1BQU0sY0FBYyxHQUFHLEtBQUssRUFBRSxHQUFZLEVBQUUsR0FBYSxFQUFFLEVBQUU7SUFDekQsSUFBSSxDQUFDO1FBQ0QsTUFBTSxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDO1FBQ3BDLE1BQU0sZUFBZSxHQUFHLElBQUksa0JBQVEsQ0FBQztZQUNqQyxLQUFLO1lBQ0wsT0FBTztZQUNQLFNBQVMsRUFBRSxHQUFHLENBQUMsTUFBTSxDQUFDLFNBQVM7U0FDbEMsQ0FBQyxDQUFDO1FBRUgsTUFBTSxZQUFZLEdBQUcsTUFBTSxlQUFlLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDbEQsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUM7WUFDakIsT0FBTyxFQUFFLDRCQUE0QjtZQUNyQyxJQUFJLEVBQUUsWUFBWTtTQUNyQixDQUFDLENBQUM7SUFDUCxDQUFDO0lBQUMsT0FBTyxHQUFRLEVBQUUsQ0FBQztRQUNoQixPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ25CLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDO1lBQ2pCLE9BQU8sRUFBRSw0QkFBNEI7WUFDckMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxPQUFPO1NBQ3JCLENBQUMsQ0FBQztJQUNQLENBQUM7QUFDTCxDQUFDLENBQUM7QUEyQnFGLHdDQUFjO0FBekJyRyxNQUFNLGdCQUFnQixHQUFHLEtBQUssRUFBRSxHQUFZLEVBQUUsR0FBYSxFQUFFLEVBQUU7SUFDM0QsSUFBSSxDQUFDO1FBQ0QsTUFBTSxTQUFTLEdBQVcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUM7UUFDL0MsTUFBTSxPQUFPLEdBQUcsTUFBTSxjQUFZLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3ZELElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUNYLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDO2dCQUNqQixPQUFPLEVBQUUsbUJBQW1CO2FBQy9CLENBQUMsQ0FBQztZQUNILE9BQU87UUFDWCxDQUFDO1FBQ0QsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUM7WUFDakIsT0FBTyxFQUFFLGdDQUFnQztZQUN6QyxJQUFJLEVBQUUsT0FBTztTQUNoQixDQUFDLENBQUM7SUFDUCxDQUFDO0lBQUMsT0FBTyxHQUFRLEVBQUUsQ0FBQztRQUNoQixPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ25CLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDO1lBQ2pCLE9BQU8sRUFBRSxnQ0FBZ0M7WUFDekMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxPQUFPO1NBQ3JCLENBQUMsQ0FBQztJQUNQLENBQUM7QUFDTCxDQUFDLENBQUM7QUFJc0IsNENBQWdCO0FBSHhDLE1BQU0sV0FBVyxHQUFHLENBQUMsR0FBWSxFQUFFLEdBQWEsRUFBRSxFQUFFO0FBRXBELENBQUMsQ0FBQztBQUNxRyxrQ0FBVyJ9
import { Request, Response } from 'express';
import ArticleModel from '../schema/Blog';
import Comments from '../schema/comments';
import cloudinary from 'cloudinary';


interface MulterRequest extends Request {
    file: any;
}

cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const getAllArticles = async (req: Request, res: Response) => {
    try {
        const articles = await ArticleModel.find();
        res.status(200).json({
            message: 'All articles retrieved successfully',
            data: articles,
        });
    } catch (err: any) {
        console.error(err);
        res.status(500).json({
            message: 'Failed to retrieve articles',
            error: err.message,
        });
    }
};

const createArticle = async (req: MulterRequest, res: Response) => {
    try {
        const { title, content, author } = req.body;
        let file = ''; 

        
        if (!req.file) {
            return res.status(400).json({
                message: 'file file is required',
                
            });
        }

        const result = await cloudinary.v2.uploader.upload(req.file.path);
       
        file = result.secure_url;
        console.log('Uploaded file:', file);

        const articleInstance = new ArticleModel({
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
    } catch (err: any) {
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

const updateArticle = async (req: Request, res: Response) => {
    try {
        const articleId: string = req.params.articleId;
        const updates: Partial<any> = req.body;

        const updatedArticle = await ArticleModel.findByIdAndUpdate(articleId, updates, { new: true });
        if (!updatedArticle) {
            res.status(404).json({
                message: 'Article not found',
            });
            return;
        }
        res.status(200).json({
            message: 'Article updated successfully',
            data: updatedArticle,
        });
    } catch (err: any) {
        console.error(err);
        res.status(500).json({
            message: 'Failed to update the article',
            error: err.message,
        });
    }
};

const deleteArticle = async (req: Request, res: Response) => {
    try {
        const articleId: string = req.params.articleId;

        const deletedArticle = await ArticleModel.findByIdAndDelete(articleId);
        if (!deletedArticle) {
            res.status(404).json({
                message: 'Article not found',
            });
            return;
        }
        res.status(200).json({
            message: 'Article deleted successfully',
        });
    } catch (err: any) {
        console.error(err);
        res.status(500).json({
            message: 'Failed to delete the article',
            error: err.message,
        });
    }
};

const addingComments = async (req: Request, res: Response) => {
    try {
        const { email, comment } = req.body;
        const commentInstance = new Comments({
            email,
            comment,
            articleId: req.params.articleId,
        });

        const savedComment = await commentInstance.save();
        res.status(200).json({
            message: 'Comment saved successfully',
            data: savedComment,
        });
    } catch (err: any) {
        console.error(err);
        res.status(500).json({
            message: 'Failed to save the comment',
            error: err.message,
        });
    }
};

const moreArticle = (req: Request, res: Response) => {

};

export { getAllArticles, createArticle, updateArticle, deleteArticle, addingComments, moreArticle };

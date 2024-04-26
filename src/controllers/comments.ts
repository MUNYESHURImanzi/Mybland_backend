import { Request, Response } from 'express';
import Comments from "../schema/comments";

const addComment = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, comment } = req.body;
    const articleId: string = req.params.id;

    const newComment = new Comments({
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
  } catch (error:any) {
    console.error("Error occurred while saving the comment:", error);
    res.status(500).json({
      message: "Failed to save the comment",
      error: error.message || "Internal Server Error"
    });
  }
};


const readCommentsById = async (req: Request, res: Response): Promise<void> => {
  try {
    const articleId: string = req.params.id;

   
    const comments = await Comments.find({ articleId });

    res.status(200).json({
      message: "Comments retrieved successfully",
      error: null,
      data: comments
    });
  } catch (error: any) {
    console.error("Error occurred while reading comments:", error);
    res.status(500).json({
      message: "Failed to retrieve comments",
      error: error.message || "Internal Server Error"
    });
  }
};

const readAllComments = async (req: Request, res: Response): Promise<void> => {
    try {

      const comments = await Comments.find();
  
      res.status(200).json({
        message: "All comments retrieved successfully",
        error: null,
        data: comments
      });
    } catch (error:any) {
      console.error("Error occurred while reading all comments:", error);
      res.status(500).json({
        message: "Failed to retrieve all comments",
        error: error.message || "Internal Server Error"
      });
    }
  };
  
  export { addComment, readCommentsById, readAllComments };
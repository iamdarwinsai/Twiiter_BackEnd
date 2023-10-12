import { LikeService } from '../services/index.js';

const likeService = new LikeService();

const createLike = async (req, res) => {
    try {
        console.log(req.body);//modelId,modelType,userId
        const response = await likeService.toggleLike(req.query.modelId,req.query.modelType,req.body.userId);
        return res.status(201).json({
            message: 'Like Added',
            data: response,
            success: 'True',
            err: {}
        });
    } catch (error) {
        return res.status(401).json({
            message: 'something went wrong, check your code Dumb',
            success: 'Fail',
            err: error
        });
    }
}

export { createLike };

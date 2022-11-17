import { Request, Response, NextFunction, Router } from 'express'
import { addPost, getAllPosts, getPostById, updatePostById, deletePostById } from '../controllers/post'

const router = Router();

router.post('/', addPost);

router.get('/', getAllPosts);

router.get('/:id', getPostById);

router.patch('/', updatePostById)

router.delete('/:id', deletePostById)

export default router;
import { Router } from 'express'
import { nextTick } from 'process'
import { addPost, getAllPosts, getPostById, updatePostById, deletePostById } from '../controllers/post'
import { verifyJWT } from '../middlewares/checkAuth'
import { verifyCsrfToken } from '../middlewares/csrfToken'

const router = Router()

router.post('/', verifyJWT, addPost)

router.get('/', verifyJWT, getAllPosts)

router.get('/:id', verifyJWT, getPostById)

router.patch('/', verifyJWT, updatePostById)

router.delete('/:id', verifyJWT, deletePostById)

export default router
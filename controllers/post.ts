import { Request, Response, NextFunction } from 'express'
import { Post } from '../entities/post'
import { dataSource } from '../connection'
import { ObjectID } from 'typeorm'
import { getDetail } from '../middlewares/checkAuth'

interface PostData {
    text: string,
    description: string,
}

const postRepository = dataSource.getRepository(Post)

export const addPost = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = await getDetail(req, res, next)
        const { text, description }: PostData = req.body
        const post = new Post()
        post.text = text
        post.description = description
        const result = await postRepository.save(post)
        return res.status(201).json({
            message: "Post has been added successfully",
            result
        })
    }
    catch (error) {
        return res.status(500).json({
            message: "Something went wrong",
            error
        })
    }
}

export const getAllPosts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await postRepository.find()
        return res.status(200).json({
            message: "Successfully get all the posts",
            result
        })
    }
    catch (error) {
        return res.status(500).json({
            message: "Something went wrong",
            error: error
        });
    }
}

export const getPostById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = new ObjectID(req.params.id)
        const result = await postRepository.findOneBy({ id })
        return res.status(200).json({
            message: "Successfully get the post by id",
            result
        })
    }
    catch (error) {
        return res.status(500).json({
            message: "Somethind went wrong!",
            error
        })
    }
}

export const updatePostById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = new ObjectID(req.body.id)
        const { text, description }: PostData = req.body
        const post = await postRepository.findOneBy({ id })
        if(post){
        post.text = text
        post.description = description
        const result = await postRepository.save(post)
        return res.status(201).json({
            message: "Post updated successfully",
            result
        })
        }
    }
    catch (error) {
        return res.status(500).json({
            message: "Something went wrong",
            error
        })
    }
}

export const deletePostById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = new ObjectID(req.params.id)
        const post = await postRepository.findOneBy({ id })
        if (post) {
            post.isDeleted = true
            const result = await postRepository.save(post)
            // await post.remove(post)
            return res.status(200).json({
                message: "Successfully delete the post"
            })
        }
    }
    catch (error) {
        return res.status(500).json({
            message: "Something went wrong",
            error
        })
    }
}
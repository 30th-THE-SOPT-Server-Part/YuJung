import { PostBaseResponseDto } from "../interfaces/common/PostBaseResponseDto";
import { BlogCreateDto } from "../interfaces/blog/BlogCreateDto";
import { BlogResponseDto } from "../interfaces/blog/BlogReponseDto";
import { BlogUpdateDto } from "../interfaces/blog/BlogUpdateDto";
import Blog from "../models/Blog";

const createBlog = async (blogCreateDto: BlogCreateDto): Promise<PostBaseResponseDto> => {
    try {
        // 저장할 blog 객체 response에서 받아오기
        const blog = new Blog({
            userId: blogCreateDto.userId,
            title: blogCreateDto.title,
            contents: blogCreateDto.contents,
            date: blogCreateDto.date
        });

        // db에 저장
        await blog.save();

        // 리턴할 객체 생성
        const data = {
            _id: blog.id
        };

        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

const updateBlog = async (postId: string, blogUpdateDto: BlogUpdateDto): Promise<void> => {
    try {
        await Blog.findByIdAndUpdate (postId, blogUpdateDto);
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const findBlogById = async (postId: string): Promise<BlogResponseDto | null> => {
    try {
        const blog = await Blog.findById(postId);

        if (!blog) {
            return null;;
        }

        return blog;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const deleteBlog = async (postId: string): Promise<void> => {
    try {
        await Blog.findByIdAndDelete(postId);
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export default {
    createBlog,
    updateBlog,
    findBlogById,
    deleteBlog,
}
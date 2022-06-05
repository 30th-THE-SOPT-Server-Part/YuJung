import { PostBaseResponseDto } from "../interfaces/common/PostBaseResponseDto";
import { ReviewCreateDto } from "../interfaces/review/ReviewCreateDto";
import { ReviewResponseDto } from "../interfaces/review/ReviewResponseDto";
import { ReviewSearchResponseDto } from "../interfaces/review/ReviewSearchResponseDto";
import { ReviewOptionType } from "../interfaces/review/ReviewOptionType";
import Review from "../models/Review";

const createReview = async (movieId: string, ReviewCreateDto: ReviewCreateDto): Promise<PostBaseResponseDto> => {
    try {
        const review = new Review({
            title: ReviewCreateDto.title,
            content: ReviewCreateDto.content,
            writer: ReviewCreateDto.writer,
            movie: movieId
        });

        await review.save();

        const data = {
            _id: review._id
        };

        return data;
    } catch(error) {
        console.log(error);
        throw error;
    }
}

const getReviews = async (movieId: string): Promise<ReviewResponseDto[]> => {
    try {
        const reviews = await Review.find({
            movie: movieId
        }).populate('writer', 'name').populate('movie');

        const data = await Promise.all(reviews.map((review: any) => {
            const result = {
                _id: review._id,
                writer: review.writer.name,
                movie: review.movie,
                title: review.title,
                content: review.content
            };

            return result;
        }));

        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

const getReviewsBySearch = async (movieId: string, search: string, option: ReviewOptionType, page: number): Promise<ReviewSearchResponseDto | null> => {
    const regex = (pattern: string) => new RegExp(`.*${pattern}.*`);

    let reviews: ReviewResponseDto[] = [];
    const perPage: number = 2;

    try {
        const titleRegex = regex(search);

        if (option === 'title') {
            reviews = await Review.find({ title: { $regex: titleRegex } })
                .where('movie').equals(movieId)
                .sort({ createdAt: -1 })
                .skip(perPage * (page - 1))
                .limit(perPage);        
        } else if (option === 'content') {
            reviews = await Review.find({ content: { $regex: titleRegex } })
                .sort({ createdAt: -1 })
                .skip(perPage * (page - 1))
                .limit(perPage);        
        } else if (option === 'title_content') {
            reviews = await Review.find({
                $or: [
                    { title: { $regex: titleRegex } },
                    { content: { $regex: titleRegex } }
                ]
            })
                .sort({ createdAt: -1 })
                .skip(perPage * (page - 1))
                .limit(perPage);        
        }

        if (reviews === []) return null;

        const total: number = await Review.countDocuments({});
        const lastPage: number = Math.ceil(total / perPage); // 마지막 페이지
        const currentPage: number = page;

        const data = {
            currentPage,
            lastPage,
            reviews
        };
        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export default {
    createReview,
    getReviews,
    getReviewsBySearch,
}
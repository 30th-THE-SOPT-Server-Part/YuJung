import { MovieCreateDto } from "../interfaces/movie/MovieCreateDto";
import { MovieResponseDto } from "../interfaces/movie/MovieResponseDto";
import { MovieUpdateDto } from "../interfaces/movie/MovieUpdateDto";
import { MovieGetDto } from "../interfaces/movie/MovieGetDto";
import Movie from "../models/Movie";
import { MovieCommentCreateDto } from "../interfaces/movie/MovieCommentCreateDto";
import { MovieCommentInfo } from "../interfaces/movie/MovieInfo";
import { MovieCommentUpdateDto } from "../interfaces/movie/MovieCommentUpdateDto";
import { MovieOptionType } from "../interfaces/movie/MovieOptionType";
import { MovieInfo } from "../interfaces/movie/MovieInfo"
import { MovieSearchResponseDto } from "../interfaces/movie/MovieSearchResponseDto";

const createMovie = async (MovieCreateDto: MovieCreateDto): Promise<MovieResponseDto> => {
    try {
        const movie = new Movie({
            title: MovieCreateDto.title,
            director: MovieCreateDto.director,
            startDate: MovieCreateDto.startDate,
            thumbnail: MovieCreateDto.thumbnail,
            story: MovieCreateDto.story
        });

        await movie.save();

        const data = {
            _id: movie._id,
            title: movie.title,
            director: movie.director,
            startDate: movie.startDate,
            thumbnail: movie.thumbnail,
            story: movie.story,
        }

        return data;
    } catch(error) {
        console.log(error);
        throw error;
    }
};

const getMovie = async (movieId: string): Promise<MovieGetDto | null> => {
    try {
        const movie = await Movie.findById(movieId).populate('comments.writer', '_id name'); // populate로 아이디와 이름만 가져옴

        if(!movie) {
            return null;
        }

        /*
        const data = {
            title: movie.title,
            director: movie.director,
            startDate: movie.startDate,
            thumbnail: movie.thumbnail,
            story: movie.story
        }
  
        return data;
        */
       return movie;
    } catch(error) {
        console.log(error);
        throw error;
    }
};

const updateMovie = async (movieId: string, MovieUpdateDto: MovieUpdateDto): Promise<MovieResponseDto | null> => {
    try {
        const updatedMovie = await Movie.findByIdAndUpdate (movieId, MovieUpdateDto, {new: true}); // {new: true} 옵션이 업데이트된 db를 리턴해줌
        console.log(updatedMovie);
        if (!updatedMovie) {
            return null;
        }

        const data = {
            _id: updatedMovie._id,
            title: updatedMovie.title,
            director: updatedMovie.director,
            startDate: updatedMovie.startDate,
            thumbnail: updatedMovie.thumbnail,
            story: updatedMovie.story
        };

        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

const deleteMovie = async (movieId: string) => {
    try {
        await Movie.findByIdAndDelete(movieId);
    } catch (error) {
        console.log(error);
        throw error;
    }
};

const createMovieComment = async (movieId: string, MovieCommentCreateDto: MovieCommentCreateDto): Promise<MovieResponseDto | null> => {
    try {
        const movie = await Movie.findById(movieId);
        if (!movie) return null;

        const newComments: MovieCommentInfo[] = [...movie.comments, MovieCommentCreateDto] // 구조분해 할당으로 새 comment 배열

        const updatedMovie = await Movie.findOneAndUpdate({_id: movieId}, {comments: newComments}, {new: true}); // 아이디로 document 찾아서 update
        if(!updatedMovie) return null;

        return updatedMovie;
    } catch(error) {
        console.log(error);
        throw error;
    }
};

const updateMovieComment = async (movieId: string, commentId: string, userId: string, MovieCommentUpdateDto: MovieCommentUpdateDto): Promise<MovieResponseDto | null> => {
    try {
        const movie = await Movie.findByIdAndUpdate(movieId);
        if (!movie) return null;

        // raw query 사용
        const updatedMovie = await Movie.findOneAndUpdate({
            // $elemMatch: filter에 맞는 원소를 찾아줌
            _id: movieId, comments: { $elemMatch: { _id: commentId, writer: userId } }
        },{
            // $set: 수정할 사항 (update set)
            $set: {
                'comments.$.writer': userId,
                'comments.$.comment': MovieCommentUpdateDto.comment
            }
        }, {new: true});

        return updatedMovie;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

const getMoviesBySearch = async (search: string, option: MovieOptionType, page: number): Promise<MovieSearchResponseDto|null> => {
    const regex =  (pattern: string) => new RegExp(`.*${pattern}.*`); // .* : 개수에 상관없이 ${pattern}이 포함된 것

    let movies: MovieResponseDto[] = [];
    const perPage: number = 2; // 한 페이지에 몇개씩 보여줄 것인지

    try {
        const titleRegex = regex(search);

        if (option === 'title') {
            movies = await Movie.find({ title: { $regex: titleRegex } })
                .sort({ createdAt: -1 })
                .skip(perPage * (page - 1))
                .limit(perPage);        
        } else if (option === 'director') {
            movies = await Movie.find({ director: { $regex: titleRegex } })
                .sort({ createdAt: -1 })
                .skip(perPage * (page - 1))
                .limit(perPage);
        } else if (option === 'title_director') {
            movies = await Movie.find({
                $or: [ // or 검색
                    { director: { $regex: titleRegex } },
                    { title: { $regex: titleRegex } }
                ]
            })
                .sort({ createdAt: -1 })
                .skip(perPage * (page - 1))
                .limit(perPage);
        }

        if (movies === []) return null;

        const total: number = await Movie.countDocuments({});
        const lastPage: number = Math.ceil(total / perPage); // 마지막 페이지
        const currentPage: number = page;

        const data = {
            currentPage,
            lastPage,
            movies
        };

        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export default {
    createMovie,
    getMovie,
    updateMovie,
    deleteMovie,
    createMovieComment,
    updateMovieComment,
    getMoviesBySearch,
}
import { MovieCreateDto } from "../interfaces/movie/MovieCreateDto";
import { MovieResponseDto } from "../interfaces/movie/MovieResponseDto";
import { MovieUpdateDto } from "../interfaces/movie/MovieUpdateDto";
import { MovieGetDto } from "../interfaces/movie/MovieGetDto";
import Movie from "../models/Movie";

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
        const movie = await Movie.findById(movieId);

        console.log(movie);

        if(!movie) {
            return null;
        }

        const data = {
            title: movie.title,
            director: movie.director,
            startDate: movie.startDate,
            thumbnail: movie.thumbnail,
            story: movie.story
        }

        return data;
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

export default {
    createMovie,
    getMovie,
    updateMovie,
    deleteMovie,
}
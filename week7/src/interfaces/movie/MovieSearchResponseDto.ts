import { MovieResponseDto } from "./MovieResponseDto";

export interface MovieSearchResponseDto {
    currentPage: number;
    lastPage: number;
    movies: MovieResponseDto[];

}